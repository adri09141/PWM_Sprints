import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Catalogo } from './catalogo';
import { AnimalService } from '../../services/animals/animal.service';

class AnimalServiceMock {
  getAnimales() {
    return of([]);
  }
}

describe('Catalogo', () => {
  let component: Catalogo;
  let fixture: ComponentFixture<Catalogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catalogo],
      providers: [{ provide: AnimalService, useClass: AnimalServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalogo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
