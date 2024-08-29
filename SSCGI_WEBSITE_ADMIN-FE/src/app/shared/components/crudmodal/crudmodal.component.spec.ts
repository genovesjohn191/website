import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDmodalComponent } from './crudmodal.component';

describe('CRUDmodalComponent', () => {
  let component: CRUDmodalComponent;
  let fixture: ComponentFixture<CRUDmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRUDmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRUDmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
