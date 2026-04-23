import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { Inicio } from './inicio';
import { AuthService } from '../../services/auth.service';
import { AnimalService } from '../../services/animals/animal.service';
import { ContadorService } from '../../services/contador/contador.service';
import { ResenaService } from '../../services/resenas/resena.service';

class AnimalServiceMock {
  getAnimalesDestacados() {
    return of([]);
  }
}

class ResenaServiceMock {
  getResenasDestacadas() {
    return of([]);
  }
}

class ContadorServiceMock {
  getContador() {
    return of([]);
  }
}

class AuthServiceMock {
  isLoggedIn() {
    return false;
  }
}

class RouterMock {
  navigate() {}
}

describe('Inicio', () => {
  let component: Inicio;
  let fixture: ComponentFixture<Inicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inicio],
      providers: [
        { provide: AnimalService, useClass: AnimalServiceMock },
        { provide: ResenaService, useClass: ResenaServiceMock },
        { provide: ContadorService, useClass: ContadorServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useClass: RouterMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Inicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
