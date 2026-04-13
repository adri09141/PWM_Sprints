import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adoptados } from './adoptados';

describe('Adoptados', () => {
  let component: Adoptados;
  let fixture: ComponentFixture<Adoptados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adoptados],
    }).compileComponents();

    fixture = TestBed.createComponent(Adoptados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
