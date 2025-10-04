import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MsgService } from '../../Shared/Directives/toast/msg-service';
import { Router } from '@angular/router';
import { NotificationService } from '../../Shared/Directives/notification/notification-service';
import { StorageAuth } from '../Storage-auth/storage-auth';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
 
 
 constructor(
       private route: Router,
       private notification: NotificationService,
        private localStorage: StorageAuth,
   ) {
 
 
   }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  // Récupération du token dans localStorage
    const token = this.localStorage.getToken();

    let clonedRequest = req;

    
    if (token) {
       clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      
      return next.handle(clonedRequest);
    }

   return next.handle(clonedRequest).pipe(
  catchError((error: HttpErrorResponse) => {
    let errorMsg = "❌ Erreur inconnue";

    if (error.error) {
      // Si le backend renvoie un JSON { message: "...", error: "...", status: ... }
      if (typeof error.error === 'object' && error.error.message) {
        errorMsg = error.error.message; // 👈 ici on récupère "Bad credentials"
      } else if (typeof error.error === 'string') {
        errorMsg = error.error; // parfois le backend renvoie une string simple
      }
    }

    // Afficher le message avec ton service de notification
    this.notification.showError(errorMsg);

    // Toujours relancer l’erreur si tu veux que d'autres handlers puissent la traiter
    return throwError(() => error);
  })
);
  }
}