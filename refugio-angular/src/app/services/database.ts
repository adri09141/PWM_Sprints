import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
  getDoc
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: Firestore) {}

  // GUARDAR (ID generado automáticamente por Firebase)
  insertar(nombreColeccion: string, data: any) {
    const ref = collection(this.firestore, nombreColeccion);
    return addDoc(ref, data);
  }

  // GUARDAR CON ID PERSONALIZADO (usado para crear perfiles con el uid de Firebase Auth)
  insertarConId(nombreColeccion: string, id: string, data: any): Promise<void> {
    const ref = doc(this.firestore, `${nombreColeccion}/${id}`);
    return setDoc(ref, data);
  }

  // OBTENER UN DOCUMENTO POR ID
  obtenerPorId(nombreColeccion: string, id: string): Promise<any> {
    const ref = doc(this.firestore, `${nombreColeccion}/${id}`);
    return getDoc(ref).then(snap => snap.exists() ? { id: snap.id, ...snap.data() } : null);
  }

  // LEER TODOS (en tiempo real)
  obtenerTodos(nombreColeccion: string): Observable<any[]> {
    const ref = collection(this.firestore, nombreColeccion);
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

  // BUSCAR POR CORREO
  obtenerPorCorreo(nombreColeccion: string, correoBuscado: string): Observable<any[]> {
    const ref = collection(this.firestore, nombreColeccion);
    const q = query(ref, where('correo', '==', correoBuscado));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
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

