import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { Loader } from '../../Shared/Directives/loader/loader';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { GlobalConstants } from '../Constants/Global.constant';
import { RequestSignup } from '../Models/user/RequestSignup';
import { requetSingin } from '../Models/user/requetSingin';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  constructor(private http:HttpClient, 
    private loadingService: Loader
  ) { }
  API = environment.API_URL;

register(username: string, email: string, phone:string, password: string):Observable<any>{
  this.loadingService.show(); // Afficher la barre de chargement
  return this.http.post<any>(
    this.API+GlobalConstants.REST_CONTROLLER.AUTH_ADM+GlobalConstants.METHOD.AUTH.REGISTER, 
      { username, email, phone, password },
    httpOptions
  ).pipe(
    finalize(() => this.loadingService.hide()) // Cacher la barre après réponse
  );
}

login(username:string, password:string):Observable<any>{
  this.loadingService.show(); // Afficher la barre de chargement
  return this.http.post(
     this.API+GlobalConstants.REST_CONTROLLER.AUTH_ADM+ '' +GlobalConstants.METHOD.AUTH.LOGIN,
    {username,password},
    httpOptions
  ).pipe(
    finalize(() => this.loadingService.hide()) // Cacher la barre après réponse
  );
}
}
