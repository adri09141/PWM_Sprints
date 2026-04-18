import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import {DataService} from '../services/data.service';
import { DatabaseService } from './database';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dataUrl = 'assets/data.json';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private  db: DatabaseService) {
    const savedUser = localStorage.getItem('currentUser');
  }

  login(correo: string, contrasena: string): Observable<boolean> {
    return this.db.obtenerPorCorreo("usuarios", correo).pipe(
      take(1),
      map(data => {
        if(data.length > 0){
          const user = data[0];
          if(user.contrasena == contrasena)
          {
            this.currentUserSubject.next(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
          }
        }
        return false;
      })
    );
  }
  async registro(datosUsuario: any): Promise<boolean> {
    try {
      // 1. Guardamos el usuario en Firebase
      const documento = await this.db.insertar("usuarios", datosUsuario);

      // 2. Le añadimos el ID secreto que genera Firebase a los datos (muy útil para el futuro)
      datosUsuario.id = documento.id;

      // 3. ¡Lo autologueamos! Lo guardamos en memoria y en localStorage
      this.currentUserSubject.next(datosUsuario);
      localStorage.setItem('currentUser', JSON.stringify(datosUsuario));

      return true; // Todo salió perfecto
    } catch (error) {
      console.error("Error al registrar en AuthService:", error);
      return false; // Algo falló
    }
  }
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}
