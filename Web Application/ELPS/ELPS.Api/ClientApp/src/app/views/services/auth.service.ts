import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  baseServerUrl = "https://localhost:7277/api/";

  jwtHelperService = new JwtHelperService();

  registerUser(user: Array<String>) {
    return this.http.post(this.baseServerUrl + "User/CreateUser", {
      Email: user[0], 
      Firstname: user[1], 
      LastName: user[2], 
      MobileNumber: user[3], 
      Nic: user[4], 
      EmpNo: user[5], 
      Area: user[6], 
      Password: user[7]}, {responseType: 'text'});
  }

  loginUser(loginInfo: Array<String>) {
    return this.http.post(this.baseServerUrl + 'User/LoginUser', {
      Email: loginInfo[0],
      Password: loginInfo[1]}, {responseType: 'text'});
  }

  getUsers() {
    return this.http.get(this.baseServerUrl + 'User/GetUsers');
  }  

  recordElephant() {
    return this.http.post(this.baseServerUrl + "User/AddRecord", null, {responseType: 'text'});
  }

  registerElephant() {
    return this.http.post(this.baseServerUrl + "User/CreateElephant", null, {responseType: 'text'});
  }

  setToken(token: string) {
    localStorage.setItem("access_token", token);
    this.loadCurrentUser();
    //console.log('JWT Token:', token);
  }

  loadCurrentUser() {
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
     const data = userInfo ? {
       email: userInfo.email,
       firstname: userInfo.firstname,
       lastName: userInfo.lastName,
       mobileNumber: userInfo.mobileNumber,
       nic: userInfo.nic,
       empNo: userInfo.empNo,
       area: userInfo.area
    } : null;
    this.currentUser.next(data);
  }

  isLoggedin(): boolean {
    return localStorage.getItem("access_token") ? true : false;
  }

  removeToken() {
    localStorage.removeItem("access_token");
  }
}
