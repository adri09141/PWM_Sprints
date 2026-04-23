import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Contador } from '../../components/contador/contador';
import { ContadorItem } from '../../models/data.model';
import { ContadorService } from '../../services/contador/contador.service';

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
  private readonly contadorService = inject(ContadorService);

  contador = toSignal(this.contadorService.getContador(), { initialValue: [] as ContadorItem[] });
}
