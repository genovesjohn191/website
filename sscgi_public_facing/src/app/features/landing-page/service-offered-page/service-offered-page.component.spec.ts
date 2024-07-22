import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOfferedPageComponent } from './service-offered-page.component';

describe('ServiceOfferedPageComponent', () => {
  let component: ServiceOfferedPageComponent;
  let fixture: ComponentFixture<ServiceOfferedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOfferedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOfferedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
