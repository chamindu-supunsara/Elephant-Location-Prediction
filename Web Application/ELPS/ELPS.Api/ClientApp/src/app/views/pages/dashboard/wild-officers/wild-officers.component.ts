import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/views/services/auth.service';

@Component({
  selector: 'app-wild-officers',
  templateUrl: './wild-officers.component.html',
  styleUrls: ['./wild-officers.component.css']
})
export class WildOfficersComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
  }
  
}
