import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLocusScanComponent } from './single-locus-scan.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('SingleLocusScanComponent', () => {
  let component: SingleLocusScanComponent;
  let fixture: ComponentFixture<SingleLocusScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        MatOptionModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatChipsModule,
        MatIconModule
      ],
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

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
