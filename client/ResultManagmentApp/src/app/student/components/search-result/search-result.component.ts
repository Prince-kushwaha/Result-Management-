import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Result } from 'src/app/core/models/Result';
import { LoaderService } from 'src/app/core/services/Loader.service';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})

export class SearchResultComponent implements OnInit {
  errorMsg?:string;
  isLoading:boolean=false;
  form: FormGroup = new FormGroup({
    RollNumber: new FormControl(null, [Validators.required]),
    DateOfBirth: new FormControl(null, [Validators.required])
  });

  constructor(private router:Router,private studentService:StudentService,private loaderService:LoaderService) {

  }
  
  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((status)=>this.isLoading=status);
  }

  onSubmit() {
    let RollNumber:string=this.form.value.RollNumber;
    let DateOfBirth:string=this.form.value.DateOfBirth;
    this.loaderService.showLoader();
    this.studentService.SearchResult({RollNumber,DateOfBirth}).subscribe({next:this.next.bind(this),error:this.error.bind(this)});
  }

  next(result:Result){
    this.loaderService.hideLoader();
    let RollNumber:string=this.form.value.RollNumber;
    let DateOfBirth:string=this.form.value.DateOfBirth;
    this.router.navigate(['/student/result'],{queryParams: { RollNumber,DateOfBirth} });
  }

  error (err:HttpErrorResponse) {
    this.loaderService.hideLoader();
    this.errorMsg=err.error;
  }

  formCleanUp() {
    this.form.reset();
  }
}
