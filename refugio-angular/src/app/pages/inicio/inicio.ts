import { Component, OnInit, signal} from '@angular/core';
import {TarjetaAnimal} from '../../components/tarjeta-animal/tarjeta-animal';
import {TarjetaResena} from '../../components/tarjeta-resena/tarjeta-resena';
import {Contador} from '../../components/contador/contador';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    TarjetaAnimal,
    TarjetaResena,
    Contador,
    RouterLink
  ],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {

  // 1. Creamos la variable como una Señal vacía
  animales = signal<any[]>([]);
  resenas = signal<any[]>([]);
  contador = signal<any[]>([]);
  ngOnInit() {
    fetch('/assets/data.json')
      .then(respuesta => respuesta.json())
      .then(datos => {

        // 2. Usamos .set() para meter los datos.
        // ¡Esto avisa automáticamente al HTML sin hacer nada más!
        this.animales.set(datos.animales.slice(0, 3));
        this.resenas.set(datos.resenas.slice(0, 3));
        this.contador.set(datos.contador);
      })
      .catch(error => console.error("Error al cargar JSON:", error));
  }
}
