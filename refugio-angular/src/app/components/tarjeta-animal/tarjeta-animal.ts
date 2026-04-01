import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-animal',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-animal.html',
  styleUrl: './tarjeta-animal.css',
})
export class TarjetaAnimal{
  @Input() animal: any;
}

