import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../../../Core/Services/user/utilisateur';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../Core/Auth/auth-service';
import { RequestSignup } from '../../../../Core/Models/user/RequestSignup';
import { Observable } from 'rxjs';
import { Loader } from '../../../../Shared/Directives/loader/loader';
import { MsgService } from '../../../../Shared/Directives/toast/msg-service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../Shared/Directives/notification/notification-service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  successMessage = '';
  loading$: Observable<boolean> | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingService: Loader,
    private route: Router,
    private notification: NotificationService,
    private toat: MsgService
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );

    this.loading$ = this.loadingService.loading$;
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    const payload: RequestSignup = {
      username: this.f['username'].value,
      phone: this.f['phone'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
    };
    const { username, email, phone, password } = payload;

    this.authService
      .register(
        username ?? '',
        phone ?? '',
        email ?? '',

        password ?? ''
      )
      .subscribe({
        next: (res) => {
       //   console.log('Réponse du backend:', res); // 👀 voir ce qui arrive réellement
       //   this.successMessage = '✅ Utilisateur enregistré avec succès !';
          this.notification.showSuccess(res.message + '✅ Succès');
          this.loading = false;
          this.registerForm.reset();
          this.submitted = false;
          this.route.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || '❌ Erreur lors de l’enregistrement';
          this.toat.showError(err.message + '❌ Erreur');
              this.notification.showError(err.error?.message || "❌ Erreur d'inscription");

          this.loading = false;
        },
      });
  }
}
