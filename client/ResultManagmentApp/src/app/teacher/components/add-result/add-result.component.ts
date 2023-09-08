import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import {  Router } from '@angular/router';
import { Result } from 'src/app/core/models/Result';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from 'src/app/core/services/Loader.service';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
})

export class AddResultComponent implements OnInit {
  errorMsg?: string = undefined
  isLoading: boolean = false
  resultForm: FormGroup = new FormGroup({
    Score: new FormControl(null, [Validators.required]),
    Name: new FormControl(null, [Validators.required]),
    DateOfBirth: new FormControl(null, [Validators.required]),
    RollNumber: new FormControl(null, [Validators.required])
  })

  constructor(private teacherService: TeacherService, private router: Router, private loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((status) => {
      this.isLoading = status;
    });
  }

  AddRecord() {
    let result: Result = {
      Score: this.resultForm.value.Score,
      Name: this.resultForm.value.Name,
      RollNumber: this.resultForm.value.RollNumber,
      DateOfBirth: this.resultForm.value.DateOfBirth
    }

    this.loaderService.showLoader();
    this.teacherService.AddResult(result).subscribe({ next: this.next.bind(this), error: this.error.bind(this) });
  }

  next() {
    this.loaderService.hideLoader();
    this.router.navigateByUrl("/teacher/results");
  }

  error(error: HttpErrorResponse) {
    this.loaderService.hideLoader();
    this.errorMsg = error.error;
  }
}
