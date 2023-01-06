import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeAnimatedLogoComponent } from './large-animated-logo.component';

describe('LargeAnimatedLogoComponent', () => {
  let component: LargeAnimatedLogoComponent;
  let fixture: ComponentFixture<LargeAnimatedLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeAnimatedLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LargeAnimatedLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
