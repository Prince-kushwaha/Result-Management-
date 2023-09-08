import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/core/models/Result';
import { TeacherService } from '../../services/teacher.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/Loader.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})

export class ResultListComponent implements OnInit {
  results: Array<Result> = [];
  isLoading:boolean=true;
  constructor(private teacherService: TeacherService, private router: Router,public loaderService:LoaderService) {
    
  }
  
  ngOnInit(): void {
    this.loaderService.showLoader();
    this.teacherService.FetchAllResult().subscribe((results) => {
        this.results = results;
        this.loaderService.hideLoader();
    });

    this.loaderService.isLoading.subscribe((status)=>this.isLoading=status);
  }

  AddRecord() {
    this.router.navigateByUrl("/teacher/addresult");
  }

  EditRecord(RollNumber: string) {
    let Url = "/teacher/editresult/" + RollNumber;
    this.router.navigateByUrl(Url);
  }

  DeleteRecord(RollNumber: string) {
    this.teacherService.DeleteResult(RollNumber).subscribe(() => {
        window.location.reload();
    });
  }
}
