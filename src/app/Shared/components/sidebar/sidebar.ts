import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Menu } from '../../../Core/Models/menus/menus';
import { StorageAuth } from '../../../Core/Storage-auth/storage-auth';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showuserBoard = false;
  showRhBoard = false;
  showfinanceBoard = false;
  username?: string;
  isSidebarOpen = false;
  @Input() collapsed = false;

  public menuPropertisAchat: Array<Menu> = [
    {

      id: '1', icon: 'fa-solid fa-cart-shopping', titre: 'Achat', url: 'achat', sousMenus: [
        { id: '800', titre: 'Dashboard', icon: 'fa-solid fa-gauge-simple', url: 'achat/dasboard', },
      ]
    },

  ]




  public menuPropertisClient: Array<Menu> = [
    {
      id: '2', icon: 'fa-solid fa-person', titre: 'Client', url: 'client', sousMenus: [
        { id: '1', titre: 'Dashboard', icon: 'fa-solid fa-gauge-simple', url: 'client/Dasboard', },
      ]
    },
  ]
  public menuPropertisVente: Array<Menu> = [
    {
      id: '3', icon: 'fa-solid fa-store', titre: 'Vente', url: 'vente', sousMenus: [
        { id: '2800', titre: 'Dash mouvement', icon: 'fa-solid fa-gauge-simple', url: 'vente/dasboard', },

      ]
    },
  ]

  public menuPropertInteroogation: Array<Menu> = [
    {
      id: '4', icon: 'fa-solid fa-question', titre: 'intertogation', url: 'inqurie', sousMenus: [
        { id: '2800', titre: 'Etat Caisse', icon: 'fa-solid fa-gauge-simple', url: 'inquirie/danboard', },
      ]
    },
  ]

  public menuPropertisInventaire: Array<Menu> = [
    {
      id: '5', icon: 'fa-solid fa-warehouse', titre: 'inventorie', url: 'inventor', sousMenus: [
        { id: '2400', titre: 'Gestion compte', icon: 'fa-solid fa-gauge-simple', url: 'inventorie/dasboard', },
      ]
    },
  ]

  
  public menuPropertisMenusUser: Array<Menu> = [
    {
      id: '6', icon: 'fa-solid fa-users-rays', titre: 'Gestion User', url: 'user', sousMenus: [
        { id: '2400', titre: 'Management', icon: 'fa-solid fa-gauge-simple', url: 'user/dashboard', },
      ]
    },
  ]



  constructor(
         private route: Router,
         private storageService:StorageAuth) {
   
  }


navigate(url?: string) {
  if (!url) return;
  this.route.navigateByUrl(url); // url = 'user/dashboard'
}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.storageService.getToken()
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showuserBoard = this.roles.includes('ROLE_USER');
      this.showfinanceBoard = this.roles.includes('ROLE_FINANCE');
      this.username = user.username;
    }

  }

     signOut(): void {
       this.storageService.clean();
       this.route.navigateByUrl("/")
       }
  

}
