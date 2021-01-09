import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavComponent } from './user-nav.component';

describe('UserNavComponent', () => {
  let component: UserNavComponent;
  let fixture: ComponentFixture<UserNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
