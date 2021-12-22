import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MainSelectionComponent } from './main-selection.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MainSelectionComponent', () => {
  let component: MainSelectionComponent;
  let fixture: ComponentFixture<MainSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ MainSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', async(inject([AuthenticationService], (authService: AuthenticationService) => {
  //   expect(component).toBeTruthy();
  // })));
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
