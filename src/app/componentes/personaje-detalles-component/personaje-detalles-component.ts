import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonajesService } from '../../services/personajes.service';
import { Personaje } from '../../models/personaje.interface';

@Component({
  selector: 'app-personaje-detalles-component',
  imports: [CommonModule],
  templateUrl: './personaje-detalles-component.html',
  styleUrl: './personaje-detalles-component.css',
})
export class PersonajeDetallesComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly personajesService = inject(PersonajesService);

  personaje = signal<Personaje | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarPersonaje(+id);
    } else {
      this.error.set('ID de personaje inválido');
      this.loading.set(false);
    }
  }

  cargarPersonaje(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.personajesService.getPersonaje(id).subscribe({
      next: (personaje: Personaje) => {
        this.personaje.set(personaje);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar personaje:', err);
        this.error.set('Error al cargar los detalles del personaje.');
        this.loading.set(false);
      }
    });
  }

  calcularPorcentajeKi(ki: string, maxKi: string): number {
    const kiNum = parseFloat(ki.replace(/,/g, ''));
    const maxKiNum = parseFloat(maxKi.replace(/,/g, ''));
    if (maxKiNum === 0) return 0;
    return (kiNum / maxKiNum) * 100;
  }

  volver(): void {
    this.router.navigate(['/personajes']);
  }
}
