import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-anadir-resena',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './anadir-resena.html',
  styleUrl: './anadir-resena.css',
})
export class AnadirResena {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private islogin = false;
  user: any = null;
  constructor(private router: Router) {
    const usuarioGuardado = localStorage.getItem('currentUser');
    if (usuarioGuardado) {
      this.islogin = true;
      this.user = JSON.parse(usuarioGuardado);
      this.currentUserSubject.next(this.user);
    }
    if(!this.islogin){
      alert("no esta logueado");
      this.router.navigate(['/crearCuenta']);
    }
  }
  archivoFoto: File | null = null;
  fotoCancelada: boolean = false;
  enviarDatos(formulario: NgForm)
  {
    if (formulario.invalid) {
      return;
    }
    console.log(formulario.value)
    alert("Estamos validando tu reseña sobre tu pequeño: " + formulario.value.nombre_mascota);
    this.router.navigate(['/']);
  }
  capturarFoto(event: any) {
    const archivoQueHaSubido = event.target.files[0];
    if (archivoQueHaSubido) {
      this.archivoFoto = archivoQueHaSubido;
      this.fotoCancelada = false; // Si sube foto, apagamos el error
    }
  }
}
