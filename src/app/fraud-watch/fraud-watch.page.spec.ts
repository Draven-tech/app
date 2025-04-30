import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FraudWatchPage } from './fraud-watch.page';

describe('FraudWatchPage', () => {
  let component: FraudWatchPage;
  let fixture: ComponentFixture<FraudWatchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FraudWatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
