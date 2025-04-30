import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TyphoonSafePage } from './typhoonsafe.page';

describe('TyphoonsafePage', () => {
  let component: TyphoonSafePage;
  let fixture: ComponentFixture<TyphoonSafePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TyphoonSafePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
