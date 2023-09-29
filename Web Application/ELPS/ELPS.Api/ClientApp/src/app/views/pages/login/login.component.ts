import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginAuth: AuthService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required, 
      Validators.email]),
    password: new FormControl("", [
      Validators.required, 
      Validators.minLength(6),
      Validators.maxLength(15)])
  });

  isUserValid: boolean = false;

  loginSubmited() {
    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.password || '';
  
    this.loginAuth.loginUser([email, password])
      .subscribe((res) => {
        if (res == 'Failure') {
          this.isUserValid = false;
          this.toastr.error("Login Fail");
        } else {
          this.isUserValid = true;
          this.loginAuth.setToken(res);
          this.router.navigateByUrl('dashboard')
          this.toastr.success("Login Successfully");
        }
      });
  } 

  get Email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }

  get Password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }
}
