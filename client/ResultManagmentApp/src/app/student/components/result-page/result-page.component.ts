import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Result } from 'src/app/core/models/Result';
import { ActivatedRoute, } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from 'src/app/core/services/Loader.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})

export class ResultPageComponent implements OnInit {
  errorMsg?: string = undefined
  isLoading: boolean = false;
  result: Result = {
    Name: '',
    Score: '',
    RollNumber: '',
    DateOfBirth: ''
  }

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute, private loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((status) => this.isLoading = status);
    let RollNumber = this.activatedRoute.snapshot.queryParamMap.get('RollNumber')!;
    let DateOfBirth = this.activatedRoute.snapshot.queryParamMap.get('DateOfBirth')!;
    this.studentService.SearchResult({ RollNumber, DateOfBirth }).subscribe({ next: this.next.bind(this), error: this.error.bind(this) });
    this.loaderService.showLoader();
  }

  next(resut: Result) {
    this.loaderService.hideLoader();
    this.result = resut;
  }

  error(err: HttpErrorResponse) {
    this.loaderService.hideLoader();
    this.errorMsg = err.error;
  }
}
