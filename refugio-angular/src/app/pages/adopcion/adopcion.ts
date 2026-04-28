import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserProfileService } from '../../services/usuarios/user-profile.service';
import { AnimalService } from '../../services/animals/animal.service';

@Component({
  selector: 'app-adopcion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adopcion.html',
  styleUrl: './adopcion.css',
})
export class Adopcion implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private userProfileService = inject(UserProfileService);
  private animalService = inject(AnimalService);

  botonPulsado: boolean = false;
  animalId: number | null = null;
  user: any = null;

  ngOnInit() {
    // 1. Capturamos el ID del animal
    const idUrl = this.route.snapshot.paramMap.get('id');
    if (idUrl) {
      this.animalId = Number(idUrl);
    }

    // 2. Cargamos el usuario
    this.authService.currentUser$.subscribe((u) => {
      this.user = u;
    });

    setTimeout(() => {
      if (!this.authService.isLoggedIn()) {
        alert('Necesitas iniciar sesión para adoptar.');
        this.router.navigate(['/IniciarSesion']);
      }
    }, 800);
  }

  async home(form: NgForm) {
    if (form.valid) {
      if (this.user && this.animalId) {
        try {
          const animalesActuales = this.user.animalesAdoptados || [];

          if (!animalesActuales.includes(this.animalId)) {
            // Lo añadimos a memoria y luego a la base de datos
            animalesActuales.push(this.animalId);
            // Calculamos el nuevo número de adopciones (el que tiene + 1)
            const nuevoNumeroAdopciones = (this.user.numeroAdopciones || 0) + 1;
            //ACTUALIZAMOS LA BASE DE DATOS con las dos cosas
            await this.userProfileService.updateProfile(this.user.uid, {
              animalesAdoptados: animalesActuales,
              numeroAdopciones: nuevoNumeroAdopciones,
            });
            // Actualizamos también en local
            this.user.numeroAdopciones = nuevoNumeroAdopciones;

            // Marcamos el animal como adoptado en Firestore
            await this.animalService.updateAnimal(this.animalId, { adoptado: true });
          }

          alert('¡Felicidades! Has adoptado a tu nuevo mejor amigo. 🐾');

          // ¡Redirección limpia, SIN reload!
          this.router.navigate(['/adoptados']);
        } catch (error) {
          console.error('Error al adoptar: ', error);
          alert('Hubo un problema con la adopción.');
        }
      } else {
        // Por si acaso falla algo en el último momento
        this.router.navigate(['/IniciarSesion']);
      }
    } else {
      console.log('El formulario no es válido aún');
    }
  }

  protected readonly name = name;
}
