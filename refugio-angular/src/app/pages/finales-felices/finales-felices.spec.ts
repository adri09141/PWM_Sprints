import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalesFelices } from './finales-felices';

describe('FinalesFelices', () => {
  let component: FinalesFelices;
  let fixture: ComponentFixture<FinalesFelices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalesFelices],
    }).compileComponents();

    fixture = TestBed.createComponent(FinalesFelices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
