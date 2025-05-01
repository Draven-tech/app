import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CargoMatchPage } from './cargo-match.page';

describe('CargoMatchPage', () => {
  let component: CargoMatchPage;
  let fixture: ComponentFixture<CargoMatchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
