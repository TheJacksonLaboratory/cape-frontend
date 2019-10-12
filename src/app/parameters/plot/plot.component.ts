import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataFilesService } from '../../_services/data-files.service';
import { PhenotypeValue } from 'src/app/_models/phenotype-value';
import { TreeSelectionService } from 'src/app/_services/tree-selection.service';
import { PlotType } from '../../_models/plot-type';
import { Phenotype } from 'src/app/_models';


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

  // data structure used to store all correlations combinations of traits selected
  private combinationsResult: Set<string>[];

  // phenotypes
  private phenotypesSubscription: Subscription;
  phenotypes: Phenotype[];
  private traitSelectionSubscription: Subscription;
  private traitSelection: Set<string>;
  // private traitsSelected: string[];

  // Map to store phenotype data selected
  private dataMap = new Map();
  // Coefficient Matrix
  private corrCoeffMatrix: [[]];

  private previousDataFileId: number;
  // plot options
  private plotType: PlotType;
  plotTypes = Object.values(PlotType); // ['Histogram', 'By Individual', 'Correlation', 'Heatmap', 'QNorm', 'Eigentraits'];
  colorBy: string;
  private colorByPhenotypeValues: any[];
  // private selectedColorBy: string;

  public graph = {
    data: [],
    layout: {}
  };

  constructor(private dataFileService: DataFilesService, private treeSelectionService: TreeSelectionService) {
    // this.onResize();
  }

  ngOnInit() {
    this.dataFileSub = this.dataFileService.getSelectedDataFile().subscribe(datafile => {
      this.previousDataFileId = this.selectedDataFileId;
      this.selectedDataFileId = datafile.id;
      this.dataFileService.getPhenotypesPerDataFile(datafile.id).subscribe(pheno => {
        this.phenotypes = pheno;
      });
    });
    this.traitSelectionSubscription = this.treeSelectionService.getTraitSelected().subscribe(traits => {
      this.traitSelection = traits;
      this.previousDataFileId = this.selectedDataFileId;
      if (traits !== null && traits.size > 0) {
        this.updatePhenotypeDataMap(this.traitSelection);
        if (this.plotType === PlotType.Heatmap || this.plotType === PlotType.Correlation) {
          this.requestUpdateCorrelationCoeff(this.traitSelection);
        }
      } else {
        this.dataMap.clear();
        this.updatePlot();
      }
    });
    if (this.selectedDataFileId !== undefined) {
      this.phenotypesSubscription = this.dataFileService.getPhenotypesPerDataFile(this.selectedDataFileId).subscribe(phenos => {
        this.phenotypes = phenos;
      });
    }
  }

  ngOnDestroy() {
    this.dataFileSub.unsubscribe();
    this.traitSelectionSubscription.unsubscribe();
    if (this.phenotypesSubscription !== undefined) {
      this.phenotypesSubscription.unsubscribe();
    }
  }

  setSelectPlot() {
    this.updatePhenotypeDataMap(this.traitSelection);
    if (this.plotType === PlotType.Heatmap || this.plotType === PlotType.Correlation) {
      this.requestUpdateCorrelationCoeff(this.traitSelection);
    }
    this.updatePlot();
  }

  setColorBy() {
    this.dataFileService.getPhenotypeValues(this.selectedDataFileId, this.colorBy).subscribe(resp => {
      this.colorByPhenotypeValues = new Array<any>();
      for (let i = 0; i < resp.length; i++) {
        this.colorByPhenotypeValues.push(resp[i]['value']);
      }
      this.updatePlot();
    });
    this.updatePlot();
  }


  private updatePhenotypeDataMap(phenotypeNames: Set<string>) {
    if (phenotypeNames === undefined || phenotypeNames === null) {
      return;
    }
    // check if datafile has changed
    if (this.previousDataFileId === this.selectedDataFileId) {
      const array_phenotypes = Array.from(phenotypeNames);
      for (const phenoName of array_phenotypes) {
        // check if entry exist already in map
        if (!this.dataMap.has(phenoName)) {
          this.requestUpdatePhenotypeValues(phenoName);
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
   * call the API to get the phenotype data values
   * @param phenotypeName phenotype
   */
  requestUpdatePhenotypeValues(phenotypeName: string) {
    if (this.selectedDataFileId === undefined) {
      return;
    }
    this.dataFileService.getPhenotypeValues(this.selectedDataFileId, phenotypeName).subscribe(resp => {
      this.receivedData = resp;
      const x_values = new Array<number>();
      const y_values = new Array<any>();
      let inc = 1;
      for (let i = 0; i < resp.length; i++) {
        const val = parseFloat(resp[i]['value']);
        inc++;
        if (!isNaN(val)) {
          x_values.push(inc);
          y_values.push(val);
        } else {
          x_values.push(inc);
          y_values.push(resp[i]['value']);
        }

      }
      // add new phenotype values to map
      this.dataMap.set(phenotypeName, { x: x_values, y: y_values });
      // plot
      this.updatePlot();
    });
  }

  /**
   * Call the API to get the correlation coefficients for the list of selected phenotypes
   * @param phenotypeNames array of phenotype names
   */
  requestUpdateCorrelationCoeff(phenotypeNames: Set<string>) {
    if (phenotypeNames === undefined || phenotypeNames === null) {
      return;
    }
    const array_phenotypes = Array.from(phenotypeNames);
    if (array_phenotypes.length > 1) {
      this.dataFileService.getPhenotypesCorrelations(this.selectedDataFileId, array_phenotypes).subscribe(resp => {
        this.corrCoeffMatrix = resp['coefficients'];
        this.updatePlot();
      });
    }
  }

  updatePlot() {
    const dataKeys = this.dataMap.keys();
    const phenotypeName = dataKeys.next()['value'];
    let data = [];
    let layout = {};
    const height = 700;
    const width = 800;
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
          width: width,
          // width: (this.innerWidth - 600) / 2,
          height: height,
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
          width: width,
          // width: (this.innerWidth - 600) / 2,
          height: height,
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
                color: 'black'
              }
            },
            name: key,
            xaxis: 'x' + (inc),
            yaxis: 'y' + (inc),
          });
        });
        layout = {
          grid: { rows: rows, columns: columns, pattern: 'independent' },
          width: width,
          // width: (this.innerWidth - 600) / 2,
          height: height,
          autoexpand: 'true',
          autosize: 'true',
        };
      }
      // Heatmap plot type = n + 1
      if (this.plotType === PlotType.Heatmap) {
        const values = Array.from(this.dataMap.keys());
        data = [
          {
            z: this.corrCoeffMatrix,
            x: values,
            y: values,
            type: 'heatmap',
            colorscale: 'Viridis',
            colorbar: {
              x: 1.5
            }
          }
        ];
        const button_layer_1_height = 1.12;
        const annotation_offset = 0.04;
        const annotations = [
          {
            text: 'Colorscale:',
            x: 0,
            y: button_layer_1_height - annotation_offset,
            yref: 'paper',
            align: 'left',
            showarrow: false
          },
        ];
        const updatemenus = [
          {
            buttons: [
              {
                args: ['reversescale', true],
                label: 'Reverse',
                method: 'restyle'
              },
              {
                args: ['reversescale', false],
                label: 'Undo Reverse',
                method: 'restyle'
              }
            ],
            direction: 'down',
            pad: { 'r': 10, 't': 10 },
            showactive: true,
            type: 'dropdown',
            x: 0.25,
            xanchor: 'left',
            y: button_layer_1_height,
            yanchor: 'top'
          },
          {
            buttons: [
              {
                args: ['colorscale', 'Viridis'],
                label: 'Viridis',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Electric'],
                label: 'Electric',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Earth'],
                label: 'Earth',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Hot'],
                label: 'Hot',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Jet'],
                label: 'Jet',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Portland'],
                label: 'Portland',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Rainbow'],
                label: 'Rainbow',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Blackbody'],
                label: 'Blackbody',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Cividis'],
                label: 'Cividis',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Picnic'],
                label: 'Picnic',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Blues'],
                label: 'Blues',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Reds'],
                label: 'Reds',
                method: 'restyle'
              }, {
                args: ['colorscale', 'RdBu'],
                label: 'RdBu',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Bluered'],
                label: 'Bluered',
                method: 'restyle'
              }, {
                args: ['colorscale', 'YlOrRd'],
                label: 'YlOrRd',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Greens'],
                label: 'Greens',
                method: 'restyle'
              }, {
                args: ['colorscale', 'YlGnBu'],
                label: 'YlGnBu',
                method: 'restyle'
              }, {
                args: ['colorscale', 'Greys'],
                label: 'Greys',
                method: 'restyle'
              }
            ],
            direction: 'down',
            pad: { 'r': 10, 't': 10 },
            showactive: true,
            type: 'dropdown',
            x: 0.70,
            xanchor: 'left',
            y: button_layer_1_height,
            yanchor: 'top'
          },
        ];
        layout = {
          yaxis: {
            side: 'right'
          },
          width: width,
          height: height,
          updatemenus: updatemenus,
          annotations: annotations
        };
      }
      // Correlation plot type = n + 1
      if (this.plotType === PlotType.Correlation) {
        const phenotypesNames = Array.from(this.traitSelection.keys());
        // data structure to store all possible combinations of correlations sets (unique pairs of phenotype correlations)
        this.storeCombinations(phenotypesNames);

        // select by
        const colorByData = this.colorByPhenotypeValues;
        const colors = [];
        const text = [];

        let uniqueColorByValues: any;
        if (colorByData !== undefined) {
          uniqueColorByValues = this.getUniqueValues(colorByData);
          for (let i = 0; i < colorByData.length; i++) {
            for (let j = 0; j < uniqueColorByValues.size; j++) {
              if (colorByData[i] === Array.from(uniqueColorByValues)[j]) {
                colors.push(j / (uniqueColorByValues.size - 1));
              }
            }
            text.push(this.colorBy + ': ' + colorByData[i]);
          }
        }

        const pl_colorscale = [
          [0.0, '#19d3f3'],
          [0.333, '#19d3f3'],
          [0.333, '#e763fa'],
          [0.666, '#e763fa'],
          [0.666, '#636efa'],
          [1, '#636efa']
        ];

        const axis = () => ({
          showline: false,
          zeroline: false,
          gridcolor: '#ffff',
          ticklen: colorByData !== undefined ? uniqueColorByValues.size : 1
        });
        const dimensions = [];
        layout = {
          title: 'Correlation Scatter Plot Matrix',
          height: height,
          width: width,
          autosize: false,
          hovermode: 'closest',
          dragmode: 'select',
          plot_bgcolor: 'rgba(240,240,240, 0.95)',
        };
        const keys = Array.from(this.dataMap.keys());

        for (let i = 0; i < keys.length; i++) {
          if (keys.length < 5) { // we don't disply the axis titles if more than 5 phenotypes
            dimensions.push({ label: keys[i], values: this.dataMap.get(keys[i])['y'] });
          } else {
            dimensions.push({ label: '', values: this.dataMap.get(keys[i])['y'] });
          }
          layout['xaxis' + i + 1] = axis();
        }

        data = [{
          type: 'splom',
          dimensions: dimensions,
          // showupperhalf: false,
          diagonal: { visible: false },
          text: text,
          showlegend: 'true',
          marker: {
            color: colors,
            colorscale: pl_colorscale,
            size: 7,
            line: {
              color: 'white',
              width: 0.5
            }
          }
        }];
      }
    }
    // update graph data and layout
    this.graph.data = data;
    this.graph.layout = layout;
  }

  getUniqueValues(values: any[]) {
    const unique = new Set<any>();
    for (let i = 0; i < values.length; i++) {
      if (!unique.has(values[i])) {
        unique.add(values[i]);
      }
    }
    return unique;
  }

  storeCombinations(sequence: string[]) {
    const N = sequence.length;
    // reitinitialize data structure to store result
    this.combinationsResult = [];
    // call recursive method to populate results
    this.correlationCombinations(sequence, new Array<string>(N), 0, N - 1, 0, 2);
    return this.combinationsResult;
  }

  /**
   * Returns all possible combinations of r correlations given a sequence of items
   * @param sequence items
   * @param data temp data array
   * @param start start idx
   * @param end end idx
   * @param index idx, should be 0
   * @param r the number of item in the combination (should be 2)
   */
  private correlationCombinations(sequence: string[], data: string[], start: number, end: number, index: number, r: number) {

    if (index === r) {
      const combination = new Set<string>();
      for (let j = 0; j < r; j++) {
        combination.add(data[j]);
      }
      this.combinationsResult.push(combination);
    }
    for (let i = start; i <= end && ((end - i + 1) >= (r - index)); i++) {
      data[index] = sequence[i];
      this.correlationCombinations(sequence, data, i + 1, end, index + 1, r);
    }
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
