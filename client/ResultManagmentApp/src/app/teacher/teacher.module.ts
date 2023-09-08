import { NgModule } from '@angular/core';
import { TeacherLoginComponent } from './components/teacher-login/teacher-login.component';
import { AddResultComponent } from './components/add-result/add-result.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import { EditResultComponent } from './components/edit-result/edit-result.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherService } from './services/teacher.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TeacherLoginComponent,
    AddResultComponent,
    ResultListComponent,
    EditResultComponent
  ],
  imports: [
    SharedModule,
    TeacherRoutingModule
  ],
  providers:[TeacherService]
})

export class TeacherModule { }
