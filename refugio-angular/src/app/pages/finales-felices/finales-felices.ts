import {Component, OnInit, signal} from '@angular/core';
import {TarjetaResena} from '../../components/tarjeta-resena/tarjeta-resena';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-finales-felices',
  standalone: true,
  imports: [
    TarjetaResena, RouterLink
  ],
  templateUrl: './finales-felices.html',
  styleUrl: './finales-felices.css',
})
export class FinalesFelices implements OnInit {
  resenas = signal<any[]>([]);
  ngOnInit() {
    fetch('/assets/data.json')
      .then(respuesta => respuesta.json())
      .then(datos => {
        this.resenas.set(datos.resenas);
      })
      .catch(error => console.error("Error al cargar JSON:", error));
  }
}
