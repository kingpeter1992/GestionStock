import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sniper } from './sniper';

describe('Sniper', () => {
  let component: Sniper;
  let fixture: ComponentFixture<Sniper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Sniper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sniper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
