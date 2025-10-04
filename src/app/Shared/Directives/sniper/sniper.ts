import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-sniper',
  standalone: false,
  templateUrl: './sniper.html',
  styleUrl: './sniper.css'
})
export class Sniper implements OnInit{
  loading$: Observable<boolean> | undefined;
  constructor( private loadingService: Loader,
) {
    this.loading$ = this.loadingService.loading$;
}
  ngOnInit(): void {
  }
}
