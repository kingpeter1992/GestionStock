import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Form } from './modules/utilisateur/pages/form/form';
import { Login } from './modules/utilisateur/pages/login/login';
import { Passwordforgot } from './modules/utilisateur/pages/passwordforgot/passwordforgot';
import { Renitialisationpassword } from './modules/utilisateur/pages/renitialisationpassword/renitialisationpassword';
import { Index } from './Shared/components/index';
import { authGuardGuard } from './Core/Auth-guard/auth-guard-guard';
import { PageNotFound } from './Shared/components/page-not-found/page-not-found';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'singup', component: Form },
  { path: 'login', component: Login },
  { path: 'forgarpaaword', component: Passwordforgot },
  { path: 'reset-password', component: Renitialisationpassword},
 // { path: '**', component: PageNotFound },
   // Page d’accueil admin
  {
    path: 'admin',
    component: Index,
    canActivate: [authGuardGuard]   // protège l’accès
  },

  {
    //user/dashboard
    path: 'user',
    loadChildren: () =>
      import('./modules/utilisateur/utilisateur-module').then((m) => m.UtilisateurModule),canActivate:[authGuardGuard]},
  {
    path: 'achat',
    loadChildren: () => import('./modules/achat/achat-module').then((m) => m.AchatModule),canActivate:[authGuardGuard],
  },
  {
    path: 'vente',
    loadChildren: () => import('./modules/vente/vente-module').then((m) => m.VenteModule),canActivate:[authGuardGuard]
  },
  {
    path: 'client',
    loadChildren: () => import('./modules/client/client-module').then((m) => m.ClientModule),canActivate:[authGuardGuard]
  },
  {
    path: 'interrogation',
    loadChildren: () =>
      import('./modules/interrogation/interrogation-module').then((m) => m.InterrogationModule),canActivate:[authGuardGuard]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
