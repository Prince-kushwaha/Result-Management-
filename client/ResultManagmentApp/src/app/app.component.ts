import {  Component, OnInit } from '@angular/core';
import {  NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoaderService } from './core/services/Loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit {
  constructor(private router:Router,private loaderService:LoaderService) {

  }

  ngOnInit(): void {
    this.router.events.subscribe({next:this.routerEvent.bind(this)});
  }

   /* showing And hiding loader when AuthGuard is checking whether User is authenticated or not */
  routerEvent(event:any) {
    if(event instanceof NavigationStart) {
      this.loaderService.showLoader();
    }

    if(event instanceof NavigationEnd||event instanceof NavigationError || event instanceof NavigationCancel) {
      this.loaderService.hideLoader();
    }
  }
}
