import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MsgService {
  
   constructor(private toastr: ToastrService) {}

  checkError(error: any) {
    if (error.status === 401) {
      this.showWarning('Vous n\'avez pas l\'autorisation');
    } else if (error.status === 403) {
      this.showWarning('Accès refusé');
    } else if ([500, 502, 503].includes(error.status)) {
      this.showWarning('Erreur serveur, merci de contacter l\'administrateur');
    } else if (error.status === 504) {
      this.showWarning('Le serveur ne répond pas, merci de contacter l\'administrateur');
    } else if ([400, 404, 408].includes(error.status)) {
      this.showWarning('Mauvaise requête');
    } else if (error.status === 0) {
      this.showInfo('Actualisez la page');
    } else {
      this.showError('Une erreur inattendue est survenue');
    }
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Succès');
  }

  showError(message: string) {
    this.toastr.error(message, 'Erreur');
  }

  showWarning(message: string) {
    this.toastr.warning(message, 'Attention');
  }

  showInfo(message: string) {
    this.toastr.info(message, 'Information');
  }
}
