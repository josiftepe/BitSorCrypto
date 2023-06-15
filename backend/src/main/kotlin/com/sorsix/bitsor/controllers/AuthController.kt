package com.sorsix.bitsor.controllers


import com.sorsix.bitsor.dtos.ChangePasswordDTO
import com.sorsix.bitsor.dtos.DeleteUserDTO
import com.sorsix.bitsor.dtos.LoginResponseDTO
import com.sorsix.bitsor.dtos.StandardResponseDTO
import com.sorsix.bitsor.models.User
import com.sorsix.bitsor.services.AuthService
import com.sorsix.bitsor.services.interfaces.IUserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@RestController
@RequestMapping("api/authentication")
class AuthController(private val authService: AuthService) {

    @Autowired
    lateinit var userService: IUserService


    @PostMapping("register")
    fun register(@RequestBody body: com.sorsix.bitsor.dtos.UserRegisterDTO): ResponseEntity<User> {
        return authService.register(body)
    }

    @PostMapping("login")
    fun login(
        @RequestBody body: com.sorsix.bitsor.dtos.UserLoginDTO,
        response: HttpServletResponse
    ): ResponseEntity<LoginResponseDTO> {
        return authService.login(body, response)
    }

    @PostMapping("logout")
    fun logout(request: HttpServletRequest, response: HttpServletResponse): ResponseEntity<StandardResponseDTO> {
        return authService.logout(request, response)
    }


    @PutMapping("user/change-password")
    fun changePassword(
        @RequestBody changePasswordDto: ChangePasswordDTO,
        request: HttpServletRequest
    ): ResponseEntity<LoginResponseDTO> {
        val result = authService.changePassword(request, changePasswordDto.oldPassword, changePasswordDto.newPassword)
        return ResponseEntity(result.body, result.statusCode)
    }

    @PostMapping("user/delete")
    fun deleteUser(
        @RequestBody deleteUserDTO: DeleteUserDTO,
        request: HttpServletRequest
    ): ResponseEntity<StandardResponseDTO> {
        return authService.deleteUser(request, deleteUserDTO.password)

    }

    @GetMapping("user")
    fun userInfo(): ResponseEntity<User> {
        val id = SecurityContextHolder.getContext().authentication.name.toString()
        return ResponseEntity.ok(userService.getUserById(id))
    }


    @GetMapping("user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    fun userInfo(@PathVariable id: String): ResponseEntity<User> {
        return ResponseEntity.ok(userService.getUserById(id))
    }

    //TODO
    // forgot password


}