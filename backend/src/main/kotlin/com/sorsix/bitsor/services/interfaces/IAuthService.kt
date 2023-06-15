package com.sorsix.bitsor.services.interfaces

import com.sorsix.bitsor.dtos.LoginResponseDTO
import com.sorsix.bitsor.dtos.StandardResponseDTO
import com.sorsix.bitsor.models.User
import org.springframework.http.ResponseEntity
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

interface IAuthService {
    fun login(userLoginDTO: com.sorsix.bitsor.dtos.UserLoginDTO, response: HttpServletResponse): ResponseEntity<LoginResponseDTO>
    fun register(userRegisterDTO: com.sorsix.bitsor.dtos.UserRegisterDTO): ResponseEntity<User>
    fun logout(request: HttpServletRequest, response: HttpServletResponse): ResponseEntity<StandardResponseDTO>
    fun changePassword(request: HttpServletRequest, oldPassword: String, newPassword: String): ResponseEntity<LoginResponseDTO>
    fun deleteUser(request: HttpServletRequest, password: String): ResponseEntity<StandardResponseDTO>
}