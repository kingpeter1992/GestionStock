import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StorageAuth } from '../../../Core/Storage-auth/storage-auth';
import { MsgService } from '../../Directives/toast/msg-service';
import { Utilisateur } from '../../../Core/Services/user/utilisateur';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements  OnInit {


  
gotTodetailsUser(arg0: string|undefined) {
    // Redirige vers la page profil utilisateur
    this.route.navigate(['/user/profile', this.username]);
}

 isSidebarCollapsed = false;
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  onToggleSidebar() {
    this.toggleSidebarEvent.emit();
  }


  
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;  
  roles: string[] = [];

  constructor(
     private storageService:StorageAuth,
     private _dao:Utilisateur, 
     private route:Router){}

  ngOnInit(): void {
 this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
      this.roles = user.roles;
    }  }

     
      signOut(): void {
    this.storageService.clean();
    this.route.navigate(['/login']);    
    }
    


  
}