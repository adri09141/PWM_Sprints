import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {FormsModule, NgForm, NgModel} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {DatabaseService} from '../../services/database';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  menorEdad: boolean = true;
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor(private db: DatabaseService) {
  }
  user: any = null;

  ngOnInit() {
    this.authService.currentUser$.subscribe(currentUser => {
      if (currentUser) {
         this.user = { ...currentUser };
      } else {
         this.router.navigate(['/IniciarSesion']);
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
    if(usuario && usuario.id) {
      this.authService.eliminarCuentaPropia();
      this.router.navigate(['/IniciarSesion']);
    }
  }

  modificarDatos(formulario: NgForm) {
    if (formulario.invalid || this.menorEdad) return;

    const uid = this.user.uid || this.user.id;
    console.log("El UID que se va a enviar es:", uid);
    if (uid) {
      this.db.actualizar("usuarios", uid, formulario.value)
        .then(() => {
          alert('Perfil actualizado con éxito');
        })
        .catch(error => {
          console.error('Error al actualizar:', error);
        });
    }
  }
}
