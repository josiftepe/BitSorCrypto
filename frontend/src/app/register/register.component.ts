import {Component, OnInit} from '@angular/core';
import { Injectable } from '@angular/core';
import {RegisterService} from "../register.service";
import {RegisterResponse} from "../RegisterResponse";
import {RegisterError} from "../RegisterError";
import {User} from "../User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  name: string = "";
  email: string = "";
  password: string = "";
  telephoneNumber: string = "";
  country: string = "";
  homeAddress: string = "";
  birthDay: string = "";
  errorMessage: string = "";
  successMessage: string = "";

  constructor(private readonly registrationService: RegisterService, private router : Router) {}

  ngOnInit(): void {

    }

  registerUser(): void {
    if (!this.validateInput()) {
      return;
    }

    const user: User = {
      username: this.name,
      email: this.email,
      password: this.password,
      telephoneNumber: this.telephoneNumber,
      country: this.country,
      homeAddress: this.homeAddress,
      birthDay: this.birthDay
    };

    this.registrationService.register(user).subscribe(
      (response: RegisterResponse) => {
      this.successMessage = "Succesfully registered!";
        console.log("Succesfully registered!");
        setTimeout(() => {
          this.router.navigate(['./login']);

        }, 5000);

      },
      (error: RegisterError) => {
        this.errorMessage = "User already exist";
        console.log("User already exists!")
      }
    );
  }

  validateInput(): boolean {
    return true;
  }
}
