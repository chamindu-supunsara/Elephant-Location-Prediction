import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { registerFormPaper } from "src/datamodels/dataentity";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  repeatPass: string = 'none';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    email: new FormControl("", [
      Validators.required, 
      Validators.email]),
    firstname: new FormControl("", [
      Validators.required, 
      Validators.minLength(3), 
      Validators.pattern("^[a-zA-Z]+$")]),
    lastName: new FormControl("", [
      Validators.required, 
      Validators.minLength(3), 
      Validators.pattern("^[a-zA-Z]+$")]),
    mobileNumber: new FormControl("", [
      Validators.required, 
      Validators.minLength(10),
      Validators.maxLength(10), 
      Validators.pattern("[0-9]*")]),
    nic: new FormControl("", [
      Validators.required,  
      Validators.pattern(/^\d{9}(\d{3}|[vV])?$/)]),
    empNo: new FormControl("", [
      Validators.required, 
      Validators.minLength(5),
      Validators.maxLength(5), 
      Validators.pattern("[0-5]*")]),
    area: new FormControl("", [
      Validators.required,  
      Validators.pattern(/^(60[5-7]|61[0-9]|62[0-9]|63[0-9]|64[0-9]|65[0-7])$/)]),
    password: new FormControl("", [
      Validators.required, 
      Validators.minLength(6),
      Validators.maxLength(15)]),
    comPassword: new FormControl("")
  });

  registerSubmit(){
    if(this.Password.value == this.ComPassword.value) {
      this.repeatPass = 'none';

      this.authService.registerUser().subscribe(res => {
        console.log(res);
      })
    } else {
      this.repeatPass = 'inline'
    }
  }

  get Email(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }
  get Firstname(): FormControl {
    return this.registerForm.get("firstname") as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get("lastName") as FormControl;
  }
  get MobileNumber(): FormControl {
    return this.registerForm.get("mobileNumber") as FormControl;
  }
  get Nic(): FormControl {
    return this.registerForm.get("nic") as FormControl;
  }
  get EmpNo(): FormControl {
    return this.registerForm.get("empNo") as FormControl;
  }
  get Area(): FormControl {
    return this.registerForm.get("area") as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get("password") as FormControl;
  }
  get ComPassword(): FormControl {
    return this.registerForm.get("comPassword") as FormControl;
  }

}
