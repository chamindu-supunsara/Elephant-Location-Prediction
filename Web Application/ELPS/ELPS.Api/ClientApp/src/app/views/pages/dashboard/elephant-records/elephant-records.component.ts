import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/views/services/auth.service';
import { elephantRecordPaper } from 'src/datamodels/dataentity';

@Component({
  selector: 'app-elephant-records',
  templateUrl: './elephant-records.component.html',
  styleUrls: ['./elephant-records.component.css']
})
export class ElephantRecordsComponent implements OnInit {
  isAccountCreated: boolean = false;
  tableUpdated: boolean = false;

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  tblElephantRecords: any = [];
  ElephantRecordsData: elephantRecordPaper = new elephantRecordPaper();
  temElephantRecords = {Name: "", Date: "", WeatherCondition: "", Time: "", Hours: "", Location: ""};

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    name: new FormControl("", [
      Validators.required, 
      Validators.minLength(2), 
      Validators.pattern("^[a-zA-Z]+$")]),
    date: new FormControl("", [
      Validators.required]),
    weathercondition: new FormControl("", [
      Validators.required]), 
    time: new FormControl("", [
      Validators.required]),
    hours: new FormControl("", [
      Validators.required, 
      Validators.pattern("^[0-9]+$")]),
    location: new FormControl("", [
      Validators.required,  
      Validators.pattern(/^(60[5-7]|61[0-9]|62[0-9]|63[0-9]|64[0-9]|65[0-7])$/)])
  });

  registerSubmit() {
    if (!this.tableUpdated) {
      this.toastr.warning("Please Check First");
      return;
    }

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
        this.resetForm();
      } else {
        this.isAccountCreated = false;
        this.toastr.error("Something Went Wrong");
      }
    });

    this.tableUpdated = false;
  }

  registerSubmitMobile() {
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
            this.resetForm();
        } else {
            this.isAccountCreated = false;
            this.toastr.error("Something Went Wrong");
        }
    });
}

  AddToTable() {
    const newRecord = {
      name: this.registerForm.value.name,
      date: this.registerForm.value.date,
      weathercondition: this.registerForm.value.weathercondition,
      time: this.registerForm.value.time,
      hours: this.registerForm.value.hours,
      location: this.registerForm.value.location
    };

    if (this.tblElephantRecords.length > 0) {
      this.tblElephantRecords[0] = newRecord;
    } else {
      this.tblElephantRecords.push(newRecord);
    }
    this.registerForm.reset();
    this.tableUpdated = true;
  }


  editELErecord(event: any) {
    this.registerForm.patchValue({
      name: event.name,
      date: event.date,
      weathercondition: event.weathercondition,
      time: event.time,
      hours: event.hours,
      location: event.location
    });
  }

  deleteELErecord(event: any) {
    const index = this.tblElephantRecords.indexOf(event);
    if (index !== -1) {
      this.tblElephantRecords.splice(index, 1);
    }
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

  resetForm() {
    this.registerForm.reset();
    this.isAccountCreated = false;
  }
}
