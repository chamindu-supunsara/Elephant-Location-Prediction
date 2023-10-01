import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/views/services/auth.service';

@Component({
  selector: 'app-view-er',
  templateUrl: './view-er.component.html',
  styleUrls: ['./view-er.component.css']
})
export class ViewErComponent implements OnInit {
  registers: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getRegister().subscribe(
      (data: any) => {
        this.registers = data;
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
  }
}
