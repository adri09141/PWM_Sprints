import {Component, OnInit, signal} from '@angular/core';

@Component({
  selector: 'app-finales-felices',
  standalone: true,
  imports: [],
  templateUrl: './finales-felices.html',
  styleUrl: './finales-felices.css',
})
export class FinalesFelices implements OnInit {
  animales = signal<any[]>([]);
  ngOnInit() {
    fetch('/assets/data.json')
      .then(respuesta => respuesta.json())
      .then(datos => {
        this.animales.set(datos.animales);
      })
      .catch(error => console.error("Error al cargar JSON:", error));
  }
}
