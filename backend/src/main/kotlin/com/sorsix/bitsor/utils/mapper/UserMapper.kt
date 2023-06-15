package com.sorsix.bitsor.utils.mapper

import com.sorsix.bitsor.models.User
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class UserMapper {
    fun toEntity(userRegisterDTO: com.sorsix.bitsor.dtos.UserRegisterDTO): User {
        val user = User()
        user.username = userRegisterDTO.username
        user.email = userRegisterDTO.email
        user.password = userRegisterDTO.password
        user.birthday = LocalDate.parse(userRegisterDTO.birthDay)
        user.country = userRegisterDTO.country
        user.homeAddress= userRegisterDTO.homeAddress
        user.telephoneNumber=userRegisterDTO.telephoneNumber
        return user
    }
}