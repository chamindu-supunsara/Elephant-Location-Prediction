import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseServerUrl = "https://localhost:7277/api/";

  registerUser(user: Array<String>) {
    return this.http.post(this.baseServerUrl + "User/CreateUser", {Email: user[0], Firstname: user[1], LastName: user[2], MobileNumber: user[3], Nic: user[4], EmpNo: user[5], Area: user[6], Password: user[7]}, {responseType: 'text'});
  }

  recordElephant() {
    return this.http.post(this.baseServerUrl + "User/AddRecord", null, {responseType: 'text'});
  }

  registerElephant() {
    return this.http.post(this.baseServerUrl + "User/CreateElephant", null, {responseType: 'text'});
  }
}
