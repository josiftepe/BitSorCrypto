package com.sorsix.bitsor.services

import com.sorsix.bitsor.dtos.StandardResponseDTO
import com.sorsix.bitsor.dtos.UserLoginDTO
import com.sorsix.bitsor.dtos.UserRegisterDTO
import com.sorsix.bitsor.exceptions.NoJwtException
import com.sorsix.bitsor.exceptions.UserExistsException
import com.sorsix.bitsor.exceptions.UserNotFoundException
import com.sorsix.bitsor.exceptions.WrongCredentialsException
import com.sorsix.bitsor.models.User
import com.sorsix.bitsor.repositories.UserRepository
import com.sorsix.bitsor.security.service.JwtService
import com.sorsix.bitsor.services.interfaces.IAuthService
import com.sorsix.bitsor.utils.mapper.UserMapper
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val jwtService: JwtService,
    private val mapper: UserMapper,
    private val encoder: BCryptPasswordEncoder
) : IAuthService {

    private val cookieName = "jwt"

//    override fun register(userRegisterDTO: com.sorsix.bitsor.dtos.UserRegisterDTO): ResponseEntity<User> {
//        val user = mapper.toEntity(userRegisterDTO)
//        try {
//        return ResponseEntity(userRepository.save(user), HttpStatus.CREATED)
//        } catch (e: Exception) {
//            throw UserExistsException()
//        }
//    }

    override fun register(userRegisterDTO: UserReg): ResponseEntity<User> {
        userRepository.findByEmail(userRegisterDTO.email)?.let {
            throw UserExistsException()
        }
        val user = mapper.toEntity(userRegisterDTO)
        return ResponseEntity(userRepository.save(user), HttpStatus.CREATED)
    }

//    override fun login(userLoginDTO: com.sorsix.bitsor.dtos.UserLoginDTO, response: HttpServletResponse): ResponseEntity<LoginResponseDTO> {
//        val user = userRepository.findByEmail(userLoginDTO.email) ?: throw UserNotFoundException()
//        val isAuth = encoder.matches(userLoginDTO.password, user.password)
//        if (!isAuth) throw WrongCredentialsException()
//        val jwt = jwtService.generate(user)
//        val cookie = Cookie(cookieName, jwt)
//        cookie.apply {
//            this.isHttpOnly = true
//            this.path = "/"
//            this.maxAge = (jwtService.expiresInMs / 1000)
//        }
//        response.addCookie(cookie)
//        return ResponseEntity.ok(LoginResponseDTO(jwt))
//    }

    override fun login(userLoginDTO: UserLoginDTO, response: HttpServletResponse): ResponseEntity<LoginResponseDTO> {
        val user = userRepository.findByEmail(userLoginDTO.email) ?: throw UserNotFoundException()
        if (!encoder.matches(userLoginDTO.password, user.password)) {
            throw WrongCredentialsException()
        }
        val jwt = jwtService.generate(user)
        val cookie = Cookie(cookieName, jwt).apply {
            isHttpOnly = true
            path = "/"
            maxAge = (jwtService.expiresInMs / 1000)
        }
        response.addCookie(cookie)
        return ResponseEntity.ok(LoginResponseDTO(jwt))
    }

    //    override fun deleteUser(request: HttpServletRequest, password: String): ResponseEntity<StandardResponseDTO> {
//        val jwt = getJwt(request) ?: throw NoJwtException()
//        val currentUserEmail = jwtService.extractUserEmailFromToken(jwt)
//        val currentUser = userRepository.findByEmail(currentUserEmail) ?: throw UserNotFoundException()
//        val isAuth = encoder.matches(password, currentUser.password)
//        if(!isAuth) throw WrongCredentialsException()
//        println("authorized  $currentUserEmail")
//        if (currentUserEmail != null) {
//            userRepository.deleteUserByEmail(currentUserEmail)
//        } else {
//            throw UserNotFoundException()
//        }
//        return ResponseEntity.ok(StandardResponseDTO(true, "User with email $currentUserEmail is successfully deleted!"))
//    }
    override fun deleteUser(request: HttpServletRequest, password: String): ResponseEntity<StandardResponseDTO> {
        val jwt = getJwt(request) ?: throw NoJwtException()
        val userEmail = jwtService.extractUserEmailFromToken(jwt)
        val user = userRepository.findByEmail(userEmail) ?: throw UserNotFoundException()
        if (!encoder.matches(password, user.password)) {
            throw WrongCredentialsException()
        }
        userRepository.deleteUserByEmail(userEmail!!)
        return ResponseEntity.ok(StandardResponseDTO(true, "User with email $userEmail is successfully deleted!"))
    }

//    override fun logout(
//        request: HttpServletRequest,
//        response: HttpServletResponse
//    ): ResponseEntity<StandardResponseDTO> {
//        val cookie = request.cookies?.find { cookie -> cookie.name == cookieName } ?: throw NoJwtException()
//        cookie.apply {
//            path = "/"
//            isHttpOnly = true
//            value = null
//            maxAge = 0
//        }
//        response.addCookie(cookie)
//        return ResponseEntity.ok(StandardResponseDTO(true, "logout successful"))
//    }

    override fun logout(request: HttpServletRequest, response: HttpServletResponse): ResponseEntity<StandardResponseDTO> {
        val cookie = request.cookies?.find { it.name == cookieName } ?: throw NoJwtException()
        cookie.apply {
            path = "/"
            isHttpOnly = true
            value = null
            maxAge = 0
        }
        response.addCookie(cookie)
        return ResponseEntity.ok(StandardResponseDTO(true, "logout successful"))
    }

//    override fun changePassword(
//        request: HttpServletRequest,
//        oldPassword: String,
//        newPassword: String
//    ): ResponseEntity<LoginResponseDTO> {
//        val jwt = getJwt(request) ?: throw NoJwtException()
//        val currentUserEmail = jwtService.extractUserEmailFromToken(jwt)
//        val currentUser = userRepository.findByEmail(currentUserEmail) ?: throw UserNotFoundException()
//        val isAuth = encoder.matches(oldPassword, currentUser.password)
//        if (!isAuth) throw WrongCredentialsException()
//        currentUser.password = encoder.encode(newPassword)
//        println("New password before encoding: $newPassword")
//
//        userRepository.save(currentUser)
//        println("New password after encoding: ${currentUser.password}")
//        // Generate a new JWT token with updated user information
//        val updatedcurrentUser = userRepository.findByEmail(currentUserEmail) ?: throw UserNotFoundException()
//        val updatedJwt = jwtService.generate(updatedcurrentUser)
//
//        // Set the new JWT token in a cookie
//        val cookie = Cookie(cookieName, updatedJwt)
//        cookie.apply {
//            this.isHttpOnly = true
//            this.path = "/"
//            this.maxAge = (jwtService.expiresInMs / 1000)
//        }
//
//        // Send the new JWT token in the response to authenticate the user with the new password
//        LoginResponseDTO(updatedJwt)
//        val headers = HttpHeaders()
//        headers.add(HttpHeaders.SET_COOKIE, cookie.toString())
//        return ResponseEntity.ok().headers(headers).body(LoginResponseDTO(updatedJwt))
//    }

    override fun changePassword(request: HttpServletRequest, oldPassword: String, newPassword: String): ResponseEntity<LoginResponseDTO> {
        val jwt = getJwt(request) ?: throw NoJwtException()
        val userEmail = jwtService.extractUserEmailFromToken(jwt)
        val user = userRepository.findByEmail(userEmail) ?: throw UserNotFoundException()
        if (!encoder.matches(oldPassword, user.password)) {
            throw WrongCredentialsException()
        }
        user.password = encoder.encode(newPassword)
        userRepository.save(user)
        val updatedUser = userRepository.findByEmail(userEmail) ?: throw UserNotFoundException()
        val updatedJwt = jwtService.generate(updatedUser)
        val cookie = Cookie(cookieName, updatedJwt).apply {
            isHttpOnly = true
            path = "/"
            maxAge = (jwtService.expiresInMs / 1000)
        }
        val headers = HttpHeaders().apply {
            add(HttpHeaders.SET_COOKIE, cookie.toString())
        }
        return ResponseEntity.ok().headers(headers).body(LoginResponseDTO(updatedJwt))
    }

    fun getJwt(request: HttpServletRequest): String? {
        val authHeader = request.getHeader("Authorization")
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7)
        }
        return null
    }


}