import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirResena } from './anadir-resena';

describe('AnadirResena', () => {
  let component: AnadirResena;
  let fixture: ComponentFixture<AnadirResena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirResena],
    }).compileComponents();

    fixture = TestBed.createComponent(AnadirResena);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
