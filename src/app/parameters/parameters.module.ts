import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule,
         MatCardModule,
         MatSelectModule,
         MatIconModule,
         MatInputModule,
         MatRadioModule,
         MatTabsModule,
         MatButtonModule,
         MatTooltipModule,
         MatExpansionModule,
         MatMenuModule,
         MatButtonToggleModule} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';

import { MainSelectionComponent } from './ct-selection/main-selection/main-selection.component';
import { TreeComponent } from './ct-selection/tree/tree.component';
import { ParametersComponent } from './parameters.component';
import { MarkerSelectionComponent } from './marker-selection/marker-selection.component';
import { SingleLocusScanComponent } from './single-locus-scan/single-locus-scan.component';
import { PairScanComponent } from './pair-scan/pair-scan.component';
import { CtSelectionComponent } from './ct-selection/ct-selection.component';
import { PlotComponent } from './plot/plot.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  imports: [
    MatInputModule,
    CommonModule,
    MatTreeModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTabsModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonToggleModule,
    PlotlyModule
  ],
  declarations: [
    ParametersComponent,
    CtSelectionComponent,
    TreeComponent,
    MainSelectionComponent,
    MarkerSelectionComponent,
    SingleLocusScanComponent,
    PairScanComponent,
    PlotComponent
  ],
  exports: [
    ParametersComponent,
    CtSelectionComponent,
    TreeComponent,
    MainSelectionComponent,
    MarkerSelectionComponent,
    SingleLocusScanComponent,
    PairScanComponent
  ]
})
export class ParametersModule { }
