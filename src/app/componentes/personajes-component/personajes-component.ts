import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PersonajesService } from '../../services/personajes.service';
import { Personaje, ApiResponse } from '../../models/personaje.interface';

@Component({
  selector: 'app-personajes-component',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './personajes-component.html',
  styleUrl: './personajes-component.css',
})
export class PersonajesComponent implements OnInit {
  private readonly personajesService = inject(PersonajesService);
  private readonly router = inject(Router);
  protected readonly currentYear = new Date().getFullYear();

  // Signals para manejo reactivo de estado
  personajes = signal<Personaje[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  
  // URLs de paginación
  nextUrl = signal<string | null>(null);
  previousUrl = signal<string | null>(null);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes(url: string | null = null): void {
    this.loading.set(true);
    this.error.set(null);

    this.personajesService.getPersonajes(url).subscribe({
      next: (response: ApiResponse) => {
        this.personajes.set(response.items);
        this.nextUrl.set(response.links.next);
        this.previousUrl.set(response.links.previous);
        this.currentPage.set(response.meta.currentPage);
        this.totalPages.set(response.meta.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar personajes:', err);
        this.error.set('Error al cargar los personajes. Por favor, intenta de nuevo.');
        this.loading.set(false);
      }
    });
  }

  verDetalles(id: number): void {
    this.router.navigate(['/personajes', id]);
  }

  paginaAnterior(): void {
    if (this.previousUrl()) {
      this.cargarPersonajes(this.previousUrl());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  paginaSiguiente(): void {
    if (this.nextUrl()) {
      this.cargarPersonajes(this.nextUrl());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
