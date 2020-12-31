import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminhomeComponent } from './adminhome.component';

describe('AdminhomeComponent', () => {
  let component: AdminhomeComponent;
  let fixture: ComponentFixture<AdminhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
