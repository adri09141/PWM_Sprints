import { Injectable } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';

import { ContadorItem } from '../../models/data.model';
import { CONTADOR_INICIAL } from './contador.data';

@Injectable({
  providedIn: 'root',
})
export class ContadorService {
  private readonly contador$ = of(CONTADOR_INICIAL).pipe(shareReplay(1));

  getContador(): Observable<ContadorItem[]> {
    return this.contador$;
  }
}
