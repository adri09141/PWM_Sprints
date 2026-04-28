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
  menorEdad = false;
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

    const datosActualizados = {
      nombre: formulario.value.nombre,
      apellidos: formulario.value.apellidos,
      fecha_nacimiento: formulario.value.fecha_nacimiento,
      dni: formulario.value.dni,
      direccion: formulario.value.direccion,
      telefono: formulario.value.telefono
    };

    this.userProfileService
      .updateProfile(this.user.uid, datosActualizados)
      .then(() => {
        // 4. Si todo va bien, actualizamos el objeto local para que se vea el cambio
        this.user = { ...this.user!, ...datosActualizados };
        alert('¡Perfil actualizado con éxito! ✨');
      })
      .catch((error) => {
        console.error('Error al actualizar el perfil:', error);
        alert('No se pudieron guardar los cambios.');
      });
  }
}

