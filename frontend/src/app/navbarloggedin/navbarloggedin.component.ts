import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbarloggedin',
  templateUrl: './navbarloggedin.component.html',
  styleUrls: ['./navbarloggedin.component.css']
})
export class NavbarloggedinComponent implements OnInit {
  dateTime : Date | undefined
  user: User | undefined;
  errorMessage: string | undefined;
  loggedIn : boolean = false

  constructor(private userService: UserService, public authService : AuthenticationService, private location : Location) { }

  ngOnInit() {
    this.dateTime = new Date()
    if(this.authService.isUserLoggedIn()) {
      console.log("YES")
      this.loggedIn = true
      this.userService.getUserInfo().subscribe(user => {
        this.user = user
      })
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
}
