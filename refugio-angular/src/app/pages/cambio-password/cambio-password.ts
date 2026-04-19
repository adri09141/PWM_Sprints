import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {DatabaseService} from '../../services/database';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cambio-password',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cambio-password.html',
  styleUrl: './cambio-password.css',
})
export class CambioPassword {
  verActual: boolean = false;
  verNueva: boolean = false;
  contrasenaNueva: string = '';
  contrasenaRepetida: string = '';
  contrasenaActual: string = '';
  errorMessage: string = '';
  constructor(private db: DatabaseService, private  auth: AuthService, private  router: Router) {
  }

  toggleVerActual() {
    this.verActual = !this.verActual;
  }

  toggleVerNueva() {
    this.verNueva = !this.verNueva;
  }
  cambiarContrasena()
  {
    this.errorMessage = '';

    if (!this.contrasenaActual || !this.contrasenaNueva || !this.contrasenaRepetida) {
      this.errorMessage = "⚠️ Por favor, rellena todos los campos.";
      return;
    }
    const patronSeguro = /^(?=(?:.*[a-zA-Z]){3,})(?=.*\d)(?=.*[^a-zA-Z\d]).+$/;
    if (!patronSeguro.test(this.contrasenaNueva)) {
      this.errorMessage = "⚠️ La nueva contraseña es muy débil. Debe tener al menos 3 letras, 1 número y 1 carácter especial.";
      return;
    }
    if (this.contrasenaNueva !== this.contrasenaRepetida) {
      this.errorMessage = "❌ Las contraseñas nuevas no coinciden.";
      return;
    }

    const usuarioLogueado = this.auth.getCurrentUser();
    if (this.contrasenaActual !== usuarioLogueado.contrasena) {
      this.errorMessage = "❌ La contraseña actual que has introducido es incorrecta.";
      return;
    }

    const datosActualizados = {
      contrasena: this.contrasenaNueva
    };

    this.db.actualizar("usuarios", usuarioLogueado.id, datosActualizados)
      .then(() => {
        usuarioLogueado.contrasena = this.contrasenaNueva;
        localStorage.setItem('currentUser', JSON.stringify(usuarioLogueado));

        alert("¡Contraseña Cambiada con éxito! 🎉"); // El de éxito lo podemos dejar como alert o cambiarlo también si quieres
        this.router.navigate(["/"]);
      })
      .catch((error) => {
        console.error("Error al actualizar:", error);
        this.errorMessage = "❌ Hubo un error al conectar con el servidor.";
      });
  }
}
