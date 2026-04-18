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
  // BUSCAR POR CORREO
  obtenerPorCorreo(nombreColeccion: string, correoBuscado: string): Observable<any[]> {
    // 1. Apuntamos a la colección (ej: 'usuarios')
    const ref = collection(this.firestore, nombreColeccion);

    // 2. Creamos la consulta: "Busca donde el campo 'correo' sea exactamente igual al correoBuscado"
    const q = query(ref, where('correo', '==', correoBuscado));

    // 3. Devolvemos los resultados en tiempo real
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
