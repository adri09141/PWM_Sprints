import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FinalesFelices } from './finales-felices';
import { ResenaService } from '../../services/resenas/resena.service';

class ResenaServiceMock {
  getResenas() {
    return of([]);
  }
}

describe('FinalesFelices', () => {
  let component: FinalesFelices;
  let fixture: ComponentFixture<FinalesFelices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalesFelices],
      providers: [{ provide: ResenaService, useClass: ResenaServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(FinalesFelices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
