import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {

  }

  TeacherLogin(form: { email: string, password: string }) {
    let Url = "http://localhost:3001/api/teacher/login";
    return this.http.post(Url, form);
  }


  LogOut() {
    let Url = "http://localhost:3001/api/logout";
    return this.http.get(Url);
  }

  IsAuthenicatedUser() {
    let Url = "http://localhost:3001/api/teacher/isLogin";
    return this.http.get<boolean>(Url);
  }
}

