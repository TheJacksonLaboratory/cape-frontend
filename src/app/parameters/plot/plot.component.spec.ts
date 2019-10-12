import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatSelectModule } from '@angular/material';
import { PlotlyModule } from 'angular-plotly.js';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PlotComponent } from './plot.component';


describe('PlotComponent', () => {
  let component: PlotComponent;
  let fixture: ComponentFixture<PlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        PlotlyModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSelectModule
      ],
      declarations: [ PlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return expected columns and rows values', () => {
    expect(component.getRowNumber(15)).toBe(3);
    expect(component.getRowNumber(16)).toBe(4);
    expect(component.getRowNumber(27)).toBe(5);
    expect(component.getRowNumber(5)).toBe(2);
    expect(component.getRowNumber(2)).toBe(1);
    expect(component.getRowNumber(35)).toBe(5);
    expect(component.getRowNumber(1)).toBe(1);
    expect(component.getRowNumber(3)).toBe(1);

    expect(component.getColumnNumber(15)).toBe(5);
    expect(component.getColumnNumber(16)).toBe(4);
    expect(component.getColumnNumber(27)).toBe(6);
    expect(component.getColumnNumber(5)).toBe(3);
    expect(component.getColumnNumber(2)).toBe(2);
    expect(component.getColumnNumber(35)).toBe(7);
    expect(component.getColumnNumber(1)).toBe(1);
    expect(component.getColumnNumber(3)).toBe(3);

  });

  it('should return expected combinations of correlations', () => {
    const phenotypes = ['AA0', 'APP_grch37', 'APP_mm10', 'Blood.glucose.12', 'Blood.glucose.6'];
    const combinations = ['AA0,APP_grch37', 'AA0,APP_mm10', 'AA0,Blood.glucose.12', 'AA0,Blood.glucose.6',
                          'APP_grch37,APP_mm10', 'APP_grch37,Blood.glucose.12', 'APP_grch37,Blood.glucose.6',
                          'APP_mm10,Blood.glucose.12', 'APP_mm10,Blood.glucose.6',
                          'Blood.glucose.12,Blood.glucose.6'];
    // call method
    const result = component.storeCombinations(phenotypes);
    expect(result.length).toBe(combinations.length);

    const strResult = [];
    // put the result in an array of pair strings separated by commas like in the test data.
    for (let i = 0; i < result.length; i ++) {
      let str = '';
      result[i].forEach(function(item) {
        str = str.length !== 0 ? str + ',' + item : item;
      });
      strResult.push(str);
    }
    for (let i = 0; i < combinations.length; i++) {
      expect(strResult[i]).toBe(combinations[i]);
    }
  });
});
