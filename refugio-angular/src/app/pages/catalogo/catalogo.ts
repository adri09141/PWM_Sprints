import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { TarjetaAnimal } from '../../components/tarjeta-animal/tarjeta-animal';
import { Animal } from '../../models/data.model';
import { DataService } from '../../services/data.service';

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
  private readonly dataService = inject(DataService);

  animales = toSignal(this.dataService.getAnimales(), { initialValue: [] as Animal[] });
}
