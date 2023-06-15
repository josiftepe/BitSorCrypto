package com.sorsix.bitsor.security.service


import com.sorsix.bitsor.models.User
import com.sorsix.bitsor.security.config.JwtConfigProperties
import com.sorsix.bitsor.security.interfaces.IJwtService
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Service
import java.security.Key
import java.util.*

@Service
class JwtService(
    private val jwtConfigProperties: JwtConfigProperties
): IJwtService {
    private val secretKey: Key = Keys.hmacShaKeyFor(jwtConfigProperties.secret.toByteArray())
    var expiresInMs: Int = jwtConfigProperties.expiresInMs

    override fun generate(user: User): String {
        val claims : HashMap<String, Any?> = HashMap()
        claims["email"] = user.email
        claims["sub"] = user.id.toString()

        return Jwts.builder()
            .setClaims(claims)
            .setIssuer(jwtConfigProperties.issuerURL)
            .setIssuedAt(Date(System.currentTimeMillis()))
            .setExpiration(Date(System.currentTimeMillis() + jwtConfigProperties.expiresInMs))
            .signWith(secretKey)
            .compact()
    }

    override fun getSubject(token: String): String {
        return getClaims(token).subject
    }


    override fun extractUserEmailFromToken(token: String?): String? {
        val claims: Claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).body
        return claims["email"] as? String
    }


    override fun getClaims(token: String?): Claims {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .body
    }
}