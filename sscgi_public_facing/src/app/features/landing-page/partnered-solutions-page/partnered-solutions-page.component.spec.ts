import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartneredSolutionsPageComponent } from './partnered-solutions-page.component';

describe('PartneredSolutionsPageComponent', () => {
  let component: PartneredSolutionsPageComponent;
  let fixture: ComponentFixture<PartneredSolutionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartneredSolutionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartneredSolutionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
