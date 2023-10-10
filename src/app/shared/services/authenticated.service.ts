import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

 @Injectable({
    providedIn: 'root'
  })
  export class isAuthenticated implements CanActivate {
    constructor(
      private router: Router,
      private authService: AuthService,
    ) {
    }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ) {

      if(this.authService.userHasToken()){
        this.router.navigate(['dashboard/home']);
        return false;
      }

      return true;
    }
  }
