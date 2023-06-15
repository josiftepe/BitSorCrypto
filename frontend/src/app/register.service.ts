import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./User";
import {RegisterResponse} from "./RegisterResponse";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:8080/api/authentication'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, user);
  }


  // private readonly apiUrl = 'http://localhost:8080/api/authentication';
  //
  // constructor(private readonly http: HttpClient) {}
  //
  // register(user: User): Observable<RegisterResponse> {
  //   return this.http.post<RegisterResponse>(this.apiUrl, user);
  // }
}
