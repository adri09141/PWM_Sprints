import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { Animal, AppData, ContadorItem, Resena, Usuario } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly dataUrl = 'assets/data.json';

  private readonly data$ = this.http.get<AppData>(this.dataUrl).pipe(shareReplay(1));

  getData(): Observable<AppData> {
    return this.data$;
  }

  getAnimales(): Observable<Animal[]> {
    return this.data$.pipe(map((data) => data.animales));
  }

  getAnimalesDestacados(limit = 3): Observable<Animal[]> {
    return this.getAnimales().pipe(map((animales) => animales.slice(0, limit)));
  }

  getResenas(): Observable<Resena[]> {
    return this.data$.pipe(map((data) => data.resenas));
  }

  getResenasDestacadas(limit = 3): Observable<Resena[]> {
    return this.getResenas().pipe(map((resenas) => resenas.slice(0, limit)));
  }

  getContador(): Observable<ContadorItem[]> {
    return this.data$.pipe(map((data) => data.contador));
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.data$.pipe(map((data) => data.usuarios));
  }
}
