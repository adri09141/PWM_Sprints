import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { TarjetaResena } from '../../components/tarjeta-resena/tarjeta-resena';
import { Resena } from '../../models/data.model';
import { ResenaService } from '../../services/resenas/resena.service';

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
  private readonly resenaService = inject(ResenaService);

  resenas = toSignal(this.resenaService.getResenas(), { initialValue: [] as Resena[] });
}
