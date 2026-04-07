import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { FichaAnimalPage } from './ficha-animal';

describe('FichaAnimalPage', () => {
  let component: FichaAnimalPage;
  let fixture: ComponentFixture<FichaAnimalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaAnimalPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FichaAnimalPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

it('should create', () => {
  expect(component).toBeTruthy();
});
});
