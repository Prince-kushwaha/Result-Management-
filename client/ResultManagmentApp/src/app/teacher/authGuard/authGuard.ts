import { inject } from "@angular/core";
import { Router, RouterStateSnapshot } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { CanActivateFn } from "@angular/router"
import { catchError, map, of } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";

/* This AuthGaurd Checking that teacher is login or not / or authenticated or not */
export let authGaurd: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let authService = inject(AuthService);
    let router = inject(Router);
    return authService.IsAuthenicatedUser().pipe(map((data) => {
        if (data) {
            authService.isLoggedIn.next(true);
            return true
        } else {
            authService.isLoggedIn.next(false);
            return false;
        }
    }), catchError(() => {
        authService.isLoggedIn.next(false);
        router.navigate(['/teacher/login']);
        return of(false);
    }))
}

/* This authGuard make sure that we can not access teacher login page when teacher is already login  */
export let CanActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let authService = inject(AuthService);
    let router = inject(Router);
    return authService.IsAuthenicatedUser().pipe(map((data) => {
        if (data) {
            authService.isLoggedIn.next(true);
            router.navigate(['/teacher/results']);
            return false;
        } else {
            authService.isLoggedIn.next(false);
            return true;
        }
    }), catchError((error) => {
        authService.isLoggedIn.next(false);
        return of(true);
    }))
}
