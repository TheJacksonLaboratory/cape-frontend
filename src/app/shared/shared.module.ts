import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatTabsModule,
  MatMenuModule,
  MatListModule,
  MatToolbarModule,
  MatTooltipModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatSelectModule,
  MatProgressBarModule
} from '@angular/material';
import { NgxMdModule } from 'ngx-md';
import { DescriptionComponent } from './description/description.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    NgxMdModule.forRoot(),
    MatTableModule,
    MatSelectModule,
    MatProgressBarModule
    ],
  declarations: [
    DescriptionComponent,
  ],
  providers: [],
  entryComponents: [
    DescriptionComponent
  ],
  exports: [
    DescriptionComponent,
    CommonModule,
    MatProgressBarModule
  ]
})
export class SharedModule { }
