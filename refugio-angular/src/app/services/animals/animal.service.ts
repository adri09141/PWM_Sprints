import { Injectable, inject } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { Animal } from '../../models/data.model';
import { FirestoreRepositoryService } from '../core/firestore/firestore-repository.service';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private readonly repository = inject(FirestoreRepositoryService);
  private readonly collectionPath = 'animales';

  private readonly animales$ = this.repository.watchCollection<Animal>(this.collectionPath).pipe(
    map((animales) => [...animales].sort((a, b) => a.id - b.id)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getAnimales(): Observable<Animal[]> {
    return this.animales$;
  }

  getAnimalById(id: number): Observable<Animal | undefined> {
    return this.animales$.pipe(map((animales) => animales.find((animal) => animal.id === id)));
  }

  getAnimalesDestacados(limit = 3): Observable<Animal[]> {
    return this.animales$.pipe(map((animales) => animales.slice(0, limit)));
  }

  createAnimal(animal: Animal): Promise<void> {
    return this.repository.set(this.collectionPath, String(animal.id), animal);
  }

  updateAnimal(id: number, animal: Partial<Animal>): Promise<void> {
    return this.repository.update<Animal>(this.collectionPath, String(id), animal);
  }

  deleteAnimal(id: number): Promise<void> {
    return this.repository.delete(this.collectionPath, String(id));
  }

  seed(animales: Animal[]): Promise<void> {
    return this.repository.upsertMany(this.collectionPath, animales, (animal) => String(animal.id));
  }

  getAnimalesSnapshot(): Promise<Animal[]> {
    return this.repository.getCollectionOnce<Animal>(this.collectionPath);
  }
}
