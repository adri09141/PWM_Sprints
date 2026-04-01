import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tarjeta-resena',
  imports: [],
  standalone: true,
  templateUrl: './tarjeta-resena.html',
  styleUrl: './tarjeta-resena.css',
})
export class TarjetaResena {
  @Input() resenas: any;
}
