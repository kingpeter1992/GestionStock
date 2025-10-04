import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MsgService } from '../../Shared/Directives/toast/msg-service';
import { StorageAuth } from '../Storage-auth/storage-auth';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'  // IMPORTANT
})
export class  authGuardGuard implements CanActivate {

  constructor(private route: Router,  private token: StorageAuth, private mss:MsgService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let  auth = this.token.isLoggedIn()
      console.log(auth)
      if (auth) {
        return true;
      }
      
      return this.route.navigate(['/login']);
  }
    }