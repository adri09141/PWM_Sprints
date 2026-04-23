import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { FichaAnimalPage } from './ficha-animal';
import { AnimalService } from '../../services/animals/animal.service';

class AnimalServiceMock {
  getAnimalById() {
    return of(undefined);
  }
}

describe('FichaAnimalPage', () => {
  let component: FichaAnimalPage;
  let fixture: ComponentFixture<FichaAnimalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaAnimalPage],
      providers: [
        { provide: AnimalService, useClass: AnimalServiceMock },
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
