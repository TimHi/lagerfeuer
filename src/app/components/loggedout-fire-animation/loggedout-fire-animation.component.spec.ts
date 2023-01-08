import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedoutFireAnimationComponent } from './loggedout-fire-animation.component';

describe('LoggedoutFireAnimationComponent', () => {
  let component: LoggedoutFireAnimationComponent;
  let fixture: ComponentFixture<LoggedoutFireAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedoutFireAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedoutFireAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
