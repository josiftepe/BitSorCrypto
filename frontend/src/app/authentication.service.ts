import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { CookieService } from "./cookie.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  authenticate(email: string, password: string) {
    return this.httpClient
      .post<any>("http://localhost:8080/api/authentication/login", { email, password })
      .pipe(
        map(userData => {
          if (userData && userData.token) {
            sessionStorage.setItem("email", email);
            let tokenStr = userData.token;
            sessionStorage.setItem("token", tokenStr);

            // Set the JSESSIONID cookie
            document.cookie = `JSESSIONID=${userData.sessionId}; Path=/;`;
          }
          return userData;
        })
      );
  }

  isUserLoggedIn() {
  return !(localStorage.getItem('token') == null)

  }

  getJwtToken(): string {
    return sessionStorage.getItem("token") || "";
  }

  logOut() {
    // this.httpClient.post("http://localhost:8080/api/authentication/logout", {}).subscribe(x => {
    //   console.log("fine")
    // }, (error => {
    //   console.log(error)
    // }));
    sessionStorage.clear();
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");

    // Clear the JSESSIONID cookie
    document.cookie = "JSESSIONID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
  getUserInfo() {
    if(this.isUserLoggedIn()) {
      return this.httpClient.get('http://localhost:8080/api/authentication/user')
    }
    return null
  }
}
