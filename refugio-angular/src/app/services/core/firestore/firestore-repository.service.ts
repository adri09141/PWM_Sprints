import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDocs,
  setDoc,
  updateDoc,
  writeBatch,
} from '@angular/fire/firestore';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreRepositoryService {
  private readonly firestore = inject(Firestore);

  watchCollection<T>(path: string): Observable<T[]> {
    return collectionData(collection(this.firestore, path), { idField: 'docId' }).pipe(
      map((documents) => documents as T[]),
      catchError((error) => {
        console.error(`Error al leer la coleccion ${path}:`, error);
        return of([] as T[]);
      })
    );
  }

  watchDocument<T>(path: string, id: string): Observable<T | undefined> {
    return docData(doc(this.firestore, `${path}/${id}`), { idField: 'docId' }).pipe(
      map((document) => document as T),
      catchError((error) => {
        console.error(`Error al leer el documento ${path}/${id}:`, error);
        return of(undefined);
      })
    );
  }

  async getCollectionOnce<T>(path: string): Promise<T[]> {
    try {
      const snapshot = await getDocs(collection(this.firestore, path));
      return snapshot.docs.map((document) => ({ docId: document.id, ...document.data() }) as T);
    } catch (error) {
      console.error(`Error al obtener la coleccion ${path}:`, error);
      return [];
    }
  }

  set<T extends object>(path: string, id: string, data: T): Promise<void> {
    return setDoc(doc(this.firestore, `${path}/${id}`), data);
  }

  update<T extends object>(path: string, id: string, data: Partial<T>): Promise<void> {
    return updateDoc(doc(this.firestore, `${path}/${id}`) as any, data as any);
  }

  delete(path: string, id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, `${path}/${id}`));
  }

  upsertMany<T extends object>(path: string, documents: T[], resolveId: (document: T) => string): Promise<void> {
    const batch = writeBatch(this.firestore);

    for (const documentData of documents) {
      batch.set(doc(this.firestore, `${path}/${resolveId(documentData)}`), documentData, { merge: true });
    }

    return batch.commit();
  }
}
