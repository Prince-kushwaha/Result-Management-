import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(public authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    })
  }

  Logout() {
    this.authService.LogOut().subscribe(() => {
      this.authService.isLoggedIn.next(false);
      this.router.navigateByUrl("/");
    });
  }
}
