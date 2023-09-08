import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Result } from 'src/app/core/models/Result';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from 'src/app/core/services/Loader.service';

@Component({
  selector: 'app-edit-result',
  templateUrl: './edit-result.component.html',
})

export class EditResultComponent implements OnInit {
  errorMsg?: string = undefined
  isLoading: boolean = false;
  resultForm: FormGroup = new FormGroup({
    Score: new FormControl(null, [Validators.required]),
    Name: new FormControl(null, [Validators.required]),
    DateOfBirth: new FormControl(null, [Validators.required]),
    RollNumber: new FormControl(null, [Validators.required])
  });

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private teacherService: TeacherService, private loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((status) => this.isLoading = status);
    this.loaderService.showLoader();
    let RollNumber = this.activatedRouter.snapshot.paramMap.get("RollNumber");
    this.teacherService.GetResult(RollNumber!).subscribe((result: Result) => {
      this.resultForm.setValue(result);
      this.loaderService.hideLoader();
    });
  }

  UpdateRecord() {
    let Result = {
      Score: this.resultForm.value.Score,
      Name: this.resultForm.value.Name,
      RollNumber: this.resultForm.value.RollNumber,
      DateOfBirth: this.resultForm.value.DateOfBirth
    }

    this.loaderService.showLoader();
    this.teacherService.UpdateResult(Result).subscribe({ next: this.next.bind(this), error: this.error.bind(this) });
  }

  next() {
    this.loaderService.hideLoader();
    this.router.navigateByUrl("/teacher/results");
  }

  error(error: HttpErrorResponse) {
    this.loaderService.hideLoader();
    this.errorMsg = error.error
  }
}
