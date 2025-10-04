import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Loader } from '../../../Shared/Directives/loader/loader';
import { IRole, IUser } from '../../Models/user/IUser';
import { GlobalConstants } from '../../Constants/Global.constant';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class Utilisateur {
  


  constructor(private http: HttpClient, private loadingService: Loader) { }
  API = environment.API_URL;

  // → liste des utilisateurs
getAllUsers():Observable<IUser[]>{ 
   this.loadingService.show(); // Afficher la barre de chargement
    return this.http.get<IUser[]>(this.API+GlobalConstants.REST_CONTROLLER.USER+GlobalConstants.METHOD.USER.GET_ALLUSER).pipe(
      finalize(() => this.loadingService.hide()) // Cacher la barre après réponse
    );
}

getRolles():Observable<IRole[]>{ 
   this.loadingService.show(); // Afficher la barre de chargement
    return this.http.get<IRole[]>(this.API+GlobalConstants.REST_CONTROLLER.USER+GlobalConstants.METHOD.USER.GET_ALLROLES).pipe(
      finalize(() => this.loadingService.hide()) // Cacher la barre après réponse
    );
}



getUser(username: any) {
 // return this.http.get(`${BASIC_URL_existe}api/findusername/`+username)
 return this.http.get<any>(this.API+GlobalConstants.REST_CONTROLLER.USER+GlobalConstants.METHOD.USER.GET_USER_BY_ID+'/'+username).pipe(
      finalize(() => this.loadingService.hide()) // Cacher la barre après réponse
    );
}


logout():Observable<any> {
  return this.http.post(this.API+GlobalConstants.REST_CONTROLLER.AUTH_ADM+GlobalConstants.METHOD.AUTH.LOGOUT, { }, httpOptions);
};


forgotPassword(email: string): Observable<any> {
    return this.http.post(this.API+GlobalConstants.REST_CONTROLLER.USER+GlobalConstants.METHOD.AUTH.FORGOT, { email }).pipe(
        finalize(() => this.loadingService.hide()));
  }

resetPassword(token: string, password: string): Observable<any> {
    this.loadingService.show();
    return this.http.post(this.API+GlobalConstants.REST_CONTROLLER.USER+GlobalConstants.METHOD.AUTH.RENITIALISATION , { token, password })
      .pipe(
        finalize(() => this.loadingService.hide())
      );
  }


 blockUser(userId: number) {
  const url = this.API + GlobalConstants.METHOD.USER.BLOCK_USER(userId);
  console.log('url', url);

  this.loadingService.show();
  return this.http.put(url, {}) // ✅ changé de POST → PUT
    .pipe(finalize(() => this.loadingService.hide()));
}

unblockUser(userId: number) {
  const url = this.API + GlobalConstants.METHOD.USER.UNBLOCK_USER(userId);
  console.log('url', url);

  this.loadingService.show();
  return this.http.put(url, {}) // ✅ changé de POST → PUT
    .pipe(finalize(() => this.loadingService.hide()));
}

assignRoles(userId: number, roles: string[]) {
  const url = `${this.API}${GlobalConstants.REST_CONTROLLER.USER}/${userId}${GlobalConstants.METHOD.USER.ROLE_USER}`;
  console.log('➡️ URL utilisée pour assignRoles:', url);
  return this.http.put(url, roles)  // <-- utilise PUT, pas POST
    .pipe(
      finalize(() => this.loadingService.hide())
    );
}
  

}