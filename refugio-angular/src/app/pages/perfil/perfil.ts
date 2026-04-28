import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Usuario } from '../../models/data.model';
import { AuthService } from '../../services/auth.service';
import { UserProfileService } from '../../services/usuarios/user-profile.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  menorEdad = true;
  user: Usuario | null = null;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor(private readonly userProfileService: UserProfileService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        // Si hay usuario, lo cargamos al instante
        this.user = { ...currentUser };
      } else {
        setTimeout(() => {
          if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/IniciarSesion']);
          }
        }, 800);
      }
    });
  }

  enviarDatos(fecha: NgModel) {
    if (!fecha.value) return;

    const hoy = new Date();
    const fechaNacimiento = new Date(fecha.value);
    const edadMinima = new Date();
    edadMinima.setFullYear(hoy.getFullYear() - 18);

    this.menorEdad = fechaNacimiento >= edadMinima;
  }

  logout() {
    const usuario = this.authService.getCurrentUser();
    if (usuario?.uid) {
      this.authService.eliminarCuentaPropia();
      this.router.navigate(['/IniciarSesion']);
    }
  }

  modificarDatos(formulario: NgForm) {
    if (formulario.invalid || this.menorEdad || !this.user?.uid) {
      return;
    }

    this.userProfileService
      .updateProfile(this.user.uid, formulario.value)
      .then(() => {
        this.user = { ...this.user!, ...formulario.value };
        alert('Perfil actualizado con exito');
      })
      .catch((error) => {
        console.error('Error al actualizar el perfil:', error);
      });
  }
}
