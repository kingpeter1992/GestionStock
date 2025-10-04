import { Component } from '@angular/core';

@Component({
  selector: 'app-adminlayout',
  standalone: false,
  templateUrl: './adminlayout.html',
  styleUrl: './adminlayout.css'
})
export class Adminlayout {
 isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
