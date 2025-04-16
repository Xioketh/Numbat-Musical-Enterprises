import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../Services/AuthService";
import { usersService } from "../Services/users.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(
      private userAuthService: AuthService,
      private router: Router,
      private userService: usersService
    ) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      if (this.userAuthService.getToken() !== null) {
        const role = route.data['roles'] as Array<string>;
  
        if (role) {
          const match = this.userService.roleMatch(role);
  
          if (match) {
            return true;
          } else {
            this.router.navigateByUrl('forbidden');
            return false;
          }
        }
      }
  
      this.router.navigateByUrl('login');
      return false;
    }
    
  }