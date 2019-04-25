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
         MatTooltipModule} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainSelectionComponent } from './main-selection/main-selection.component';
import { TreeComponent } from './ct-selection/tree/tree.component';
import { FileParameterComponent } from './file-parameter.component';
import { MarkerSelectionComponent } from './marker-selection/marker-selection.component';
import { SingleLocusScanComponent } from './single-locus-scan/single-locus-scan.component';
import { PairScanComponent } from './pair-scan/pair-scan.component';
import { CtSelectionComponent } from './ct-selection/ct-selection.component';
import { FormsModule } from '@angular/forms';


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
    MatRadioModule,
    MatTabsModule,
    MatButtonModule,
    MatTooltipModule
  ],
  declarations: [
    FileParameterComponent,
    CtSelectionComponent,
    TreeComponent,
    MainSelectionComponent,
    MarkerSelectionComponent,
    SingleLocusScanComponent,
    PairScanComponent
  ],
  exports: [
    FileParameterComponent,
    CtSelectionComponent,
    TreeComponent,
    MainSelectionComponent,
    MarkerSelectionComponent,
    SingleLocusScanComponent,
    PairScanComponent
  ]
})
export class FileParameterModule { }
