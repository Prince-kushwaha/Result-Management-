import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptorInterceptor } from './core/interceptors/header-interceptor.interceptor';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:"**",pathMatch:'full',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:HeaderInterceptorInterceptor,multi:true}]
})

export class AppRoutingModule { }
