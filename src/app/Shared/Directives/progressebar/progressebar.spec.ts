import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Progressebar } from './progressebar';

describe('Progressebar', () => {
  let component: Progressebar;
  let fixture: ComponentFixture<Progressebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Progressebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Progressebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
