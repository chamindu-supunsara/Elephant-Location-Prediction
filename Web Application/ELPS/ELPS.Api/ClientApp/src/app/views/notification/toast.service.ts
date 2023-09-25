import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  // Show a success toast notification using ngx-toastr
  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title);
  }

  // Show an error toast notification using ngx-toastr
  showError(message: string, title: string = 'Error') {
    this.toastr.error(message, title);
  }

  // Show a warning toast notification using ngx-toastr
  showWarning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title);
  }

  // Show an info toast notification using ngx-toastr
  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title);
  }

  // Show a snackbar notification using Angular Material's MatSnackBar
  showSnackBar(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration
    });
  }
}
