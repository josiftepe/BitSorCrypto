package com.sorsix.bitsor.security.interfaces

import com.sorsix.bitsor.models.User
import io.jsonwebtoken.Claims

interface IJwtService {
    fun generate(user: User): String
    fun getSubject(token: String): String
    fun extractUserEmailFromToken(token: String?): String?
    fun getClaims(token: String?): Claims
}