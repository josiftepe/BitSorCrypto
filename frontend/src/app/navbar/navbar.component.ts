import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {User} from "../User";
import {UserService} from "../user.service";
import {AuthenticationService} from "../authentication.service";
import { Location } from '@angular/common';
import {toArray} from "rxjs/operators";
import jwt_decode from 'jwt-decode'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  dateTime : Date | undefined
  user : User =
    {
      username: "undefined",
      email: "undefined",
      password: "undefined",
      telephoneNumber: "00",
      country: "undefined",
      homeAddress: "undefined",
      birthDay: "112",
    }
  errorMessage: string | undefined;
  loggedIn : boolean = false

  constructor(private userService: UserService, public authService : AuthenticationService, private location : Location) { }

  ngOnInit() {
    this.dateTime = new Date()
    if(this.authService.isUserLoggedIn()) {
      this.loggedIn = true
      let token = localStorage.getItem("token")
      this.user.email = jwt_decode(token)['email']
      // this.authService.getUserInfo().subscribe(x => {
      //   const obj = Object.values(x)
      //   this.user.username = obj.at(1)
      // },
      //   (error => {
      //     console.log(error)
      //   }))
    }
    else {
      this.loggedIn = false
    }
  }
  logOut() {
     this.authService.logOut()
    this.loggedIn = false
    // window.location.reload()
  }
  tradeFunc() {
    window.location.href = '/trade'
  }
  portofolionFunc() {
    window.location.href = '/portofolio'
  }
}
