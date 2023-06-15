package com.sorsix.bitsor.services.interfaces

import com.sorsix.bitsor.models.User
import java.util.*

interface IUserService {

    fun getAll(): List<User>
    fun getUserById(id: String): User
    fun delete(userId: UUID)
}