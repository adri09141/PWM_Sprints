import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { FichaAnimal } from './ficha-animal';
import { AnimalService } from '../../services/animals/animal.service';

class AnimalServiceMock {
  getAnimalById() {
    return of(undefined);
  }
}

describe('FichaAnimal', () => {
  let component: FichaAnimal;
  let fixture: ComponentFixture<FichaAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaAnimal],
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

    fixture = TestBed.createComponent(FichaAnimal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
