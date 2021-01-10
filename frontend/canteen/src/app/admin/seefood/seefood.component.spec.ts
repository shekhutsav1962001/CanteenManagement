import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeefoodComponent } from './seefood.component';

describe('SeefoodComponent', () => {
  let component: SeefoodComponent;
  let fixture: ComponentFixture<SeefoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeefoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeefoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
