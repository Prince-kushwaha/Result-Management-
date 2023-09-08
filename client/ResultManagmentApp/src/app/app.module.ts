import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import {HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PagenotfoundComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StudentModule,
    TeacherModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
