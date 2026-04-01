import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contador',
  standalone: true,
  imports: [],
  templateUrl: './contador.html',
  styleUrl: './contador.css',
})
export class Contador {
  @Input() contador: any;
}
