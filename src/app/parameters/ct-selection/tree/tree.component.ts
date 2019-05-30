import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';

import { ParametersService } from 'src/app/_services';
import { DescriptionComponent } from 'src/app/shared/description/description.component';
import { PhenotypeNode, ParametersData } from '../../parameters-data';
import { CtSelectionComponent } from '../ct-selection.component';
import { Parameters } from '../../../_models/parameters';

/**
 * @title Tree with checklist
 */
@Component({
    selector: 'app-tree',
    templateUrl: 'tree.component.html',
    styleUrls: ['tree.component.scss']
})
export class TreeComponent implements OnInit, OnDestroy {
    @ViewChild('tree') tree: any;

    @Input() title: string;
    @Input() description: string;
    nodeIds = new Set();

    checkedNode = new Set<string>();

    levels = new Map<PhenotypeNode, number>();
    treeControl: FlatTreeControl<PhenotypeNode>;

    treeFlattener: MatTreeFlattener<PhenotypeNode, PhenotypeNode>;

    dataSource: MatTreeFlatDataSource<PhenotypeNode, PhenotypeNode>;

    // Selection of the input file. For now we are using the data found in ParameterData
    fileIdxSelected: any;
    mainSelectionSubscription: Subscription;

    parameters: Parameters;
    parametersSubscription: Subscription;

    private dialogRef: MatDialogRef<DescriptionComponent> = null;

     /** The selection for checklist */
     checklistSelection = new SelectionModel<PhenotypeNode>(true /* multiple */);

    constructor(private changeDetectorRef: ChangeDetectorRef, private parametersService: ParametersService, public dialog: MatDialog) {
        // subscribe to main selection component selections
        this.mainSelectionSubscription = this.parametersService.getParameterFileIdxSelected().subscribe(fileIdx => {
            this.fileIdxSelected = fileIdx;
            this.refreshTreeDatasource(fileIdx);
        });
        this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
            this.parameters = parameters;
        });

        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<PhenotypeNode>(
            this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.fileIdxSelected = 0;
        const sorted = ParametersData.fileSelections[this.fileIdxSelected].sort((a, b) => a < b ? -1 : 1);
        this.dataSource.data = ParametersData.getPhenotypeTree(sorted, this.nodeIds);
    }

    refreshTreeDatasource(idx: number) {
        const sorted = ParametersData.fileSelections[idx].sort((a, b) => a < b ? -1 : 1);
        // we repopulate the tree so we need to clear the list of node keys
        this.nodeIds.clear();
        this.dataSource.data = ParametersData.getPhenotypeTree(sorted, this.nodeIds);
    }

    ngOnInit() {
        if (this.title === CtSelectionComponent.COVARIATE_TITLE) {
            this.parameters.covariate_selection = Array.from(this.checkedNode);
        } else if (this.title === CtSelectionComponent.TRAIT_TITLE) {
            this.parameters.trait_selection = Array.from(this.checkedNode);
        }
    }
    ngOnDestroy(): void {
        // prevent memory leak when component destroyed
        this.mainSelectionSubscription.unsubscribe();
        this.parametersSubscription.unsubscribe();
    }

    applyFilter(filterValue: string) {
        const filtered = this.filterTreeDatasource(filterValue);
        // we repopulate the tree so we need to clear the list of node keys
        this.nodeIds.clear();
        this.dataSource.data = ParametersData.getPhenotypeTree(filtered, this.nodeIds);
    }

    /**
     * Returns a filtered list of selections given a filterValue
     * @param filterValue string filter
     */
    filterTreeDatasource(filterValue: string) {
        const sorted = ParametersData.fileSelections[this.fileIdxSelected].sort((a, b) => a < b ? -1 : 1);
        if (!sorted) {
            return [];
        }
        if (!filterValue) {
            return sorted;
        }
        const filteredSelection = [];
        if (sorted.length > 0) {
            filterValue = filterValue.toLocaleLowerCase();
            sorted.forEach(item => {
                if (item.toLocaleLowerCase().includes(filterValue)) {
                    filteredSelection.push(item);
                }
            });
        }
        return filteredSelection;
    }

    getLevel = (node: PhenotypeNode): number => {
        return this.levels.get(node) || 0;
    }

    isExpandable = (node: PhenotypeNode): boolean => {
        return node.getChildren().length > 0;
    }

    getChildren = (node: PhenotypeNode) => {
        return node.getChildren();
    }

    transformer = (node: PhenotypeNode, level: number) => {
        this.levels.set(node, level);
        return node;
    }

    hasChildren = (index: number, node: PhenotypeNode) => {
        return this.isExpandable(node);
    }

    filterNodes(text: string, tree: any) {
        tree.treeModel.filterNodes(text);
    }

    /** Whether all the descendants of the node are selected */
    descendantsAllSelected(node: PhenotypeNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        if (!descendants.length) {
            return this.checklistSelection.isSelected(node);
        }
        const selected = this.checklistSelection.isSelected(node);
        const allSelected = descendants.every(child => this.checklistSelection.isSelected(child));
        if (!selected && allSelected) {
            this.checklistSelection.select(node);
            this.changeDetectorRef.markForCheck();
        }
        return allSelected;
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: PhenotypeNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        if (!descendants.length) {
            return false;
        }
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }


    /** Toggle the selection. Select/deselect all the descendants node */
    nodeSelectionToggle(node: PhenotypeNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        const selected = this.checklistSelection.isSelected(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants, node)
            : this.checklistSelection.deselect(...descendants, node);

        this.checkedNode = this.findChecked(node, this.checkedNode, selected);
        if (this.title === CtSelectionComponent.COVARIATE_TITLE) {
            this.parameters.covariate_selection = Array.from(this.checkedNode);
        } else if (this.title === CtSelectionComponent.TRAIT_TITLE) {
            this.parameters.trait_selection = Array.from(this.checkedNode);
        }
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Updates the checked/unchecked nodes in the given Set an returns the updated Set
     * @param node a phenotype node
     * @param checked the Set of checked nodes as strings
     * @param selected flag to tell whether a node is selected or not
     * @returns the set of checked nodes as strings
     */
    private findChecked(node: PhenotypeNode, checked: Set<string>, selected: boolean): Set<string> {
        if (node.hasChildren()) {
            for (const child of node.getChildren()) {
                checked = this.findChecked(child, checked, selected);
            }
        } else {
            selected ? checked.add(node.name) : checked.delete(node.name);
        }
        return checked;
    }

    openDetailsDialog() {
        this.closeDialogIfOpen();
        this.dialogRef = this.dialog.open(DescriptionComponent, {
            data: { description: this.description }
        });
    }

    private closeDialogIfOpen() {
        if (this.dialogRef) {
            this.dialogRef.close();
            this.dialogRef = null;
        }
    }
}
