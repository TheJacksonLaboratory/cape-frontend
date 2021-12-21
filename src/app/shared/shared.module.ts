import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { NgxMdModule } from 'ngx-md';
import { DescriptionComponent } from './description/description.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    // FlexLayoutModule,
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
