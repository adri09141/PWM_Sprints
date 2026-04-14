import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';

import { Animal } from '../../models/data.model';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-adoptados',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './adoptados.html',
  styleUrl: './adoptados.css',
})
export class Adoptados {
  private readonly authService = inject(AuthService);
  private readonly dataService = inject(DataService);
  private readonly router = inject(Router);

  user = toSignal(this.authService.currentUser$, { initialValue: null as any });
  animales = toSignal(this.dataService.getAnimales(), { initialValue: [] as Animal[] });

  adoptadoIds = computed(() => {
    const user = this.user();
    const adoptados = user?.animalesAdoptados ?? user?.adoptados ?? [];
    return Array.isArray(adoptados)
      ? adoptados
          .map((id: any) => Number(id))
          .filter((id: number) => !Number.isNaN(id))
      : [];
  });

  adoptados = computed(() => {
    const ids = new Set(this.adoptadoIds());
    return this.animales().filter((animal) => ids.has(animal.id));
  });

  constructor() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/IniciarSesion']);
    }
  }
}
