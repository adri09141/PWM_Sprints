import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
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
  constructor(private router: Router) {}
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
