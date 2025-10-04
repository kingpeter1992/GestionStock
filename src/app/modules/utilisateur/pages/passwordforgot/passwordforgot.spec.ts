import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Passwordforgot } from './passwordforgot';

describe('Passwordforgot', () => {
  let component: Passwordforgot;
  let fixture: ComponentFixture<Passwordforgot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Passwordforgot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Passwordforgot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
