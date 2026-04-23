import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AnadirResena } from './anadir-resena';
import { AuthService } from '../../services/auth.service';
import { ResenaService } from '../../services/resenas/resena.service';

class AuthServiceMock {
  currentUser$ = of({
    uid: 'abc',
    nombre: 'Ada',
    apellidos: 'Lovelace',
    fecha_nacimiento: '1990-01-01',
    dni: '12345678A',
    direccion: 'Calle Falsa 123',
    telefono: '600000000',
    correo: 'ada@example.com',
    numeroAdopciones: 1,
  });

  isLoggedIn() {
    return true;
  }
}

class ResenaServiceMock {}

class RouterMock {
  navigate() {}
}

describe('AnadirResena', () => {
  let component: AnadirResena;
  let fixture: ComponentFixture<AnadirResena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirResena],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: ResenaService, useClass: ResenaServiceMock },
        { provide: Router, useClass: RouterMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnadirResena);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
