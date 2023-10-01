import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/views/services/auth.service';

interface ElephantResponse {
  name?: string;
  dob?: string;
  location?: string;
  remark?: string;
}

@Component({
  selector: 'app-elephant-register',
  templateUrl: './elephant-register.component.html',
  styleUrls: ['./elephant-register.component.css']
})
export class ElephantRegisterComponent implements OnInit {
  isAccountCreated: boolean = false;
  editingMode: boolean = false;

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    name: new FormControl("", [
      Validators.required, 
      Validators.minLength(2), 
      Validators.pattern("^[a-zA-Z]+$")]),
    dob: new FormControl("", [
      Validators.required]),
    location: new FormControl("", [
      Validators.required,  
      Validators.pattern(/^(60[5-7]|61[0-9]|62[0-9]|63[0-9]|64[0-9]|65[0-7])$/)]),
    remark: new FormControl("", [
      Validators.required])
  });

  registerSubmit(){
    const name = this.registerForm.value.name || '';
    const dob = this.registerForm.value.dob || '';
    const location = this.registerForm.value.location || '';
    const remark = this.registerForm.value.remark || '';

    this.authService.registerElephant([
      name,
      dob,
      location,
      remark
    ]).subscribe(res => {
          if (res == 'Success') {
            this.isAccountCreated = true;
            this.toastr.success("Elephant Register Successfully");
            this.resetForm();
          } else if (res == 'Already Exist') {
            this.isAccountCreated = false;
            this.toastr.warning("Name Already Exist");
          } else {
            this.isAccountCreated = false;
            this.toastr.error("Something Went Wrong");
          }
        }); 
  }

  search() {
    const name = this.registerForm.value.name || '';
  
    this.authService.searchElephantByName(name).subscribe(
      (res: ElephantResponse) => {
  
        if (res) {
          this.registerForm.patchValue({
            dob: res.dob || '',
            location: res.location || '',
            remark: res.remark || ''
          });
        } else {
          this.toastr.warning("No data found for the given name");
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.toastr.warning("No data found for the given name");
        } else {
          this.toastr.warning("No data found for the given name");
        }
      }
    );
  }

  editElephant() {
    const name = this.registerForm.value.name || '';
    const dob = this.registerForm.value.dob || '';
    const location = this.registerForm.value.location || '';
    const remark = this.registerForm.value.remark || '';

    this.authService.editElephant([
      name,
      dob,
      location,
      remark
    ]).subscribe(res => {
          if (res == 'Success') {
            this.isAccountCreated = true;
            this.toastr.success("Edit Successfully");
            this.resetForm();
          } else if (res == 'Elephant not found') {
            this.isAccountCreated = false;
            this.toastr.warning("Name can't Change");
          } else {
            this.isAccountCreated = false;
            this.toastr.error("Something Went Wrong");
          }
        }
    );
  }

  deleteElephant() {
    const name = this.registerForm.value.name || '';

    this.authService.deleteElephant(name).subscribe(
      (response) => {
        if (response == 'Success') {
          this.toastr.success("Elephant deleted successfully");
        } else {
          this.toastr.error("Something went wrong");
        }
      },
      (error) => {
        this.toastr.success("Deleted successfully");
        this.resetForm();
      }
    );
  }
  
  get Name(): FormControl {
    return this.registerForm.get("name") as FormControl;
  }
  get Dob(): FormControl {
    return this.registerForm.get("dob") as FormControl;
  }
  get Location(): FormControl {
    return this.registerForm.get("location") as FormControl;
  }
  get Remark(): FormControl {
    return this.registerForm.get("remark") as FormControl;
  }

  resetForm() {
    this.registerForm.reset();
    this.editingMode = false;
    this.isAccountCreated = false;
  }
}
