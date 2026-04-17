import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  docData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: Firestore) {}

  // GUARDAR
  insertar(nombreColeccion: string, data: any) {
    const ref = collection(this.firestore, nombreColeccion);
    return addDoc(ref, data);
  }

  // LEER TODOS (en tiempo real)
  obtenerTodos(nombreColeccion: string): Observable<any[]> {
    const ref = collection(this.firestore, nombreColeccion);
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

  // ACTUALIZAR
  actualizar(nombreColeccion: string, id: string, data: any) {
    const ref = doc(this.firestore, `${nombreColeccion}/${id}`);
    return updateDoc(ref, data);
  }

  // BORRAR
  eliminar(nombreColeccion: string, id: string) {
    const ref = doc(this.firestore, `${nombreColeccion}/${id}`);
    return deleteDoc(ref);
  }
}
