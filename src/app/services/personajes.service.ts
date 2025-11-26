import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Personaje } from '../models/personaje.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://dragonball-api.com/api/characters';

  /**
   * Obtiene la lista de personajes con paginación
   * @param url URL completa (para paginación) o null para primera página
   */
  getPersonajes(url: string | null = null): Observable<ApiResponse> {
    const requestUrl = url || `${this.apiUrl}?page=1&limit=10`;
    return this.http.get<ApiResponse>(requestUrl);
  }

  /**
   * Obtiene un personaje por su ID
   * @param id ID del personaje
   */
  getPersonaje(id: number): Observable<Personaje> {
    return this.http.get<Personaje>(`${this.apiUrl}/${id}`);
  }
}

