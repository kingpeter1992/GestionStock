import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { requetSingin } from '../../../../Core/Models/user/requetSingin';
import { AuthService } from '../../../../Core/Auth/auth-service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../Shared/Directives/notification/notification-service';
import { Loader } from '../../../../Shared/Directives/loader/loader';
import { StorageAuth } from '../../../../Core/Storage-auth/storage-auth';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  ngOnInit(): void {
  }
  loading: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  loading$: Observable<boolean> | undefined;
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  roles: string[] = [];

constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private route: Router,
      private notification: NotificationService,
      private storageService:StorageAuth,
      private loadingService: Loader) {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
          this.loading$ = this.loadingService.loading$;

  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
        this.loading = true;


    if (this.loginForm.invalid) {
      return;
    }


    // Préparation de la requête
    const payload: requetSingin = {
      username: this.f['username'].value,
      password: this.f['password'].value
    };


    const { username, password } = payload;

    // 👉 Ici tu peux appeler ton API d'authentification
    if (typeof username === 'string' && typeof password === 'string') {
      this.authService.login(username, password).subscribe({
        next: data => {
          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
       //   this.reloadPage();
          this.notification.showSuccess('connexion ✅ Succès');
        this.route.navigateByUrl("/admin")
          this.loading = false;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = "Nom d'utilisateur ou mot de passe invalide.";
      this.isLoginFailed = true;
      this.loading = false;
    }
  }

}
