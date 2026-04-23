import { Injectable, inject } from '@angular/core';
import {
  Auth,
  EmailAuthProvider,
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

import { RegistroUsuario, Usuario } from '../models/data.model';
import { UserProfileService } from './usuarios/user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly userProfileService = inject(UserProfileService);

  private readonly currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, async (firebaseUser: User | null) => {
      if (!firebaseUser) {
        this.currentUserSubject.next(null);
        return;
      }

      const perfil = await this.userProfileService.getProfileOnce(firebaseUser.uid);
      this.currentUserSubject.next(
        perfil ?? {
          uid: firebaseUser.uid,
          nombre: '',
          apellidos: '',
          fecha_nacimiento: '',
          dni: '',
          direccion: '',
          telefono: '',
          correo: firebaseUser.email ?? '',
          numeroAdopciones: 0,
        }
      );
    });
  }

  getActualUID(): string | null {
    return this.currentUserSubject.value?.uid ?? null;
  }

  async registro(datosUsuario: RegistroUsuario): Promise<boolean> {
    try {
      const credencial = await createUserWithEmailAndPassword(
        this.auth,
        datosUsuario.correo,
        datosUsuario.contrasena
      );

      const { contrasena, ...perfilSinContrasena } = datosUsuario;
      const perfil: Usuario = {
        ...perfilSinContrasena,
        uid: credencial.user.uid,
        numeroAdopciones: datosUsuario.numeroAdopciones ?? 0,
        fechaRegistro: new Date().toISOString(),
      };

      await this.userProfileService.createProfile(credencial.user.uid, perfil);
      this.currentUserSubject.next(perfil);
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }

  login(correo: string, contrasena: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      signInWithEmailAndPassword(this.auth, correo, contrasena)
        .then(async (credencial) => {
          const perfil = await this.userProfileService.getProfileOnce(credencial.user.uid);
          this.currentUserSubject.next(
            perfil ?? {
              uid: credencial.user.uid,
              nombre: '',
              apellidos: '',
              fecha_nacimiento: '',
              dni: '',
              direccion: '',
              telefono: '',
              correo,
              numeroAdopciones: 0,
            }
          );

          observer.next(true);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error al iniciar sesion:', error);
          observer.next(false);
          observer.complete();
        });
    });
  }

  logout(): void {
    signOut(this.auth).catch((error) => console.error('Error al cerrar sesion:', error));
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  async eliminarCuentaPropia(): Promise<boolean> {
    const firebaseUser = this.auth.currentUser;

    if (!firebaseUser) {
      console.error('No hay ningun usuario logueado en este momento.');
      return false;
    }

    try {
      await this.userProfileService.deleteProfile(firebaseUser.uid);
      await deleteUser(firebaseUser);
      this.currentUserSubject.next(null);
      return true;
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      return false;
    }
  }

  async cambiarContrasenaPropia(contrasenaActual: string, nuevaContrasena: string): Promise<boolean> {
    const firebaseUser = this.auth.currentUser;

    if (!firebaseUser || !firebaseUser.email) {
      throw new Error('No hay usuario logueado.');
    }

    try {
      const credenciales = EmailAuthProvider.credential(firebaseUser.email, contrasenaActual);
      await reauthenticateWithCredential(firebaseUser, credenciales);
      await updatePassword(firebaseUser, nuevaContrasena);
      return true;
    } catch (error: any) {
      console.error('Error al cambiar contrasena:', error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        throw new Error('La contrasena actual es incorrecta.');
      }

      throw new Error('Hubo un error al conectar con el servidor.');
    }
  }
}
