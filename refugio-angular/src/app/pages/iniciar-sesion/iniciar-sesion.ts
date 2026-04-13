import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css',
})
export class IniciarSesion {
  correo: string = '';
  contrasena: string = '';
  errorMessage: string = '';
  verContrasena: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  toggleVerContrasena() {
    this.verContrasena = !this.verContrasena;
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.correo && this.contrasena) {
      this.authService.login(this.correo, this.contrasena).subscribe({
        next: (exito) => {
          if (exito) {
            this.router.navigate(['/']);
          } else {
             this.errorMessage = 'Correo o contraseña incorrectos.';
          }
        },
        error: (err) => {
          this.errorMessage = 'No se pudo conectar con el servidor para validar las credenciales.';
        }
      });
    }
  }
}
