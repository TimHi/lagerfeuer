import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongComponentComponent } from './song-component.component';

describe('SongComponentComponent', () => {
  let component: SongComponentComponent;
  let fixture: ComponentFixture<SongComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
