import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Contador } from '../../components/contador/contador';
import { ContadorItem } from '../../models/data.model';
import { DataService } from '../../services/data.service';

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
  private readonly dataService = inject(DataService);

  contador = toSignal(this.dataService.getContador(), { initialValue: [] as ContadorItem[] });
}
