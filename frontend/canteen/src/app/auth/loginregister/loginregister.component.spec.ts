import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginregisterComponent } from './loginregister.component';

describe('LoginregisterComponent', () => {
  let component: LoginregisterComponent;
  let fixture: ComponentFixture<LoginregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
