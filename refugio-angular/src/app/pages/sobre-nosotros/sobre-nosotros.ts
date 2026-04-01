import {Component, signal} from '@angular/core';
import {Contador} from '../../components/contador/contador';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [
    Contador
  ],
  templateUrl: './sobre-nosotros.html',
  styleUrl: './sobre-nosotros.css',
})
export class SobreNosotros {
  contador = signal<any[]>([]);
  ngOnInit() {
    fetch('/assets/data.json')
      .then(respuesta => respuesta.json())
      .then(datos => {
        this.contador.set(datos.contador);
      })
      .catch(error => console.error("Error al cargar JSON:", error));
  }
}
