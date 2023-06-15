package com.sorsix.bitsor.errorhandlers

import com.sorsix.bitsor.exceptions.NoJwtException
import com.sorsix.bitsor.exceptions.UserExistsException
import com.sorsix.bitsor.exceptions.UserNotFoundException
import com.sorsix.bitsor.exceptions.WrongCredentialsException
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import javax.servlet.http.HttpServletRequest

@ControllerAdvice
class UserErrorHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(NoJwtException::class)
    @ResponseBody
    fun handleNoJwtException(exception: NoJwtException): ResponseEntity<com.sorsix.bitsor.dtos.StandardResponseDTO> {
        return ResponseEntity(exception.message?.let { com.sorsix.bitsor.dtos.StandardResponseDTO(false, it) }, HttpStatus.FORBIDDEN)
    }

    @ExceptionHandler(UserNotFoundException::class, WrongCredentialsException::class)
    fun handleWrongCredentialExceptions(request: HttpServletRequest, exception: Exception): ResponseEntity<com.sorsix.bitsor.dtos.StandardResponseDTO> {
        return ResponseEntity(com.sorsix.bitsor.dtos.StandardResponseDTO(false, "Wrong credentials"), HttpStatus.UNAUTHORIZED)
    }

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleIllegalArgumentException(request: HttpServletRequest, exception: IllegalArgumentException): ResponseEntity<com.sorsix.bitsor.dtos.StandardResponseDTO> {
        return ResponseEntity(exception.message?.let { com.sorsix.bitsor.dtos.StandardResponseDTO(false, it) }, HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(EmptyResultDataAccessException::class)
    fun handleEmptyResultDataAccesstException(request: HttpServletRequest, exception: EmptyResultDataAccessException): ResponseEntity<com.sorsix.bitsor.dtos.StandardResponseDTO> {
        return ResponseEntity(exception.message?.let { com.sorsix.bitsor.dtos.StandardResponseDTO(false, it) }, HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(UserExistsException::class)
    fun handleUserExistsException(request: HttpServletRequest, exception: UserExistsException): ResponseEntity<com.sorsix.bitsor.dtos.StandardResponseDTO> {
        return ResponseEntity(exception.message?.let { com.sorsix.bitsor.dtos.StandardResponseDTO(false, it) }, HttpStatus.CONFLICT)
    }
}