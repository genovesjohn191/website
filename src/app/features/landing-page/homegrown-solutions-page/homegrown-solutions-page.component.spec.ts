import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomegrownSolutionsPageComponent } from './homegrown-solutions-page.component';

describe('HomegrownSolutionsPageComponent', () => {
  let component: HomegrownSolutionsPageComponent;
  let fixture: ComponentFixture<HomegrownSolutionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomegrownSolutionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomegrownSolutionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
