import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TyphoonsafePage } from './typhoonsafe.page';

describe('TyphoonsafePage', () => {
  let component: TyphoonsafePage;
  let fixture: ComponentFixture<TyphoonsafePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TyphoonsafePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
