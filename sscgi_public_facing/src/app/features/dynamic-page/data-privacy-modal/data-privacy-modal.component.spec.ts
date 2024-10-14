import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPrivacyModalComponent } from './data-privacy-modal.component';

describe('DataPrivacyModalComponent', () => {
  let component: DataPrivacyModalComponent;
  let fixture: ComponentFixture<DataPrivacyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataPrivacyModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPrivacyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
