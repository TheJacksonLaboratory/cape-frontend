import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerSelectionComponent } from './marker-selection.component';

describe('MarkerSelectionComponent', () => {
  let component: MarkerSelectionComponent;
  let fixture: ComponentFixture<MarkerSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
