import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ficha-animal',
  standalone: true,
  imports: [],
  templateUrl: './ficha-animal.html',
  styleUrl: './ficha-animal.css',
})
export class FichaAnimal {
  @Input() fichaAnimal: any;
}
