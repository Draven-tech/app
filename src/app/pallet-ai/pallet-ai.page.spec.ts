import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PalletAiPage } from './pallet-ai.page';

describe('PalletAiPage', () => {
  let component: PalletAiPage;
  let fixture: ComponentFixture<PalletAiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PalletAiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
