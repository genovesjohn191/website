import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPrivacyEditorComponent } from './data-privacy-editor.component';

describe('DataPrivacyEditorComponent', () => {
  let component: DataPrivacyEditorComponent;
  let fixture: ComponentFixture<DataPrivacyEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataPrivacyEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPrivacyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
