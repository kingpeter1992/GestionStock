import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Index } from '../../Shared/components/index';
import { Adminlayout } from '../../Shared/components/adminlayout/adminlayout';
import { DashboardUser } from './pages/dashboard-user/dashboard-user';
import { Details } from './pages/details/details';

const routes: Routes = [
   {
       path:'', component: Adminlayout, children:[
      {  path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // /user → /user/dashboard
      { path: 'dashboard', component: DashboardUser },
      { path: 'profile/:username', component: Details },

    ]

   }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilisateurRoutingModule {}
