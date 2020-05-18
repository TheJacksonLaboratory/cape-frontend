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
  MatSelectModule
} from '@angular/material';
import { NgxMdModule } from 'ngx-md';
import { DescriptionComponent } from './description/description.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
    NoopAnimationsModule
    ],
  declarations: [
    DescriptionComponent,
    MessageDialogComponent,
    ProgressDialogComponent
  ],
  providers: [],
  entryComponents: [
    DescriptionComponent,
    MessageDialogComponent,
    ProgressDialogComponent
  ],
  exports: [
    DescriptionComponent,
    CommonModule,
    MessageDialogComponent,
    ProgressDialogComponent
  ]
})
export class SharedModule { }
