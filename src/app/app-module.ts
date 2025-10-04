import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { Footer } from './Shared/components/footer/footer';
import { Details } from './modules/utilisateur/pages/details/details';
import { Form } from './modules/utilisateur/pages/form/form';
import { List } from './modules/utilisateur/pages/list/list';
import { Login } from './modules/utilisateur/pages/login/login';
import { Index } from './Shared/components/index';
import { Nav } from './Shared/components/nav/nav';
import { Sidebar } from './Shared/components/sidebar/sidebar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './Core/interceptors/http-request-interceptor-interceptor';
import { Sniper } from './Shared/Directives/sniper/sniper';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFound } from './Shared/components/page-not-found/page-not-found'; // ✅ import ici
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Renitialisationpassword } from './modules/utilisateur/pages/renitialisationpassword/renitialisationpassword';
import { Passwordforgot } from './modules/utilisateur/pages/passwordforgot/passwordforgot';
import { Adminlayout } from './Shared/components/adminlayout/adminlayout';
import { UtilisateurModule } from './modules/utilisateur/utilisateur-module';
import { DashboardUser } from './modules/utilisateur/pages/dashboard-user/dashboard-user';
import { Progressebar } from './Shared/Directives/progressebar/progressebar';

@NgModule({
  declarations: [
    App,
    List,
    Details,
    Form,
    Login,
    Index,
    Nav,
    Sniper,
    PageNotFound,
    Footer,
    Sidebar,
    Renitialisationpassword,
    Passwordforgot,
    Adminlayout,
    DashboardUser,
    Progressebar,

  ],

  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    MatProgressSpinnerModule,
    
    MatProgressSpinner,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,  // Importer FormsModule pour ngModel
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule, // ✅ ajoute-le ici
    MatSnackBarModule,
    UtilisateurModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App],
})
export class AppModule {}
