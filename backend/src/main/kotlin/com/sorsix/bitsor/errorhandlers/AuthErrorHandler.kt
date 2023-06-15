package com.sorsix.bitsor.errorhandlers

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.AuthenticationException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@ControllerAdvice
class AuthErrorHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(AuthenticationException::class)
    @ResponseBody
    fun handleCustomJwtException(exception: Exception): ResponseEntity<com.sorsix.bitsor.dtos.StandardResponseDTO> {
        return ResponseEntity(exception.message?.let { com.sorsix.bitsor.dtos.StandardResponseDTO(false, it) }, HttpStatus.UNAUTHORIZED)
    }
}