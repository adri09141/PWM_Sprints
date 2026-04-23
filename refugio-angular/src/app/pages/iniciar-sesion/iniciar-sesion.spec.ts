import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { IniciarSesion } from './iniciar-sesion';
import { AuthService } from '../../services/auth.service';

class AuthServiceMock {}

class RouterMock {
  navigate() {}
}

describe('IniciarSesion', () => {
  let component: IniciarSesion;
  let fixture: ComponentFixture<IniciarSesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarSesion],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useClass: RouterMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IniciarSesion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
