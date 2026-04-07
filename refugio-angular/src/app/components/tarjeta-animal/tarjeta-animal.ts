import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Animal } from '../../models/data.model';

@Component({
  selector: 'app-tarjeta-animal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tarjeta-animal.html',
  styleUrl: './tarjeta-animal.css',
})
export class TarjetaAnimal {
  @Input({ required: true }) animal!: Animal;
}
