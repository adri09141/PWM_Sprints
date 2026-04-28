import { Injectable, inject } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { Resena } from '../../models/data.model';
import { FirestoreRepositoryService } from '../core/firestore/firestore-repository.service';

export type NuevaResena = Omit<Resena, 'id'> & Partial<Pick<Resena, 'id'>>;

@Injectable({
  providedIn: 'root',
})
export class ResenaService {
  private readonly repository = inject(FirestoreRepositoryService);
  private readonly collectionPath = 'resenas';

  private readonly resenas$ = this.repository.watchCollection<Resena>(this.collectionPath).pipe(
    map((resenas) => [...resenas].sort((a, b) => b.id - a.id)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getResenas(): Observable<Resena[]> {
    return this.resenas$;
  }

  getResenasDestacadas(limit = 3): Observable<Resena[]> {
    return this.resenas$.pipe(map((resenas) => resenas.slice(0, limit)));
  }

  getResenaById(id: number): Observable<Resena | undefined> {
    return this.resenas$.pipe(map((resenas) => resenas.find((resena) => resena.id === id)));
  }

  async createResena(resena: NuevaResena): Promise<Resena> {
    const currentResenas = await this.repository.getCollectionOnce<Resena>(this.collectionPath);
    const nextId = resena.id ?? currentResenas.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
    const newResena: Resena = { ...resena, id: nextId };

    await this.repository.set(this.collectionPath, String(nextId), newResena);
    return newResena;
  }

  updateResena(id: number, resena: Partial<Resena>): Promise<void> {
    return this.repository.update<Resena>(this.collectionPath, String(id), resena);
  }

  deleteResena(id: number): Promise<void> {
    return this.repository.delete(this.collectionPath, String(id));
  }

  seed(resenas: Resena[]): Promise<void> {
    return this.repository.upsertMany(this.collectionPath, resenas, (resena) => String(resena.id));
  }

  getResenasSnapshot(): Promise<Resena[]> {
    return this.repository.getCollectionOnce<Resena>(this.collectionPath);
  }
}
