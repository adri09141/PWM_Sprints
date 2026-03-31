import { Component, OnInit, signal} from '@angular/core';
import {TarjetaAnimal} from '../../components/tarjeta-animal/tarjeta-animal';

@Component({
  selector: 'app-inicio',
  imports: [
    TarjetaAnimal
  ],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {

  // 1. Creamos la variable como una Señal vacía
  animales = signal<any[]>([]);

  ngOnInit() {
    fetch('assets/data.json')
      .then(respuesta => respuesta.json())
      .then(datos => {

        // 2. Usamos .set() para meter los datos.
        // ¡Esto avisa automáticamente al HTML sin hacer nada más!
        this.animales.set(datos.animales);

      })
      .catch(error => console.error("Error al cargar JSON:", error));
  }
}
