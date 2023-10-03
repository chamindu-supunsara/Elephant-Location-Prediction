import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, map, retry, tap, throwError } from 'rxjs';

interface Elephant {
  name: string;
  dob: string;
  location: string;
  remark: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  baseServerUrl = "https://localhost:7277/api/";

  jwtHelperService = new JwtHelperService();

  getStatusData(): Observable<string[]> {
    return this.http
      .get<any[]>(this.baseServerUrl + "ElephantsRecords/GetRecord")
      .pipe(
        retry(1),
        catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(errorMsg);
        }),
        map(response => response.map(item => item.weatherCondition))
      );
  }

  getBirthData(): Observable<string[]> {
    return this.http
      .get<any[]>(this.baseServerUrl + "ElephantRegister/GetElephant")
      .pipe(
        retry(1),
        catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(errorMsg);
        }),
        map(response => response.map(item => item.location))
      );
  }

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

  recordElephant(elephantRecords: Array<String>) {
    return this.http.post(this.baseServerUrl + 'ElephantsRecords/CreateRecord', {
      Name: elephantRecords[0],
      Date: elephantRecords[1],
      WeatherCondition: elephantRecords[2],
      Time: elephantRecords[3],
      Hours: elephantRecords[4],
      Location: elephantRecords[5]}, {responseType: 'text'});
  }

  getRecord() {
    return this.http.get(this.baseServerUrl + 'ElephantsRecords/GetRecord');
  } 

  registerElephant(elephantRegister: Array<String>) {
    return this.http.post(this.baseServerUrl + "ElephantRegister/CreateElephant", {
      Name: elephantRegister[0],
      Dob: elephantRegister[1],
      Location: elephantRegister[2],
      Remark: elephantRegister[3]}, {responseType: 'text'});
  }

  getRegister() {
    return this.http.get(this.baseServerUrl + 'ElephantRegister/GetElephant');
  }
  
  searchElephantByName(name: string) {
    return this.http.get(this.baseServerUrl + 'ElephantRegister/SearchElephantByName', {
      params: { name }
    });
  }

  editElephant(elephantEdit: Array<String>) {
    return this.http.put(this.baseServerUrl + "ElephantRegister/EditElephant", {
      Name: elephantEdit[0],
      Dob: elephantEdit[1],
      Location: elephantEdit[2],
      Remark: elephantEdit[3]}, {responseType: 'text'});
  }

  deleteElephant(name: string): Observable<string> {
    return this.http.delete<string>(`${this.baseServerUrl}ElephantRegister/DeleteElephant?name=${name}`);
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

  private getServerErrorMessage(error: HttpErrorResponse) {
    console.log("getServerErrorMessage", error);
    switch (error.status) {
      case 404: {
        return error.error.error;
      }
      case 403: {
        return error.error.error;
      }
      case 500: {
        return error.error.error;
      }
      default: {
        return error.error.error;
      }

    }
  }
}
