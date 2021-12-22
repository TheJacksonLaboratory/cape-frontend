import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeComponent } from './tree.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TreeSelectionService } from 'src/app/_services/tree-selection.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatRadioModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatTreeModule,
        MatCheckboxModule,
        MatCardModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [TreeComponent],
      providers: [
        TreeSelectionService,
        { provide: MatDialog, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComponent);
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
