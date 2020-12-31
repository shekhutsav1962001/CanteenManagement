import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }


  doSomthing() {
    this.authService.logoutUser();
  }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      if (localStorage.getItem('admin') == "yes") {
        if (localStorage.getItem('user') == "no") {
          return true
        }
        else {
          this.doSomthing();
          return false;
        }

      }
      else {
        this.doSomthing();
        return false;
      }
    }
    else {
      this.doSomthing();
      return false;
    }
  }


}
