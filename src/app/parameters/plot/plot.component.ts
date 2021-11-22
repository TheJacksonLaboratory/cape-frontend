import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, throwError } from 'rxjs';

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
  private combinationsResult: Array<string>;

  // phenotypes
  private phenotypesSubscription: Subscription;
  phenotypes: Phenotype[];
  private traitSelectionSubscription: Subscription;
  private traitSelection: Set<string>;
  // private traitsSelected: string[];

  // Map to store phenotype data selected
  private dataMap = new Map();
  // Coefficient Matrix
  private corrCoeffMatrix: [][];

  private previousDataFileId: number;
  // plot options
  plotType: PlotType;
  plotTypes = Object.values(PlotType); // ['Histogram', 'By Individual', 'Correlation', 'Heatmap', 'QNorm', 'Eigentraits'];
  colorBy: string;
  private colorByPhenotypeValues: any[];
  // private selectedColorBy: string;

  public graph = {
    data: [],
    layout: {}
  };

  config = {responsive: true};

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
    const height = 800;
    // const width = 800;
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
          // width: width,
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
          },
          legend: {"orientation": "h"}
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
          },
          legend: {"orientation": "h"}
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
          // width: width,
          // width: (this.innerWidth - 600) / 2,
          height: height,
          autoexpand: 'true',
          autosize: 'true',
          legend: {"orientation": "h"}
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
          // width: width,
          // width: (this.innerWidth - 600) / 2,
          height: height,
          autoexpand: 'true',
          autosize: 'true',
          legend: {"orientation": "h"}
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
            autorange: 'reversed',
            side: 'right'
          },
          // width: width,
          height: height,
          updatemenus: updatemenus,
          annotations: annotations
        };
      }
      // Correlation plot type = n + 1
      if (this.plotType === PlotType.Splom) {
        // select by
        const colorByData = this.colorByPhenotypeValues;
        const colors = [];
        const text = [];
        const keys = Array.from(this.dataMap.keys());

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
          // width: width,
          autosize: false,
          hovermode: 'closest',
          dragmode: 'select',
          plot_bgcolor: 'rgba(240,240,240, 0.95)',
        };

        for (let i = 0; i < keys.length; i++) {
          if (keys.length < 5) { // we don't display the axis titles if more than 5 phenotypes
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
          // diagonal: { visible: false },
          text: text,
          name: 'this is a test',
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
      if (this.plotType === PlotType.Correlation) {
        const phenos = Array.from(this.traitSelection);
        const numOfPhenos = phenos.length;
        const phenosColumns = phenos;
        const phenosRows = phenos;
        if (phenosColumns === undefined || phenosRows === undefined || this.corrCoeffMatrix === undefined) {
          this.graph.data = [];
          this.graph.layout = [];
          return;
        }
        let diagonalIdx = 0;
        let plotIdx = 1;
        const startingXAxisValIdx = (numOfPhenos * numOfPhenos) - (numOfPhenos - 1);
        let scatterXIdx = startingXAxisValIdx;
        // we start the Y index for scatter plots at numPheno + 1
        let scatterYIdx = 0;
        // histo x axis idx
        let histoXIdx = startingXAxisValIdx;
        const annotations = [];
        const subplots = [];
        for (let i = 0; i < phenosRows.length; i++) {
          const rowSubplots = [];
          for (let j = 0; j < phenosColumns.length; j++) {
            if (this.corrCoeffMatrix[i][j] === 1) {
              // histogram
              // reset scatter idx
              scatterXIdx = startingXAxisValIdx;
              // increment scatterYIdx
              scatterYIdx = scatterYIdx === 0 ? (numOfPhenos + 1) : (scatterYIdx + numOfPhenos);
              const xVal = this.dataMap.get(phenosColumns[j])['y'];
              const maxXVal = this.getMax(xVal);
              const minXVal = this.getMin(xVal);
              // const xAxisIdx = (startingXAxisValIdx) + (plotIdx - 1);
              const annotXVal = ((maxXVal - minXVal) / 2) + minXVal;
              data.push({
                x: xVal,
                type: 'histogram',
                opacity: 0.5,
                marker: {
                  line: {
                    width: 1,
                    color: 'black'
                  }
                },
                name: phenosColumns[j],
                xaxis: 'x' + histoXIdx,
                yaxis: plotIdx === 1 ? 'y' : 'y' + plotIdx,
              });
              annotations.push(
                {
                  x: annotXVal,
                  y: 10,
                  xref: 'x' + histoXIdx,
                  yref: plotIdx === 1 ? 'y' : 'y' + plotIdx,
                  text: phenosColumns[j],
                  visible: numOfPhenos > 5 ? false : true,
                  showarrow: false,
                  bgcolor: 'white'
                }
              );
              rowSubplots.push('x' + histoXIdx + (plotIdx === 1 ? 'y' : 'y' + plotIdx));
              // increment histo idx
              histoXIdx++;
            }
            if (j < diagonalIdx) {
              // plot correlation scatter plot
              const xVal = this.dataMap.get(phenosColumns[j])['y'];
              const yVal = this.dataMap.get(phenosRows[i])['y'];
              const minXVal = this.getMin(xVal);
              const maxYVal = this.getMax(yVal);
              data.push({
                x: xVal,
                y: this.dataMap.get(phenosRows[i])['y'],
                type: 'scattergl',
                mode: 'markers',
                name: phenosColumns[j] + '/' + phenosRows[i],
                xaxis: 'x' + scatterXIdx,
                yaxis: 'y' + scatterYIdx
              });
              annotations.push(
                {
                  x: minXVal,
                  y: maxYVal,
                  xref: 'x' + scatterXIdx,
                  yref: 'y' + scatterYIdx,
                  text: '',
                  showarrow: false,

                }
              );
              rowSubplots.push('x' + scatterXIdx + 'y' + scatterYIdx);
              // increment scatterXIdx
              scatterXIdx ++;
            }
            if (j > diagonalIdx) {
              // plot R coefficient
              const roundFactor = this.getRoundFactor(numOfPhenos);
              const rVal = Math.round(this.corrCoeffMatrix[j][i] * roundFactor) / roundFactor;
              data.push({
                xaxis: 'x' + plotIdx,
                yaxis: 'y' + plotIdx
              });

              annotations.push({
                font: {
                  family: 'Courier New',
                  size: this.getFontSize(numOfPhenos)
                },
                x: 1,
                y: 1,
                xref: 'x' + plotIdx,
                yref: 'y' + plotIdx,
                text: '<b>R = ' + rVal + '</b>',
                showarrow: false,
                hovertext: '<b>R = ' + rVal + '</b>'
              });
              rowSubplots.push('x' + plotIdx + 'y' + plotIdx);
            }
            plotIdx++;
          }
          diagonalIdx++;
          subplots.push(rowSubplots);
        }
        layout = {
          grid: {
            rows: phenosRows.length,
            columns: phenosColumns.length,
            roworder: 'top to bottom',
            subplots: subplots,
            // pattern: 'independent'
          },
          annotations: annotations,
          // width: width,
          height: height,
          autoexpand: 'true',
          autosize: 'true',
          plot_bgcolor: 'rgba(228, 222, 249, 0.65)',
          legend: {"orientation": "h"}
        };
      }
    }
    // update graph data and layout
    this.graph.data = data;
    this.graph.layout = layout;
  }

  getFontSize(numberOfColumns: number) {
    if (numberOfColumns < 4) {
      return 24;
    }
    if (numberOfColumns > 3 && numberOfColumns < 6) {
      return 12;
    }
    if (numberOfColumns > 5) {
      return 6;
    }
  }

  getRoundFactor(numberOfColumns: number) {
    if (numberOfColumns < 4) {
      return 10000;
    }
    if (numberOfColumns > 3 && numberOfColumns < 6) {
      return 1000;
    }
    if (numberOfColumns > 5) {
      return 100;
    }
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

  private filter(array: number[]) {
    return array.map(function(o) {
      return o;
    }).filter(function (val) {
      return val !== null;
    });
  }

  getMin(array: number[]) {
    const values = this.filter(array);
    return Math.min(...values);
  }

  getMax(array: number[]) {
    const values = this.filter(array);
    return Math.max(...values);
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
