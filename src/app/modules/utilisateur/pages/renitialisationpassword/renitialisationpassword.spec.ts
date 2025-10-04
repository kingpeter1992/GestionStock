import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Renitialisationpassword } from './renitialisationpassword';

describe('Renitialisationpassword', () => {
  let component: Renitialisationpassword;
  let fixture: ComponentFixture<Renitialisationpassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Renitialisationpassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Renitialisationpassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
