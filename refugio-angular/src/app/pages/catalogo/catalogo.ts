import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { TarjetaAnimal } from '../../components/tarjeta-animal/tarjeta-animal';
import { Animal } from '../../models/data.model';
import { AnimalService } from '../../services/animals/animal.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    TarjetaAnimal
  ],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  private readonly animalService = inject(AnimalService);

  animales = toSignal(this.animalService.getAnimales(), { initialValue: [] as Animal[] });
  filtro = signal("Todos")

  animalesFiltrados = computed(() => {
    // Mostrar solo los animales que NO han sido adoptados
    const disponibles = this.animales().filter(animal => !animal.adoptado);

    if (this.filtro() === "Todos") return disponibles;
    return disponibles.filter(animal => animal.especie === this.filtro());
  });

  EventoFiltro(filtro: string) {
    this.filtro.set(filtro);
  }
}
