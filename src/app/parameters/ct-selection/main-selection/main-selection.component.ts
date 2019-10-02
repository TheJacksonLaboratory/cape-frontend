import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ParametersService, DataFilesService } from 'src/app/_services';
import { Parameters } from '../../../_models/parameters';
import { PlotType } from '../../../_models/plot-type';
import { DataFile } from 'src/app/_models/datafile';
import { Phenotype } from 'src/app/_models/phenotype';


@Component({
  selector: 'app-main-selection',
  templateUrl: './main-selection.component.html',
  styleUrls: ['./main-selection.component.scss']
})
export class MainSelectionComponent implements OnInit, OnDestroy {
  files: DataFile[];
  fileSelected: DataFile;

  plotTypes = Object.values(PlotType); // ['Histogram', 'By Individual', 'Correlation', 'Heatmap', 'QNorm', 'Eigentraits'];

  plotType: any;
  colorBy: string;

  titleFormControl = new FormControl('', [
    Validators.required
  ]);

  parametersSubscription: Subscription;
  routeSubscription: Subscription;
  dataFileSub: Subscription;
  parameters: Parameters;
  phenotypesSub: Subscription;
  phenotypes: Phenotype[];

  constructor(private parametersService: ParametersService, private dataFileService: DataFilesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataFileSub = this.dataFileService.getDataFiles().subscribe(datafiles => {
      this.files = datafiles;
      if (this.parameters !== undefined) {
        const fileselected = this.findSelectedDataFile(this.parameters.datafile_id);
        if (fileselected !== undefined) {
          this.setDataFileSelected(fileselected);
        }
        this.colorBy = this.parameters.color_by;
      }
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
      if (this.parameters !== undefined) {
        this.plotType = parameters.select_plot;
        this.titleFormControl.setValue(parameters.title);
        this.colorBy = parameters.color_by;
        const fileselected = this.findSelectedDataFile(parameters.datafile_id);
        if (fileselected !== undefined) {
          this.setDataFileSelected(fileselected);
        }
      }
    });
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.parametersService.setParameters(Parameters.parse(params));
    });
    if (this.fileSelected !== undefined) {
      this.phenotypesSub = this.dataFileService.getPhenotypesPerDataFile(this.fileSelected.id).subscribe(phenos => {
        this.phenotypes = phenos;
      });
    }
  }

  ngOnDestroy() {
    this.parametersSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.dataFileSub.unsubscribe();
    if (this.phenotypesSub !== undefined) {
      this.phenotypesSub.unsubscribe();
    }
  }

  setDataFileSelected(selected: DataFile) {
    if (selected !== undefined) {
      this.parametersService.setDataFileSelected(selected);
      if (this.parameters !== undefined) {
        this.parameters.datafile_id = selected.id;
      }
      this.dataFileService.getPhenotypesPerDataFile(selected.id).subscribe(pheno => {
        this.phenotypes = pheno;
      });
      this.dataFileService.setSelectedDataFile(selected);
      this.colorBy = '';
      this.fileSelected = selected;
    }
  }

  private findSelectedDataFile(datafileId: number): DataFile {
    if (this.files === undefined) {
      return undefined;
    }
    for (const file of this.files) {
      if (file.id === datafileId) {
        return file;
      }
    }
    return undefined;
  }

  setTitle() {
    this.parameters.title = this.titleFormControl.value;
  }

  setSelectPlot() {
    this.parameters.select_plot = this.plotType;
    this.dataFileService.setSelectedPlotType(this.plotType);
  }

  setColorBy() {
    this.parameters.color_by = this.colorBy;
  }

}
