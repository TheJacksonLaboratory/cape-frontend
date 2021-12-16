import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersComponent } from './parameters.component';
import { CtSelectionComponent } from './ct-selection/ct-selection.component';
import {
  MatIconModule, MatCardModule, MatTabsModule, MatSelectModule,
  MatFormFieldModule, MatTooltipModule, MatButtonToggleModule, MatTreeModule, MatDialog, MatInputModule, MatChipsModule
} from '@angular/material';
import { SingleLocusScanComponent } from './single-locus-scan/single-locus-scan.component';
import { MarkerSelectionComponent } from './marker-selection/marker-selection.component';
import { PairScanComponent } from './pair-scan/pair-scan.component';
import { MainSelectionComponent } from './ct-selection/main-selection/main-selection.component';
import { TreeComponent } from './ct-selection/tree/tree.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule, MatRadioModule, MatButtonModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlotComponent } from './plot/plot.component';
import { PlotlyModule } from 'angular-plotly.js';

describe('ParametersComponent', () => {
  let component: ParametersComponent;
  let fixture: ComponentFixture<ParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatTooltipModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatRadioModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatTreeModule,
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        PlotlyModule,
        MatChipsModule
      ],
      declarations: [
        ParametersComponent,
        CtSelectionComponent,
        SingleLocusScanComponent,
        MarkerSelectionComponent,
        PairScanComponent,
        MainSelectionComponent,
        PlotComponent,
        TreeComponent
      ],
      providers: [
        AlertService,
        { provide: MatDialog, useValue: {} }
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersComponent);
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
