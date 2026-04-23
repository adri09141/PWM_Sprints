import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { Animal } from '../../models/data.model';
import { AnimalService } from '../../services/animals/animal.service';

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

  fichaAnimal = toSignal(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.animalService.getAnimalById(id))
    ),
    { initialValue: undefined as Animal | undefined }
  );
}
