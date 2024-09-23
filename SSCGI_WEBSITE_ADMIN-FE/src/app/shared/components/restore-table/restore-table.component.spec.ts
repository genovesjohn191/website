import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreTableComponent } from './restore-table.component';

describe('RestoreTableComponent', () => {
  let component: RestoreTableComponent;
  let fixture: ComponentFixture<RestoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestoreTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
