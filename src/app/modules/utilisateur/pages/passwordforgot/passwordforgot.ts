import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Utilisateur } from '../../../../Core/Services/user/utilisateur';
import { StorageAuth } from '../../../../Core/Storage-auth/storage-auth';
import { Loader } from '../../../../Shared/Directives/loader/loader';
import { NotificationService } from '../../../../Shared/Directives/notification/notification-service';

@Component({
  selector: 'app-passwordforgot',
  standalone: false,
  templateUrl: './passwordforgot.html',
  styleUrl: './passwordforgot.css'
})
export class Passwordforgot implements OnInit{
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
  ngOnInit(): void {
  }

    email = '';


  onSubmit() {
    this._dao.forgotPassword(this.email).subscribe(() => {
    //  alert('Si l’email existe, un lien a été envoyé.');
      this.notification.showSuccess('Si l’email existe, un lien a été envoyé, Réinitialisation du mot de passe');
    });
  }

}
