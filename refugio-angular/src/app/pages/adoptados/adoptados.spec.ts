import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

import { Adoptados } from './adoptados';
import { AuthService } from '../../services/auth.service';
import { AnimalService } from '../../services/animals/animal.service';

class AuthServiceMock {
  private subject = new BehaviorSubject<any>(null);
  currentUser$ = this.subject.asObservable();

  isLoggedIn(): boolean {
    return true;
  }
}

class AnimalServiceMock {
  getAnimales() {
    return of([]);
  }
}

class RouterMock {
  navigate() {}
}

describe('Adoptados', () => {
  let component: Adoptados;
  let fixture: ComponentFixture<Adoptados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adoptados],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: AnimalService, useClass: AnimalServiceMock },
        { provide: Router, useClass: RouterMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Adoptados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
