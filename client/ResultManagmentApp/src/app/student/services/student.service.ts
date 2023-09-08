import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from 'src/app/core/models/Result';

@Injectable()
export class StudentService {
  baseUrl:string="http://localhost:3001/api/student/"
  constructor(private http:HttpClient) {

  }

  SearchResult(form:{RollNumber:string,DateOfBirth:string}) {
    let Url=this.baseUrl+"searchresult";
    return this.http.post<Result>(Url,form);
  }
}
