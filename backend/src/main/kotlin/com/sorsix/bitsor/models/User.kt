package com.sorsix.bitsor.models

import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import org.springframework.data.annotation.CreatedDate
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.time.LocalDate
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "users")
class User {

    @Id
    @GeneratedValue
    @Column(updatable = false, nullable = false)
    var id: UUID? = null

    @Column(nullable = false)
    var username: String = ""

    @Column(unique = true, nullable = false)
    var email: String = ""

    @Column
    var password: String = ""
        @JsonIgnore
        get
        set(value){
            val encoder = BCryptPasswordEncoder()
            field = encoder.encode(value)
        }

    @Column(name = "telephone_number", nullable = false)
    var telephoneNumber: String = ""

    @Column(nullable = false)
    var country: String = ""

    @Column(name = "home_address", nullable = false)
    var homeAddress: String = ""

    @Column(nullable = false)
    var birthday: LocalDate? = null

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_roles", joinColumns = [JoinColumn(name = "user_id")])
    @Cascade(CascadeType.ALL)
    var roles: MutableSet<Role> = mutableSetOf(Role.TRADER)

    @Column(nullable = false, updatable = false)
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    var createdAt = Date()
}




