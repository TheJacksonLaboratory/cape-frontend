import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSelectionComponent } from './main-selection.component';

describe('MainSelectionComponent', () => {
  let component: MainSelectionComponent;
  let fixture: ComponentFixture<MainSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
