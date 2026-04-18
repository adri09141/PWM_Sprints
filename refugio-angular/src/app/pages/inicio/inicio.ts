import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { Contador } from '../../components/contador/contador';
import { TarjetaAnimal } from '../../components/tarjeta-animal/tarjeta-animal';
import { TarjetaResena } from '../../components/tarjeta-resena/tarjeta-resena';
import { Animal, ContadorItem, Resena } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    TarjetaAnimal,
    TarjetaResena,
    Contador,
    RouterLink,
    FormsModule
  ],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  private readonly dataService = inject(DataService);
  constructor(private route: Router) {
  }
  animales = toSignal(this.dataService.getAnimalesDestacados(3), { initialValue: [] as Animal[] });
  resenas = toSignal(this.dataService.getResenasDestacadas(3), { initialValue: [] as Resena[] });
  contador = toSignal(this.dataService.getContador(), { initialValue: [] as ContadorItem[] });
  registrarse()
  {
    const usuarioGuardado = localStorage.getItem('currentUser');
    if (!usuarioGuardado) {
      this.route.navigate(["/crearCuenta"]);
      return;
    }
    this.route.navigate(["/catalogo"]);
  }
}
