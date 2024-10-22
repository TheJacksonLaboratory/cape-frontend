import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ParametersService, DataFilesService } from 'src/app/_services';
import { Parameters } from '../../../_models/parameters';
import { DataFile } from 'src/app/_models/datafile';


@Component({
  selector: 'app-main-selection',
  templateUrl: './main-selection.component.html',
  styleUrls: ['./main-selection.component.scss']
})
export class MainSelectionComponent implements OnInit, OnDestroy {
  files: DataFile[];
  fileSelected: DataFile;

  titleFormControl = new FormControl('', [
    Validators.required
  ]);

  parametersSubscription: Subscription;
  routeSubscription: Subscription;
  dataFileSub: Subscription;
  parameters: Parameters;

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
      }
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
    this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
      if (this.parameters !== undefined) {
        this.titleFormControl.setValue(parameters.title);
        const fileselected = this.findSelectedDataFile(parameters.datafile_id);
        if (fileselected !== undefined) {
          this.setDataFileSelected(fileselected);
        }
      }
    });
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.parametersService.setParameters(Parameters.parse(params));
    });
  }

  ngOnDestroy() {
    this.parametersSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.dataFileSub.unsubscribe();
  }

  setDataFileSelected(selected: DataFile) {
    if (selected !== undefined) {
      this.parametersService.setDataFileSelected(selected);
      if (this.parameters !== undefined) {
        this.parameters.datafile_id = selected.id;
      }
      this.dataFileService.setSelectedDataFile(selected);
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

}
