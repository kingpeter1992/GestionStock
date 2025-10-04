import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../Core/Auth/auth-service';
import { Loader } from '../../../../Shared/Directives/loader/loader';
import { MsgService } from '../../../../Shared/Directives/toast/msg-service';
import { Utilisateur } from '../../../../Core/Services/user/utilisateur';
import { NotificationService } from '../../../../Shared/Directives/notification/notification-service';



@Component({
  selector: 'app-dashboard-user',
  standalone: false,
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css'
})
export class DashboardUser {

  toggleDetails(index: number) {
    this.users[index].showDetails = !this.users[index].showDetails;
  }
  rolesList : any[]=[];
  loading$: Observable<boolean> | undefined;
  loading: boolean = false;
  users: any[] = [];
  selectedRoles: string[] = [];
  dRoles: string[] = [];

 // Vérifie si un user possède un rôle donné
  hasRole(user: any, role: any): boolean {
    return user.roles.some((r: any) => r.name === role.name);
  }

  constructor(
    private loadingService: Loader,
    private toastrService: MsgService,
    private _dao: Utilisateur,
    private route: Router,
    private notification: NotificationService,

  ) {
    this.loading$ = this.loadingService.loading$;
  }
  ngOnInit(): void {
        this.loadUsers();
        this.loadAllRoles()
  }

 loadUsers() {
    this.loading = true;
  this._dao.getAllUsers().subscribe((data) => {
    this.users = data;
   // console.log('liste user', this.users);
  });
    this.loading = false;

  }

   loadAllRoles() {
  this._dao.getRolles().subscribe((data) => {
    this.rolesList = data;
 ///   console.log('liste rolesList', this.rolesList);
  });
  }


  toggleBlock(user: any) {
      this.loading = true;

  if (user.active) {
    this._dao.blockUser(user.id).subscribe({
      next: () => {
        this.loadUsers();
        this.toastrService.showSuccess(`Le compte de l'utilisateur a été désactivé avec succès !`);
          this.notification.showSuccess(' ✅ Succès');
      },
      error: () => {
        this.toastrService.showWarning(`Erreur lors de la désactivation du compte.`);
      }
    });
  } else {
    this._dao.unblockUser(user.id).subscribe({
      next: () => {
        this.loadUsers();
        this.toastrService.showSuccess(`Le compte de l'utilisateur a été activé avec succès !`);
        this.notification.showSuccess(' ✅ Succès');
          this.loading = false;

      },
      error: () => {
        this.toastrService.showWarning(`Erreur lors de l'activation du compte.`);
          this.loading = false;

      }
    });
  }
}



   onRoleChange(user: any, role: string, event: any) {
    if (!user.selectedRoles) user.selectedRoles = [];
    if (event.target.checked) {
      user.selectedRoles.push(role);
    } else {
      user.selectedRoles = user.selectedRoles.filter((r: string) => r !== role);
    }
  } 

  assignRolesToUser(userId: number, selectedRoles: string[]) {
      this.loading = true;
    this._dao.assignRoles(userId, selectedRoles).subscribe({
      next: (res) => alert('Rôles attribués avec succès !'),
      error: (err) => alert('Erreur : ' + err.message),
       complete: () => this.loading = false

    });
  }


 saveRoles(user: any) {
  // const roles = user.selectedRoles.map((role: any) => role.toString());
  // Vérifie que user.selectedRoles contient des objets comme {name: "ROLE_ADMIN"}
  // On transforme en tableau de strings ["ROLE_ADMIN", "ROLE_USER"]
  const roles: string[] = user.selectedRoles.map((r: any) => r.name ? r.name : r.toString());
  this.loading = true;


  this._dao.assignRoles(user.id, roles).subscribe({
    next: () => {
        this.toastrService.showSuccess(`Rôles mis à jour avec succès !'`);
        this.notification.showSuccess(' ✅ Succès');
          this.loading = false;

    },
    error: (err) => {
              this.toastrService.showWarning(`Erreur lors de l'activation du compte.`);
              this. notification.showError(' ❌ Erreur');
              this.loading = false;
      console.error(err);
    }
  });
}



}
