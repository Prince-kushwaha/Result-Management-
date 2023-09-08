import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/Loader.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
})

export class TeacherLoginComponent implements OnInit {
  errorMsg?: string = undefined;
  isLoading:boolean=false;
  TeacherLoginForm: FormGroup = new FormGroup({
    Email: new FormControl(null, [Validators.required]),
    Password: new FormControl(null, [Validators.required])
  });


  constructor(private authService: AuthService, private router: Router,private loaderService:LoaderService) {
    
  }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((status)=>this.isLoading=status);
  }

  error(error: HttpErrorResponse) {
    this.loaderService.hideLoader();
    this.errorMsg = error.error
  }

  next() {
    this.authService.isLoggedIn.next(true);
    this.loaderService.hideLoader();
    this.router.navigateByUrl('/teacher/results');
  }

  onSubmit() {
    let Email = this.TeacherLoginForm.value.Email;
    let Password = this.TeacherLoginForm.value.Password;
    let LoginDetails = {
      email: Email,
      password: Password
    };
    this.loaderService.showLoader();
    this.authService.TeacherLogin(LoginDetails).subscribe({ next: this.next.bind(this), error: this.error.bind(this) })
  }
}
