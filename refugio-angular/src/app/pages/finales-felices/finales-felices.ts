import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { TarjetaResena } from '../../components/tarjeta-resena/tarjeta-resena';
import { Resena } from '../../models/data.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-finales-felices',
  standalone: true,
  imports: [
    TarjetaResena,
    RouterLink
  ],
  templateUrl: './finales-felices.html',
  styleUrl: './finales-felices.css',
})
export class FinalesFelices {
  private readonly dataService = inject(DataService);

  resenas = toSignal(this.dataService.getResenas(), { initialValue: [] as Resena[] });
}
