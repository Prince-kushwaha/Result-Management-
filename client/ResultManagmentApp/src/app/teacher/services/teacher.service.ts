import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/core/models/Result';

@Injectable()

export class TeacherService {
  baseUrl = "http://localhost:3001/api/teacher/"

  constructor(private http: HttpClient) {

  }

  AddResult(resultForm: Result) {
    let Url = this.baseUrl + "addresult";
    return this.http.post(Url, resultForm);
  }

  FetchAllResult() {
    let Url = this.baseUrl + 'results'
    return this.http.get<Array<Result>>(Url);
  }

  GetResult(RollNumber: string) {
    let Url = this.baseUrl + "/getresult/" + RollNumber;
    return this.http.get<Result>(Url);
  }

  UpdateResult(resultForm: Result) {
    let Url = this.baseUrl + "/updateresult";
    return this.http.put(Url, resultForm);
  }

  DeleteResult(RollNumber: string) {
    let Url = this.baseUrl + "/deleteresult/" + RollNumber;
    return this.http.delete(Url)
  }
}
