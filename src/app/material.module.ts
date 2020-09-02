import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule,
  MatTableModule, MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule,
  MatPaginatorModule, MatSortModule, MatSelectModule, MatGridListModule, MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatGridListModule,
    MatTabsModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatGridListModule,
    MatTabsModule
  ],
})
export class CustomMaterialModule {
}
