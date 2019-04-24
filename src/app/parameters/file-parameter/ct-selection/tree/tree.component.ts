import { ChangeDetectorRef, Component, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

import { FileParameterData, PhenotypeNode } from '../../file-parameter-data';
import { ParametersService } from 'src/app/_services';

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

    nodeIds = new Set();

    levels = new Map<PhenotypeNode, number>();
    treeControl: FlatTreeControl<PhenotypeNode>;

    treeFlattener: MatTreeFlattener<PhenotypeNode, PhenotypeNode>;

    dataSource: MatTreeFlatDataSource<PhenotypeNode, PhenotypeNode>;

    fileIdxSelected: any;
    mainSelectionSubscription: Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef, private parametersService: ParametersService) {
        // subscribe to main selection component selections
        this.mainSelectionSubscription = this.parametersService.getParameterFileIdxSelected().subscribe(fileIdx => {
            this.fileIdxSelected = fileIdx;
            this.refreshTreeDatasource(fileIdx);
        });

        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<PhenotypeNode>(
            this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        const sorted = FileParameterData.fileSelections[0].sort((a, b) => a < b ? -1 : 1);
        this.dataSource.data = FileParameterData.getPhenotypeTree(sorted, this.nodeIds);
    }

    refreshTreeDatasource(idx: number) {
        const sorted = FileParameterData.fileSelections[idx].sort((a, b) => a < b ? -1 : 1);
        this.dataSource.data = FileParameterData.getPhenotypeTree(sorted, this.nodeIds);
    }

    ngOnInit() {
    }
    ngOnDestroy(): void {
        // prevent memory leak when component destroyed
        this.mainSelectionSubscription.unsubscribe();
    }

    getLevel = (node: PhenotypeNode): number => {
        return this.levels.get(node) || 0;
    }

    isExpandable = (node: PhenotypeNode): boolean => {
        return node.children.value.length > 0;
    }

    getChildren = (node: PhenotypeNode) => {
        return node.children;
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

    /** The selection for checklist */
    checklistSelection = new SelectionModel<PhenotypeNode>(true /* multiple */);

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

    /** Toggle the game selection. Select/deselect all the descendants node */
    nodeSelectionToggle(node: PhenotypeNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants, node)
            : this.checklistSelection.deselect(...descendants, node);
        this.changeDetectorRef.markForCheck();
    }
}
