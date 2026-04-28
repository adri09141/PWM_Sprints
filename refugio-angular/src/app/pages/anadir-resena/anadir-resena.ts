import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

import { Usuario } from '../../models/data.model';
import { AuthService } from '../../services/auth.service';
import { ResenaService } from '../../services/resenas/resena.service';

@Component({
  selector: 'app-anadir-resena',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './anadir-resena.html',
  styleUrl: './anadir-resena.css',
})
export class AnadirResena {
  private readonly authService = inject(AuthService);
  private readonly resenaService = inject(ResenaService);

  archivoFoto: File | null = null;
  fotoCancelada = false;
  user: Usuario | null = null;

  constructor(private router: Router) {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });

    if (!this.authService.isLoggedIn()) {
      alert('No esta logueado');
      this.router.navigate(['/crearCuenta']);
    }
  }

  async enviarDatos(formulario: NgForm) {
    if (formulario.invalid || !this.user) {
      return;
    }

    try {
      await this.resenaService.createResena({
        idUsuario: this.user.uid,
        nombreAnimal: formulario.value.nombre_mascota,
        titulo: formulario.value.titulo_resena,
        resena: formulario.value.descripcion_resena,
        fecha: new Date().toISOString().slice(0, 10),
        foto: 'assets/img/resenas/fondoNegro.jpg',
        valoracion: Number(formulario.value.valoracion),
      });

      alert(`Estamos validando tu resena sobre tu pequeno: ${formulario.value.nombre_mascota}`);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error al guardar la resena:', error);
      alert('No se pudo guardar la resena. Intentalo de nuevo.');
    }
  }

  capturarFoto(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivoQueHaSubido = input.files?.[0] ?? null;

    if (archivoQueHaSubido) {
      this.archivoFoto = archivoQueHaSubido;
      this.fotoCancelada = false;
    }
  }
}
