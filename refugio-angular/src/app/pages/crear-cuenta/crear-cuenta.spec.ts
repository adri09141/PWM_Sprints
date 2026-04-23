import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CrearCuenta } from './crear-cuenta';
import { AuthService } from '../../services/auth.service';

class AuthServiceMock {}

class RouterMock {
  navigate() {}
}

describe('CrearCuenta', () => {
  let component: CrearCuenta;
  let fixture: ComponentFixture<CrearCuenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCuenta],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useClass: RouterMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearCuenta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
