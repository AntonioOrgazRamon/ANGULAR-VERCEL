import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-components',
  imports: [],
  templateUrl: './home-components.html',
  styleUrl: './home-components.css',
})
export class HomeComponents {
  private readonly router = inject(Router);

  onStartAdventure(): void {
    console.log('¡Aventura iniciada! Goku está listo para combatir...');
    this.router.navigate(['/personajes']);
  }
}
