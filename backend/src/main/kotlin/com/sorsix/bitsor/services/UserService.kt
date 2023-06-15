package com.sorsix.bitsor.services


import com.sorsix.bitsor.models.User
import com.sorsix.bitsor.repositories.UserRepository
import com.sorsix.bitsor.services.interfaces.IUserService
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(private val userRepository: UserRepository): IUserService {

    override fun getAll(): List<User> {
        return userRepository.findAll()
    }

    override fun getUserById(id: String): User {
        return userRepository.findById(UUID.fromString(id)).orElseThrow { EmptyResultDataAccessException(1) }
    }

    override fun delete(userId: UUID) {
        try { userRepository.deleteById(userId)
        } catch (e: EmptyResultDataAccessException) {
            throw EmptyResultDataAccessException(1)
        }
    }
}