import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../Core/Models/user/IUser';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { requetSingin } from '../../../../Core/Models/user/requetSingin';
import { AuthService } from '../../../../Core/Auth/auth-service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../Shared/Directives/notification/notification-service';
import { Loader } from '../../../../Shared/Directives/loader/loader';
import { StorageAuth } from '../../../../Core/Storage-auth/storage-auth';
import { Utilisateur } from '../../../../Core/Services/user/utilisateur';
import { MsgService } from '../../../../Shared/Directives/toast/msg-service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List implements OnInit {
  rolesList = ['ROLE_USER', 'ROLE_ADMIN',  'ROLE_FINANCE'];
  loading$: Observable<boolean> | undefined;
  users: IUser[] = [];
  selectedRoles: string[] = [];
  dRoles: string[] = [];

// Add this method to check if a user has a specific role
hasRole(user: any, role: string): boolean {
  return user.roles?.some((r: any) => r.name === role);
}

  constructor(
    private loadingService: Loader,
    private toastrService: MsgService,
    private _dao: Utilisateur,
    private route: Router
  ) {
    this.loading$ = this.loadingService.loading$;
  }
  ngOnInit(): void {
        this.loadUsers();
  }

    loadUsers() {
    this._dao.getAllUsers().subscribe((data) => 
      this.users = data);
        console.log('user list',  this.users )
  }


   toggleBlock(user: any) {
    if (user.active) {
      this._dao.blockUser(user.id).subscribe(() => this.loadUsers());
    } else {
      this._dao.unblockUser(user.id).subscribe(() => this.loadUsers());
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
    this._dao.assignRoles(userId, selectedRoles).subscribe({
      next: (res) => alert('Rôles attribués avec succès !'),
      error: (err) => alert('Erreur : ' + err.message),
    });
  }


  saveRoles(user: any) {
    this._dao.assignRoles(user.id, user.selectedRoles).subscribe(() => {
      alert('Rôles mis à jour');
      this.toastrService.showSuccess('Rôles mis à jour')
      this    });
  }
}
