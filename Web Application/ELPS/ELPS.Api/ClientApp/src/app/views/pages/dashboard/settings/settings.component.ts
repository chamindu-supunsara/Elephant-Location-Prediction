import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/views/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }
}
