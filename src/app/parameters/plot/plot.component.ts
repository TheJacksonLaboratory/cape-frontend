import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HostListener } from '@angular/core';

import { DataFilesService } from '../../_services/data-files.service';
import { PhenotypeValue } from 'src/app/_models/phenotype-value';
import { TreeSelectionService } from 'src/app/_services/tree-selection.service';
import { PlotType } from '../../_models/plot-type';


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss'],
  // providers: [TreeSelectionService]
})

export class PlotComponent implements OnInit, OnDestroy {

  private dataFileSub: Subscription;
  private receivedData: PhenotypeValue[];
  private selectedDataFileId: number;
  private selectedPhenotypeName: string;

  private traitSelectionSubscription: Subscription;
  private traitSelection: Set<string>;
  // private traitsSelected: string[];

  // Map to store phenotype data selected
  private dataMap = new Map();
  //
  private previousDataFileId: number;
  // plot type
  private plotTypeSubscription: Subscription;
  private plotType: string;

  private innerHeight: any;
  private innerWidth: any;

  public graph = {
    data: [],
    layout: {}
  };

  constructor(private dataFileService: DataFilesService, private treeSelectionService: TreeSelectionService) {
    this.onResize();
  }

  ngOnInit() {
    this.dataFileSub = this.dataFileService.getSelectedDataFile().subscribe(datafile => {
      this.previousDataFileId = this.selectedDataFileId;
      this.selectedDataFileId = datafile.id;
    });
    this.plotTypeSubscription = this.dataFileService.getSelectedPlotType().subscribe(plotType => {
      this.plotType = plotType;
      this.updatePlot();
    });
    this.traitSelectionSubscription = this.treeSelectionService.getTraitSelected().subscribe(traits => {
      this.traitSelection = traits;
      this.previousDataFileId = this.selectedDataFileId;
      if (traits !== null && traits.size > 0) {
        this.updatePhenotypeDataMap(this.traitSelection);
      } else {
        this.dataMap.clear();
        this.updatePlot();
      }
    });
  }

  ngOnDestroy() {
    this.dataFileSub.unsubscribe();
    this.traitSelectionSubscription.unsubscribe();
    this.plotTypeSubscription.unsubscribe();
  }

  private updatePhenotypeDataMap(phenotypeNames: Set<string>) {
    // check if datafile has changed
    if (this.previousDataFileId === this.selectedDataFileId) {
      for (const phenoName of Array.from(phenotypeNames)) {
        // check if entry exist already in map
        if (!this.dataMap.has(phenoName)) {
          this.requestUpdate(phenoName);
        }
      }
      // check if dataMap has phenotypes that have been deselected and delete them
      this.dataMap.forEach((value: any, key: string) => {
        if (!phenotypeNames.has(key)) {
          this.dataMap.delete(key);
          this.updatePlot();
        }
      });
    } else {
      // data file has changed and we reset the map
      this.dataMap.clear();
      this.updatePlot();
    }
  }

  /**
   * Catch window resize event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
    // update layout of plot
    let width = (this.innerWidth - 600) / 2;
    if (width < 400) {
      width = 400;
    }
    this.graph.layout['width'] = width;
  }

  /**
   * call the API to get the phenotype data values
   * @param phenotypeName phenotype
   */
  requestUpdate(phenotypeName: string) {
    if (this.selectedDataFileId === undefined) {
      return;
    }
    this.dataFileService.getPhenotypeValues(this.selectedDataFileId, phenotypeName).subscribe(resp => {
      this.receivedData = resp;
      const x_values = new Array<number>();
      const y_values = new Array<number>();
      let inc = 1;
      for (let i = 0; i < resp.length; i++) {
        const val = parseFloat(resp[i]['value']);
        inc++;
        if (!isNaN(val)) {
          x_values.push(inc);
          y_values.push(val);
        }
      }
      // add new phenotype values to map
      this.dataMap.set(phenotypeName, { x: x_values, y: y_values });

      // plot
      this.updatePlot();
    });
  }

  updatePlot() {
    const dataKeys = this.dataMap.keys();
    const phenotypeName = dataKeys.next()['value'];
    let data = [];
    let layout = {};
    const phenotypeNumber = this.dataMap.size;

    // One plot is shown
    if (phenotypeNumber === 1) {
      const values = this.dataMap.values().next();
      // Individual plotype = 1
      if (this.plotType === PlotType.Individual) {
        data = [{
          x: values['value'].x,
          y: values['value'].y,
          type: 'scattergl', // this very important to activate WebGL
          mode: 'markers', // other properties can be found in the docs.
          marker: {
            color: 'blue',
            // line: {
            //   width: 1,
            //   color: 'rgb(0, 0, 0)'
            // }
          },
        }];
        layout = {
          autoexpand: 'true',
          autosize: 'true',
          width: (this.innerWidth - 600) / 2,
          height: 600,
          margin: {
            autoexpand: 'true',
            margin: 0
          },
          offset: 0,
          type: 'scattergl',
          title: phenotypeName, // Title of the graph
          hovermode: 'closest',
          xaxis: {
            title: 'Individual',
            linecolor: 'black',
            linewidth: 1,
            mirror: true,
            automargin: true
          },
          yaxis: {
            title: phenotypeName,
            linecolor: 'black',
            linewidth: 1,
            mirror: true,
            automargin: true
          }
        };
      }
      // Histogram plot type = 1
      if (this.plotType === PlotType.Histogram) {
        const trace0 = {
          type: 'histogram',
          x: values['value'].y,
          opacity: 0.5,
          color: 'blue',
          marker: {
            line: {
              width: 1,
              color: 'rgb(0, 0, 0)'
            }
          }
        };
        data = [trace0];
        layout = {
          type: 'histogram',
          xaxis: {
            title: phenotypeName,
            linecolor: 'black',
            linewidth: 1,
            mirror: true,
            automargin: true
          },
          yaxis: {
            title: 'Frequency',
            linecolor: 'black',
            linewidth: 1,
            mirror: true,
            automargin: true
          }
        };
      }
    } else if (phenotypeNumber > 1) { // more than one plot is shown
      const rows = this.getRowNumber(phenotypeNumber);
      const columns = this.getColumnNumber(phenotypeNumber);
      let inc = 0;
      // Individual plotype  = n + 1
      if (this.plotType === PlotType.Individual) {
        this.dataMap.forEach((value: { x, y }, key: string) => {
          inc++;
          data.push({
            x: value.x,
            y: value.y,
            type: 'scattergl',
            mode: 'markers',
            name: key,
            xaxis: 'x' + (inc),
            yaxis: 'y' + (inc)
          });
        });
        layout = {
          grid: { rows: rows, columns: columns, pattern: 'independent' },
          width: (this.innerWidth - 600) / 2,
          height: 600,
          autoexpand: 'true',
          autosize: 'true',
        };
      }
      // Histogram plot type = n + 1
      if (this.plotType === PlotType.Histogram) {
        this.dataMap.forEach((value: { x, y }, key: string) => {
          inc++;
          data.push({
            x: value.y,
            type: 'histogram',
            opcacity: 0.5,
            marker: {
              line: {
                width: 1,
                color: 'rgb(0, 0, 0)'
              }
            },
            name: key,
            xaxis: 'x' + (inc),
            yaxis: 'y' + (inc),
          });
        });
        layout = {
          grid: { rows: rows, columns: columns, pattern: 'independent' },
          width: (this.innerWidth - 600) / 2,
          height: 600,
          autoexpand: 'true',
          autosize: 'true',
        };
      }
    }
    // update graph data and layout
    this.graph.data = data;
    this.graph.layout = layout;
  }

  /**
   * Returns the closest upper square of value
   * for example:
   * if value = 6, will return 3 (3x3 = 9)
   * if 24 is given, will return 5 (5x5 = 25)
   * @param value result
   */
  private getUpperSquareValue(value: number) {
    let result: number;
    for (let i = 0; i < value; i++) {
      const pow = Math.pow(i, 2);
      if (pow > value) {
        result = i;
        break;
      }
      // for values under 4
      if (i === value - 1) {
        result = i + 1;
        break;
      }
    }
    return result;
  }

  /**
   * Returns the number of rows to be used to plot data
   * @param value rows
   */
  getRowNumber(value: number) {
    if (value === 1) {
      return 1;
    }
    return this.getUpperSquareValue(value) - 1;
  }

  /**
   * Returns the number of columns to be used to plot data
   * @param value columns
   */
  getColumnNumber(value: number) {
    const row = this.getRowNumber(value);
    if (value % row === 0) {
      return value / row;
    }
    return Math.floor(value / row) + 1;
  }
}
