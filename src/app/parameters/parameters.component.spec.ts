import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersComponent } from './parameters.component';
import { CtSelectionComponent } from './ct-selection/ct-selection.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

import { SingleLocusScanComponent } from './single-locus-scan/single-locus-scan.component';
import { MarkerSelectionComponent } from './marker-selection/marker-selection.component';
import { PairScanComponent } from './pair-scan/pair-scan.component';
import { MainSelectionComponent } from './ct-selection/main-selection/main-selection.component';
import { TreeComponent } from './ct-selection/tree/tree.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlotComponent } from './plot/plot.component';
import { PlotlyModule } from 'angular-plotly.js';
import { AuthenticationService } from '../_services';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
        HttpClientTestingModule,
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
        AuthenticationService,
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
