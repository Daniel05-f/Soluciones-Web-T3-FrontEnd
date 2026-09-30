import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Compa } from './compa';

describe('Compa', () => {
  let component: Compa;
  let fixture: ComponentFixture<Compa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compa],
    }).compileComponents();

    fixture = TestBed.createComponent(Compa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
