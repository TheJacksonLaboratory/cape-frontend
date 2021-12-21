import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtSelectionComponent } from './ct-selection.component';
import { MainSelectionComponent } from './main-selection/main-selection.component';
import { TreeComponent } from './tree/tree.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule, MatFormFieldModule, MatInputModule, MatOptionModule,
  MatIconModule, MatCardModule, MatExpansionModule, MatRadioModule, MatButtonToggleModule,
  MatButtonModule, MatTreeModule, MatDialog } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlotComponent } from '../plot/plot.component';
import { PlotlyModule } from 'angular-plotly.js';

describe('CtSelectionComponent', () => {
  let component: CtSelectionComponent;
  let fixture: ComponentFixture<CtSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatOptionModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatRadioModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatTreeModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        PlotlyModule
      ],
      declarations: [
        CtSelectionComponent,
        MainSelectionComponent,
        TreeComponent,
        PlotComponent
      ],
      providers: [
        { provide: MatDialog, useValue: {} }
      ]
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

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
