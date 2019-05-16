import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLocusScanComponent } from './single-locus-scan.component';

describe('SingleLocusScanComponent', () => {
  let component: SingleLocusScanComponent;
  let fixture: ComponentFixture<SingleLocusScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLocusScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLocusScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
