import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtSelectionComponent } from './ct-selection.component';

describe('CtSelectionComponent', () => {
  let component: CtSelectionComponent;
  let fixture: ComponentFixture<CtSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
