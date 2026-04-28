import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cambio-password',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cambio-password.html',
  styleUrl: './cambio-password.css',
})
export class CambioPassword {
  verActual = false;
  verNueva = false;
  contrasenaNueva = '';
  contrasenaRepetida = '';
  contrasenaActual = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  toggleVerActual() {
    this.verActual = !this.verActual;
  }

  toggleVerNueva() {
    this.verNueva = !this.verNueva;
  }

  cambiarContrasena() {
    this.errorMessage = '';

    if (!this.contrasenaActual || !this.contrasenaNueva || !this.contrasenaRepetida) {
      this.errorMessage = 'Por favor, rellena todos los campos.';
      return;
    }

    const patronSeguro = /^(?=(?:.*[a-zA-Z]){4,})(?=.*\d)(?=.*[^a-zA-Z\d]).+$/;
    if (!patronSeguro.test(this.contrasenaNueva)) {
      this.errorMessage =
        'La nueva contrasena es muy debil. Debe tener al menos 4 letras, 1 numero y 1 caracter especial.';
      return;
    }

    if (this.contrasenaNueva == this.contrasenaActual) {
      this.errorMessage = 'Las contrasena nueva no puede ser identica a la anterior.';
      return;
    }

    if (this.contrasenaNueva !== this.contrasenaRepetida) {
      this.errorMessage = 'Las contrasenas nuevas no coinciden.';
      return;
    }

    this.auth
      .cambiarContrasenaPropia(this.contrasenaActual, this.contrasenaNueva)
      .then(() => {
        alert('Contrasena cambiada con exito.');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
}
