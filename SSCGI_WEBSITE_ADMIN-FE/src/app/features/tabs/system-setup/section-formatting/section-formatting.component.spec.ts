import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFormattingComponent } from './section-formatting.component';

describe('SectionFormattingComponent', () => {
  let component: SectionFormattingComponent;
  let fixture: ComponentFixture<SectionFormattingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionFormattingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionFormattingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
