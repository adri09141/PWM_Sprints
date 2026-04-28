import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { Animal } from '../../models/data.model';
import { AnimalService } from '../../services/animals/animal.service';
import { AuthService } from '../../services/auth.service';
import { UserProfileService } from '../../services/usuarios/user-profile.service';

@Component({
  selector: 'app-ficha-animal-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ficha-animal.html',
  styleUrl: './ficha-animal.css',
})
export class FichaAnimalPage {
  private readonly route = inject(ActivatedRoute);
  private readonly animalService = inject(AnimalService);
  private readonly authService = inject(AuthService);
  private readonly userProfileService = inject(UserProfileService);
  private readonly router = inject(Router);

  user: any = null;

  constructor() {
    this.authService.currentUser$.subscribe((u) => {
      this.user = u;
    });
  }

  fichaAnimal = toSignal(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.animalService.getAnimalById(id))
    ),
    { initialValue: undefined as Animal | undefined }
  );

  async desadoptar(animalId: number) {
    if (!this.user) {
      alert('Necesitas iniciar sesión para desadoptar.');
      this.router.navigate(['/IniciarSesion']);
      return;
    }

    try {
      const animalesActuales: number[] = this.user.animalesAdoptados || [];
      const index = animalesActuales.indexOf(animalId);

      if (index > -1) {
        // Lo quitamos de la lista
        animalesActuales.splice(index, 1);
        const nuevoNumeroAdopciones = Math.max((this.user.numeroAdopciones || 1) - 1, 0);

        // Actualizamos perfil
        await this.userProfileService.updateProfile(this.user.uid, {
          animalesAdoptados: animalesActuales,
          numeroAdopciones: nuevoNumeroAdopciones,
        });

        this.user.numeroAdopciones = nuevoNumeroAdopciones;
      }

      // Volvemos a marcar al animal como NO adoptado en Firestore
      await this.animalService.updateAnimal(animalId, { adoptado: false });

      alert('Has desadoptado a este animal. Ya vuelve a estar disponible en el catálogo.');
      this.router.navigate(['/catalogo']);
    } catch (error) {
      console.error('Error al desadoptar:', error);
      alert('Hubo un problema al desadoptar.');
    }
  }
}
