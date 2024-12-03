import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerVacanciesComponent } from './career-vacancies.component';

describe('CareerVacanciesComponent', () => {
  let component: CareerVacanciesComponent;
  let fixture: ComponentFixture<CareerVacanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerVacanciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
