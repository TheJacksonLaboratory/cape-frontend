import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairScanComponent } from './pair-scan.component';

describe('PairScanComponent', () => {
  let component: PairScanComponent;
  let fixture: ComponentFixture<PairScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
