import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPreviewComponent } from './section-preview.component';

describe('SectionPreviewComponent', () => {
  let component: SectionPreviewComponent;
  let fixture: ComponentFixture<SectionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
