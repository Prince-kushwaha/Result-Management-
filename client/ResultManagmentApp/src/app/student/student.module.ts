import { NgModule } from '@angular/core';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ResultPageComponent } from './components/result-page/result-page.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentService } from './services/student.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StudentRoutingModule
  ],
  declarations: [
    SearchResultComponent,
    ResultPageComponent,
  ],
  providers:[StudentService]
})

export class StudentModule { }
