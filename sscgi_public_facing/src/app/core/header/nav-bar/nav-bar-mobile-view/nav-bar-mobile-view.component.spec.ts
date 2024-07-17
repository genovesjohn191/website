import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarMobileViewComponent } from './nav-bar-mobile-view.component';

describe('NavBarMobileViewComponent', () => {
  let component: NavBarMobileViewComponent;
  let fixture: ComponentFixture<NavBarMobileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarMobileViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarMobileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
