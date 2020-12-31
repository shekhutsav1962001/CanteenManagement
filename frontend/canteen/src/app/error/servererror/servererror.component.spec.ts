import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServererrorComponent } from './servererror.component';

describe('ServererrorComponent', () => {
  let component: ServererrorComponent;
  let fixture: ComponentFixture<ServererrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServererrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServererrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
