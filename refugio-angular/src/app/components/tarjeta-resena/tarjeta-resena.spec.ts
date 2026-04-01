import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaResena } from './tarjeta-resena';

describe('TarjetaResena', () => {
  let component: TarjetaResena;
  let fixture: ComponentFixture<TarjetaResena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaResena],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaResena);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
