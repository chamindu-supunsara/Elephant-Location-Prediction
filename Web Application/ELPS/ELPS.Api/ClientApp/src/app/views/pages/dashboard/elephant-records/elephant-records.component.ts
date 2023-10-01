import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/views/services/auth.service';

@Component({
  selector: 'app-elephant-records',
  templateUrl: './elephant-records.component.html',
  styleUrls: ['./elephant-records.component.css']
})
export class ElephantRecordsComponent implements OnInit {
  isAccountCreated: boolean = false;

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    name: new FormControl(""),
    date: new FormControl(""),
    weathercondition: new FormControl(""),
    time: new FormControl(""),
    hours: new FormControl(""),
    location: new FormControl("")
  });

  registerSubmit(){
    const name = this.registerForm.value.name || '';
    const date = this.registerForm.value.date || '';
    const weatherCondition = this.registerForm.value.weathercondition || '';
    const time = this.registerForm.value.time || '';
    const hours = this.registerForm.value.hours || '';
    const location = this.registerForm.value.location || '';

    this.authService.recordElephant([
      name,
      date,
      weatherCondition,
      time,
      hours,
      location
    ]).subscribe(res => {
      if (res === 'Success') {
        this.isAccountCreated = true;
        this.toastr.success("Record Added Successfully");
      } else {
        this.isAccountCreated = false;
        this.toastr.error("Something Went Wrong");
      }
    });
  }

  get Name(): FormControl {
    return this.registerForm.get("name") as FormControl;
  }
  get Date(): FormControl {
    return this.registerForm.get("date") as FormControl;
  }
  get WeatherCondition(): FormControl {
    return this.registerForm.get("weathercondition") as FormControl;
  }
  get Time(): FormControl {
    return this.registerForm.get("time") as FormControl;
  }
  get Hours(): FormControl {
    return this.registerForm.get("hours") as FormControl;
  }
  get Location(): FormControl {
    return this.registerForm.get("location") as FormControl;
  }
}
