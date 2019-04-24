import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileParameterComponent } from './file-parameter.component';

describe('FileParameterComponent', () => {
  let component: FileParameterComponent;
  let fixture: ComponentFixture<FileParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
