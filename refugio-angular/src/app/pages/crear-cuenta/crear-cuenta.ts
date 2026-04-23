import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgModel, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './crear-cuenta.html',
  styleUrl: './crear-cuenta.css',
})
export class CrearCuenta {
  menorEdad: boolean = true;
  verContrasena: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private auth: AuthService) {}

  toggleVerContrasena() {
    this.verContrasena = !this.verContrasena;
  }

  enviarDatos(fecha: NgModel) {
    if (!fecha.value) return;
    const hoy = new Date();
    const fechaNacimiento = new Date(fecha.value);
    const edadMinima = new Date();
    edadMinima.setFullYear(hoy.getFullYear() - 18);

    this.menorEdad = fechaNacimiento >= edadMinima;
  }

  crearCuenta(formulario: NgForm) {
    if (formulario.invalid || this.menorEdad) return;

    const datos = formulario.value;
    datos.numeroAdopciones = 0;
    this.errorMessage = '';

    // AuthService se encarga de:
    //  1. Crear el usuario en Firebase Authentication
    //  2. Guardar el perfil (sin contraseña) en Firestore con el uid como ID
    this.auth.registro(datos)
      .then((exito) => {
        if (exito) {
          alert('🎉 ¡Bienvenido a la familia! Tu cuenta ha sido creada.');
          formulario.resetForm();
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'No se pudo crear la cuenta. Es posible que el correo ya esté en uso.';
        }
      })
      .catch((error) => {
        console.error('Error al crear cuenta:', error);
        this.errorMessage = 'Hubo un problema al conectar con el servidor.';
      });
  }
}

