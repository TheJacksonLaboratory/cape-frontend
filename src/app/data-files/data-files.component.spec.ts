import { async, ComponentFixture, fakeAsync, TestBed, tick, discardPeriodicTasks } from '@angular/core/testing';
import { Observable, of } from 'rxjs/';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatDialog } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataFile } from '../_models/datafile';
import { DataFilesComponent } from '.';
import { DataFilesService } from '../_services/data-files.service';
import { AlertService } from '../_services';
import { Parameters } from '../_models';

const PARAMETER_FILES1 = [
    new Parameters(1, 'title name 1', 'Histogram', 'C2', ['C1', 'C2', 'Creat10WK'], ['Creat15WK', 'Creat6WK', ' Alb6WK', 'Alb15WK'],
        true, true, 'Raw Traits', undefined, 'hochberg', 'T', 2, true, 'LTCO', 1502, 'From List', undefined, undefined,
        undefined, 'filteredSNPs.txt', 1500000, 'Minimum Individuals per Genotype', undefined, 7,
        '# CAPE parameters YAML file\n' +
        '#================================================\n' +
        '# General Parameters \n' +
        '#================================================\n' +
        'traits:\n' +
        ' - Creat15WK\n' +
        ' - Creat6WK\n' +
        ' - Alb6WK\n' +
        ' - Alb15WK\n' +
        'covariates:\n' +
        ' - C1\n' +
        ' - C2\n' +
        ' - Creat10WK\n' +
        'scan_what:\n' +
        ' - Eigentraits\n' +
        'traits_normalized:\n' +
        ' - true\n' +
        'traits_scaled:\n' +
        ' - true\n' +
        'pval_correction:\n' +
        ' - hochberg\n' +
        'eig_which:\n' +
        ' - 1\n' +
        ' - 2\n' +
        ' - 3\n\n' +
        '#================================================\n' +
        '# Single Scan Parameters \n' +
        '#================================================\n' +
        'ref_allele:\n' +
        ' - T\n' +
        'singlescan_perm:\n' +
        ' - 2\n' +
        'use_kinship:\n' +
        ' - true\n' +
        'kingship_type:\n' +
        ' - LTCO\n\n' +
        '#================================================\n' +
        '# Marker Selection Parameters\n' +
        '#================================================\n' +
        'marker_selection_method:\n' +
        ' - From List\n' +
        'num_alleles_in_pairscan:\n' +
        ' - 1502\n' +
        'SNPfile:\n' +
        ' - filteredSNPs.txt\n\n' +
        '#================================================\n' +
        '# Pairscan Parameters\n' +
        '#================================================\n' +
        'pairscan_null_size:\n' +
        ' - 1500000\n' +
        'min_per_geno:\n' +
        ' -  7\n',
        new Date(), 1, 2),
    new Parameters(),
    new Parameters()
];
const PARAMETER_FILES2 = [
    new Parameters(),
    new Parameters(),
    new Parameters(),
    new Parameters()
];
const DATAFILES = [
    new DataFile(1, 'AD_5xFAD.RDATA', PARAMETER_FILES1),
    new DataFile(2, 'AD_All.RDATA', PARAMETER_FILES2),
    new DataFile(3, 'AD_NTG.RDATA', undefined)
];

// We use this class to mock the getDataFilesAndParameters method from the DataFilesService
class MockDataFilesService {
    getDataFilesAndParameters(): Observable<Array<DataFile>> {
        return of(DATAFILES);
    }
}

describe('DataFilesComponent', () => {
    let component: DataFilesComponent;
    let fixture: ComponentFixture<DataFilesComponent>;
    let dataFilesService: DataFilesService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DataFilesComponent],
            imports: [
                MatFormFieldModule,
                MatInputModule,
                MatTableModule,
                MatIconModule,
                MatPaginatorModule,
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                AlertService,
                { provide: MatDialog, useValue: {} },
                { provide: DataFilesService, useClass: MockDataFilesService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DataFilesComponent);
        component = fixture.componentInstance;
        dataFilesService = TestBed.get(DataFilesService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should generate a list of data files with corresponding parameter files', fakeAsync(() => {
        component.ngOnInit();
        tick();
        expect(component.getDataFiles().length).toBe(3);
        // data file 1 has 3 parameter files
        expect(component.getDataFiles()[0].parameter_files.length).toBe(3);
        // data file 2 has 4 parameter files
        expect(component.getDataFiles()[1].parameter_files.length).toBe(4);
        // data file 3 has no parameter files
        expect(component.getDataFiles()[2].parameter_files).toBe(undefined);

        discardPeriodicTasks();
    }));

    it('should filter correctly with two consec. searches and no result overlap', fakeAsync(() => {
        component.ngOnInit();
        tick();
        component.applyFilter('5xFAD');
        // check that the table only contains the first data file (named AD_5xFAD.RDATA)
        expect(component.getFilteredDataFiles().length).toBe(1);
        expect(component.getFilteredDataFiles()[0].filename).toBe('AD_5xFAD.RDATA');
        // do another filter without explicitly clearing the previous filter
        // also a sneaky test to make sure the filter properly handles capitalized strings
        // expected: should not be case sensitive
        component.applyFilter('ad_all');
        expect(component.getFilteredDataFiles().length).toBe(1);
        expect(component.getFilteredDataFiles()[0].filename).toBe('AD_All.RDATA');
    }));

    it('should download a selected parameter file created for a data file', fakeAsync(() => {
        component.ngOnInit();
        tick();
        // check that downloaded parameter file (yaml file) is equal to mock data input
        expect(component.getDataFiles()[0].parameter_files[0].yaml_file).toBe(PARAMETER_FILES1[0].yaml_file);
    }));

    afterAll(() => {
        TestBed.resetTestingModule();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
