package com.sorsix.bitsor.repositories

import com.sorsix.bitsor.models.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import java.util.*
@Repository
interface UserRepository: JpaRepository<User, UUID> {
    fun findByEmail(email: String?): User?
    @Transactional
    fun deleteUserByEmail(email: String)


}