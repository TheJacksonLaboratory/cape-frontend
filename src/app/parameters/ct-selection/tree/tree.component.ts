import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild, Input, Injectable } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import {of as ofObservable, Observable, BehaviorSubject, Subscription, throwError } from 'rxjs';

import { ParametersService, DataFilesService } from 'src/app/_services';
import { DescriptionComponent } from 'src/app/shared/description/description.component';
import { CtSelectionComponent } from '../ct-selection.component';
import { Parameters } from '../../../_models/parameters';
import { TreeSelectionService } from 'src/app/_services/tree-selection.service';
import { DataFile } from 'src/app/_models/datafile';
import { Phenotype } from 'src/app/_models/phenotype';


/** Flat Phenotype node with expandable and level information */
export class PhenotypeFlatNode {
    name: string;
    nodeid: number;
    level: number;
    expandable: boolean;
}

/**
 * Node for phenotypes
 */
export class PhenotypeNode {
    _nodeId: number;
    disabled: boolean;
    parent: PhenotypeNode;
    private children: PhenotypeNode[] = [];
    /**
     * Node constructor
     * @param name name of node
     * @param nodeIds Set of already created nodes
     * @param nodeid unique id for each node
     */
    constructor(public name: string, public nodeIds: Set<number>, nodeid?: number) {
        if (nodeid) {
            this.setNodeId(nodeid);
        }
    }

    setNodeId(nodeid: number) {
        if (!this.nodeIds.has(nodeid)) {
            this._nodeId = nodeid;
            this.nodeIds.add(nodeid);
        } else {
            throwError('Node already exists!');
        }
    }
    getNodeId(): number {
        return this._nodeId;
    }
    getChildren(): PhenotypeNode[] {
        if (this.children === undefined) {
            return [];
        }
        return this.children;
    }
    addChild(child: PhenotypeNode) {
        this.children.push(child);
    }
}
/**
 * Phenotype database, it can build a tree structured object from string.
 * Each string is split by '.' or '_' character and each array value is turned into a node.
 * A phenotype node has a name (the displayed information) and an id. The leaves nodes (nodes with no children) are
 * the original phenotype string values. The input will be an array of Phenotype, and the output is an array of 
 * `PhenotypeNode` with nested structure.
 */
@Injectable()
export class PhenotypeDatabase {
    dataChange = new BehaviorSubject<PhenotypeNode[]>([]);

    get data(): PhenotypeNode[] { return this.dataChange.value; }

    // dataFileId: number;
    /**
     * Clean up strings by replacing ... by . or .. by .
     * Remove trailing points.
     * @param str string to be cleand
     */
    private static getCleanString(str: string) {
        str = str.replace((/[[..]|[...]]+/), '.'); // replace .. or ... by .
        str = str.endsWith('.') ? str.substring(0, str.length - 2) : str; // remove . at the end of a string
        return str;
    }

    /**
     * Creates a tree of PhenotypeNodes given an array of phenotypes and a mutable Set
     * @param phenotypes array of phenotypes
     * @param nodeIds Set used to store unique nodes ID
     * @param viewAsTree if true, returns a tree like structure, otherwise returns a list
     */
    public static getPhenotypeTree(phenotypes: Phenotype[], nodeIds: Set<number>, viewAsTree: boolean): PhenotypeNode[] {
        const result = [];
        let nodeid = 0;
        if (!viewAsTree) {
            for (let i = 0; i < phenotypes.length; i++) {
                const node = new PhenotypeNode(phenotypes[i].name, nodeIds);
                result.push(node);
            }
            return result;
        }
        const root = new PhenotypeNode('Phenotypes', nodeIds, nodeid);
        for (let i = 0; i < phenotypes.length; i++) {
            const cleaned = this.getCleanString(phenotypes[i].name);
            const node = cleaned.split(/[._]+/); // we split on . and/or _
            let parent = root;
            for (let j = 0; j < node.length; j++) {
                let child = new PhenotypeNode(node[j], nodeIds);
                child.parent = parent;
                const foundNode = PhenotypeDatabase.findNode(root, child);
                if (foundNode === null) {
                    if (j < node.length - 1) {
                        child.parent = parent;
                        child.setNodeId(nodeid++);
                        parent.addChild(child);
                        parent = child;
                    } else { // leaf node
                        child = new PhenotypeNode(phenotypes[i].name, nodeIds);
                        child.parent = parent;
                        child.setNodeId(nodeid++);
                        parent.addChild(child);
                    }
                } else {
                    if (j < node.length - 1) {
                        parent = foundNode;
                    }
                }

            }
        }
        for (const node of root.getChildren()) {
            result.push(node);
        }
        return result;
    }

    /**
     * Finds a given node if it exists in the tree
     * @param n root or parent node to look for node
     * @param s node to look for
     */
    public static findNode(parent: PhenotypeNode, node: PhenotypeNode): PhenotypeNode {
        if (parent.name === node.name && parent.parent.getNodeId() === node.parent.getNodeId()) {
            return parent;
        } else {
            for (const child of parent.getChildren()) {
                const result = this.findNode(child, node);
                if (result != null) {
                    return result;
                }
            }
        }
        return null;
    }

    /**
     * Given a Phenotype tree, returns the branch with the given leaf name
     * @param node root or branch node
     * @param leafName leaf name to look for
     */
    public static findNodeByLeaf(node: PhenotypeNode, leafName: string) {
        if (node.getChildren().length <= 0 && node.name === leafName) {
            return node;
        } else {
            for (const child of node.getChildren()) {
                const result = this.findNodeByLeaf(child, leafName);
                if (result != null) {
                    return result;
                }
            }
        }
        return null;
    }
}


/**
 * @title Tree with checklist
 */
@Component({
    selector: 'app-tree',
    templateUrl: 'tree.component.html',
    styleUrls: ['tree.component.scss'],
    providers: [PhenotypeDatabase]
})
export class TreeComponent implements OnInit, OnDestroy {
    @ViewChild('tree') tree: any;

    viewAsTree = true;

    @Input() title: string;
    @Input() description: string;
    nodeIds = new Set<number>();

    /** Keep track of all selected phenotypes in the tree */
    selectedPhenotypes = new Set<string>();

    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap: Map<PhenotypeFlatNode, PhenotypeNode> = new Map<PhenotypeFlatNode, PhenotypeNode>();
    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap: Map<PhenotypeNode, PhenotypeFlatNode> = new Map<PhenotypeNode, PhenotypeFlatNode>();

    treeControl: FlatTreeControl<PhenotypeFlatNode>;
    treeFlattener: MatTreeFlattener<PhenotypeNode, PhenotypeFlatNode>;
    dataSource: MatTreeFlatDataSource<PhenotypeNode, PhenotypeFlatNode>;
    /** The selection for phenotype */
    phenotypeSelection = new SelectionModel<PhenotypeFlatNode>(true /* multiple */);

    // Selection of the input file
    fileSelected: DataFile;
    parameters: Parameters;

    mainSelectionSubscription: Subscription;
    parametersSubscription: Subscription;
    dataFilesSub: Subscription;
    routeSubscription: Subscription;

    private dialogRef: MatDialogRef<DescriptionComponent> = null;

    /** A list of all phenotypes for the data file selected */
    phenotypes: Phenotype[];

    constructor(private changeDetectorRef: ChangeDetectorRef, private dataFilesService: DataFilesService,
        private parametersService: ParametersService, private treeSelectionService: TreeSelectionService,
        private database: PhenotypeDatabase, private route: ActivatedRoute, public dialog: MatDialog) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<PhenotypeFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    }

    getLevel = (node: PhenotypeFlatNode) => {
        return node.level;
    }

    isExpandable = (node: PhenotypeFlatNode) => {
        return node.expandable;
    }

    getChildren = (node: PhenotypeNode): Observable<PhenotypeNode[]> => {
        return ofObservable(node.getChildren());
    }

    hasChild = (_: number, _nodeData: PhenotypeFlatNode) => {
        return _nodeData.expandable;
    }

    hasNoContent = (_: number, _nodeData: PhenotypeFlatNode) => {
        return _nodeData.name === '';
    }

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: PhenotypeNode, level: number) => {
        const flatNode = this.nestedNodeMap.has(node) && this.nestedNodeMap.get(node)!.name === node.name
            ? this.nestedNodeMap.get(node)!
            : new PhenotypeFlatNode();
        flatNode.name = node.name;
        flatNode.level = level;
        flatNode.nodeid = node.getNodeId();
        flatNode.expandable = node.getChildren() !== undefined ? node.getChildren().length > 0 : false;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    }

    /** Whether all the descendants of the node are selected */
    descendantsAllSelected(node: PhenotypeFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        return descendants.every(child => this.phenotypeSelection.isSelected(child));
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: PhenotypeFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.phenotypeSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the phenotype selection. Select/deselect all the descendants node */
    phenotypeSelectionToggle(node: PhenotypeFlatNode, selected?: boolean): void {
        this.phenotypeSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        if (selected !== undefined) {this.phenotypeSelection.select(node)};
        this.phenotypeSelection.isSelected(node)
            ? this.phenotypeSelection.select(...descendants)
            : this.phenotypeSelection.deselect(...descendants);

        const nestedNode = this.flatNodeMap.get(node);
        const isSelected = this.phenotypeSelection.isSelected(node);
        this.selectedPhenotypes = this.findSelected(nestedNode, this.selectedPhenotypes, isSelected);
        if (this.parameters !== undefined && this.title === CtSelectionComponent.COVARIATE_TITLE) {
            this.parameters.covariate_selection = Array.from(this.selectedPhenotypes);
            this.treeSelectionService.setCovariateSelected(this.selectedPhenotypes);
        } else if (this.parameters !== undefined && this.title === CtSelectionComponent.TRAIT_TITLE) {
            this.parameters.trait_selection = Array.from(this.selectedPhenotypes);
            this.treeSelectionService.setTraitSelected(this.selectedPhenotypes);
        }
        this.changeDetectorRef.markForCheck();
    }

    hasNestedChild = (_: number, nodeData: PhenotypeNode) => nodeData.getChildren().length <= 0;

    /**
     * Refresh the tree datasource given the corresponding data file
     * @param dataFile data file selected
     */
    refreshTreeDatasource(dataFile: DataFile) {
        if (dataFile !== undefined) {
            // we repopulate the tree so we need to clear the list of node keys
            this.nodeIds.clear();
            // get the new list of phenotypes through the data file service
            this.dataFilesService.getPhenotypesPerDataFile(dataFile.id).subscribe(phenos => {
                this.phenotypes  = phenos.sort((a, b) => a.name < b.name ? -1 : 1);
                const nodes = PhenotypeDatabase.getPhenotypeTree(this.phenotypes, this.nodeIds, this.viewAsTree);
                this.database.dataChange.next(nodes);
            });
        }
    }

    ngOnInit() {
        // subscribe to main selection component selections
        this.mainSelectionSubscription = this.parametersService.getDataFileSelected().subscribe(dataFileSelected => {
            this.fileSelected = dataFileSelected;
            this.refreshTreeDatasource(dataFileSelected);
        });
        this.parametersSubscription = this.parametersService.getParameters().subscribe(parameters => {
            this.parameters = parameters;
        });

        this.routeSubscription = this.route.queryParams.subscribe(params => {
            this.parametersService.setParameters(Parameters.parse(params));
        });
        this.database.dataChange.subscribe(data => {
            this.dataSource.data = data;
            if (this.parameters !== undefined) {
                if (this.title === CtSelectionComponent.COVARIATE_TITLE) {
                    this.selectedPhenotypes = new Set(this.parameters.covariate_selection);
                    this.checkNodes(this.selectedPhenotypes);
                } else if (this.title === CtSelectionComponent.TRAIT_TITLE) {
                    this.selectedPhenotypes = new Set(this.parameters.trait_selection);
                    this.checkNodes(this.selectedPhenotypes);
                }
            }
        });
        if (this.title === CtSelectionComponent.COVARIATE_TITLE && this.parameters !== undefined) {
            this.parameters.covariate_selection = Array.from(this.selectedPhenotypes);
        } else if (this.title === CtSelectionComponent.TRAIT_TITLE && this.parameters !== undefined) {
            this.parameters.trait_selection = Array.from(this.selectedPhenotypes);
        }
    }

    ngOnDestroy(): void {
        // prevent memory leak when component destroyed
        this.mainSelectionSubscription.unsubscribe();
        this.parametersSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    /**
     * Filter the Phenotype list of the tree with the given string
     * @param filterValue value of the filter
     */
    applyFilter(filterValue: string) {
        const filtered = this.filterPhenotypeList(filterValue, this.phenotypes);
        // we repopulate the tree so we need to clear the list of node keys
        this.nodeIds.clear();
        // Update data source
        const nodes = PhenotypeDatabase.getPhenotypeTree(filtered, this.nodeIds, this.viewAsTree);
        this.database.dataChange.next(nodes);
        // Select the nodes that were selected
        this.checkNodes(this.selectedPhenotypes);
    }

    /**
     * Returns a filtered list of selections given a filterValue
     * @param filterValue string filter
     */
    public filterPhenotypeList(filterValue: string, phenotypes: Phenotype[]): Phenotype[] {
        // const sorted = this.phenotypes.sort((a, b) => a.name < b.name ? -1 : 1);
        if (!phenotypes) {
            return [];
        }
        if (!filterValue) {
            return phenotypes;
        }
        const filteredSelection = [];
        if (phenotypes.length > 0) {
            filterValue = filterValue.toLocaleLowerCase();
            phenotypes.forEach(item => {
                if (item.name.toLocaleLowerCase().includes(filterValue)) {
                    filteredSelection.push(item);
                }
            });
        }
        return filteredSelection;
    }

    /**
     * Updates the checked/unchecked nodes in the given Set an returns the updated Set
     * @param node a phenotype node
     * @param checked the Set of checked nodes as strings
     * @param selected flag to tell whether a node is selected or not
     * @returns the set of checked nodes as strings
     */
    private findSelected(node: PhenotypeNode, checked: Set<string>, selected: boolean): Set<string> {
        if (node.getChildren().length > 0) {
            for (const child of node.getChildren()) {
                checked = this.findSelected(child, checked, selected);
            }
        } else {
            selected ? checked.add(node.name) : checked.delete(node.name);
        }
        return checked;
    }

    /**
     * Check the nodes on the mat tree
     * @param checkedNodes checked nodes
     */
    private checkNodes(checkedNodes: Set<string>) {
        checkedNodes.forEach(element => {
            for (const node of this.dataSource.data) {
                if (node !== null) {
                    const foundNode = PhenotypeDatabase.findNodeByLeaf(node, element);
                    if (foundNode !== null) {
                        const flatNode = this.nestedNodeMap.get(foundNode);
                        this.phenotypeSelectionToggle(flatNode, true);
                    }
                }
            }
        });
    }


    /**
     * Toggle the viewAs option. If toggled is true the phenotype selection will be viewed as a tree, a list otherwise.
     * @param toggled if true, view as tree, if false, view as list
     */
    toggleViewAs(toggled: boolean) {
        this.viewAsTree = toggled;
        // Refresh data source
        this.nodeIds.clear();
        const nodes = PhenotypeDatabase.getPhenotypeTree(this.phenotypes, this.nodeIds, this.viewAsTree);
        this.database.dataChange.next(nodes);
        // Select the nodes that were selected previously
        this.checkNodes(this.selectedPhenotypes);
    }

    /**
     * Open the information dialog for the tree component
     */
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
