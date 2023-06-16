import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

constructor(private authService:AuthService,private toaster:ToasterService, private router:Router){}

  canActivate:CanActivateFn=()=>{
    if(this.authService.isloggedIn()){
      return true
    }
    else{
      // alert(please login)
      this.toaster.showWarning("Access Denied!!! Please Login...","Warning")
      // redirect to landing page
      this.router.navigateByUrl("")
      return false
    }
  }
}
