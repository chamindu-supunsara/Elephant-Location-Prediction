import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseServerUrl = "https://localhost:7277/api/";

  registerUser() {
    return this.http.post(this.baseServerUrl + "User/CreateUser", null, {responseType: 'text'});
  }
}
