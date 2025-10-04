import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../Core/Auth/auth-service';
import { StorageAuth } from '../../../../Core/Storage-auth/storage-auth';
import { Loader } from '../../../../Shared/Directives/loader/loader';
import { NotificationService } from '../../../../Shared/Directives/notification/notification-service';
import { Utilisateur } from '../../../../Core/Services/user/utilisateur';

@Component({
  selector: 'app-renitialisationpassword',
  standalone: false,
  templateUrl: './renitialisationpassword.html',
  styleUrl: './renitialisationpassword.css'
})
export class Renitialisationpassword implements OnInit{
password = '';
token = '';
loading$: Observable<boolean> | undefined;


  constructor(
    //private fb:FormBuilder,

       private _dao: Utilisateur,
       private router: Router,
       private notification: NotificationService,
       private route: ActivatedRoute,
       private storageService:StorageAuth,
       private loadingService: Loader){
    this.loading$ = this.loadingService.loading$;

    }



  
  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
      console.log('Token reçu depuis l\'URL : ', this.token);

  }

  onSubmit() {
    this._dao.resetPassword(this.token, this.password).subscribe(() => {
   //   alert('Mot de passe changé avec succès');
      this.notification.showSuccess('Mot de passe changé avec succès');
      this._dao.logout();
      this.router.navigate(['/login']);
    });
  }


}
