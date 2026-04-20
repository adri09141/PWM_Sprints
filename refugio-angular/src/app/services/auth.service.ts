import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseService } from './database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private db = inject(DatabaseService);

  // Emite el perfil completo del usuario (datos de Firestore) o null si no hay sesión
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Escuchamos los cambios de sesión de Firebase Auth en tiempo real.
    // Cuando el usuario ya tiene sesión activa (p.ej. al recargar la página),
    // recuperamos su perfil de Firestore automáticamente.
    onAuthStateChanged(this.auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        // El usuario tiene sesión: cargamos su perfil desde Firestore
        const perfil = await this.db.obtenerPorId('usuarios', firebaseUser.uid);
        this.currentUserSubject.next(perfil ?? { uid: firebaseUser.uid, correo: firebaseUser.email });
      } else {
        // Sin sesión activa
        this.currentUserSubject.next(null);
      }
    });
  }

  /**
   * REGISTRO: crea la cuenta en Firebase Auth y guarda el perfil (sin contraseña) en Firestore.
   * @param datosUsuario Objeto con los campos del formulario (nombre, correo, contrasena, etc.)
   * @returns true si el registro fue exitoso, false en caso de error
   */
  async registro(datosUsuario: any): Promise<boolean> {
    try {
      // 1. Creamos el usuario en Firebase Authentication (gestiona la contraseña de forma segura)
      const credencial = await createUserWithEmailAndPassword(
        this.auth,
        datosUsuario.correo,
        datosUsuario.contrasena
      );

      const uid = credencial.user.uid;

      // 2. Construimos el perfil SIN la contraseña para guardarlo en Firestore
      const { contrasena, ...perfilSinContrasena } = datosUsuario;
      const perfil = {
        ...perfilSinContrasena,
        uid,
        numeroAdopciones: datosUsuario.numeroAdopciones ?? 0,
        fechaRegistro: new Date().toISOString()
      };

      // 3. Guardamos el perfil en Firestore usando el uid como ID del documento
      await this.db.insertarConId('usuarios', uid, perfil);

      // 4. Actualizamos el estado local de la sesión
      this.currentUserSubject.next({ ...perfil, id: uid });

      return true;
    } catch (error: any) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }

  /**
   * LOGIN: valida con Firebase Auth y recupera el perfil adicional de Firestore.
   * @returns Observable<boolean> — true si el login fue exitoso
   */
  login(correo: string, contrasena: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      signInWithEmailAndPassword(this.auth, correo, contrasena)
        .then(async (credencial) => {
          // Auth validó las credenciales. Recuperamos el perfil desde Firestore.
          const perfil = await this.db.obtenerPorId('usuarios', credencial.user.uid);
          this.currentUserSubject.next(perfil ?? { uid: credencial.user.uid, correo });
          observer.next(true);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error al iniciar sesión:', error);
          observer.next(false);
          observer.complete();
        });
    });
  }

  /**
   * CIERRE DE SESIÓN: cierra la sesión en Firebase y limpia el estado local.
   */
  logout(): void {
    signOut(this.auth).catch(err => console.error('Error al cerrar sesión:', err));
    this.currentUserSubject.next(null);
  }

  /**
   * Devuelve true si hay un usuario con sesión activa.
   */
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  /**
   * Devuelve el perfil del usuario actual (sincrónico, desde BehaviorSubject).
   */
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}

