import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TeacherLoginComponent } from "./components/teacher-login/teacher-login.component";
import { AddResultComponent } from "./components/add-result/add-result.component";
import { ResultListComponent } from "./components/result-list/result-list.component";
import { EditResultComponent } from "./components/edit-result/edit-result.component";
import { CanActivate, authGaurd } from "./authGuard/authGuard";

const routes:Routes=[
    { path: 'teacher/login', component: TeacherLoginComponent ,canActivate:[CanActivate]},
    { path: 'teacher/addresult', component: AddResultComponent,canActivate:[authGaurd] },
    { path: 'teacher/results', component: ResultListComponent,canActivate:[authGaurd] },
    {path:'teacher/editresult/:RollNumber',component:EditResultComponent,canActivate:[authGaurd]}
  
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class TeacherRoutingModule{
    
}