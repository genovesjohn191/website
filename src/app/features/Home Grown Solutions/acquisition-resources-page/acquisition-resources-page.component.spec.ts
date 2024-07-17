import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionResourcesPageComponent } from './acquisition-resources-page.component';

describe('AcquisitionResourcesPageComponent', () => {
  let component: AcquisitionResourcesPageComponent;
  let fixture: ComponentFixture<AcquisitionResourcesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcquisitionResourcesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcquisitionResourcesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
