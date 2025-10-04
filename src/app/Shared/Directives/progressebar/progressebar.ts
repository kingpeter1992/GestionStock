import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-progressebar',
  standalone: false,
  templateUrl: './progressebar.html',
  styleUrl: './progressebar.css'
})
export class Progressebar {
  @Input() loading: boolean = false;           // contrôle du loader
  @Input() message: string = 'Chargement...';  // message optionne
}
