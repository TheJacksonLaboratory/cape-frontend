import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatRadioModule} from '@angular/material/radio';
import { MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule} from '@angular/material/button';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatChipsModule} from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { FlexLayoutModule } from '@angular/flex-layout';
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
    // FlexLayoutModule.withConfig({addFlexToParent: false}),
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTabsModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonToggleModule,
    PlotlyModule,
    MatChipsModule
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
    PlotComponent,
    MainSelectionComponent,
    MarkerSelectionComponent,
    SingleLocusScanComponent,
    PairScanComponent
  ]
})
export class ParametersModule { }
