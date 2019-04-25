import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Group } from '../../_models';
import { GroupService } from '../../_services';

/**
 * Connect function called by the table to retrieve one stream containing the data to render.
 */
export class GroupDataSource extends DataSource<Group> {

    filterChange = new BehaviorSubject('');
    filteredData: Group[] = [];

    constructor(private groupService: GroupService,
        private paginator: MatPaginator,
        private sort: MatSort) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     */
    connect(): Observable<Group[]> {
        const displayDataChanges = [
            this.groupService.dataChange,
            this.sort.sortChange,
            this.filterChange,
            this.paginator.page
        ];
        // return an Observable that emits any time the data to display changes
        return merge(...displayDataChanges)
            .pipe(map(() => {
                // first filter the data
                this.filteredData = this.groupService.data.slice()
                    .filter((group: Group) => {
                        const searchStr = (group.id + group.name + group.permissions );
                        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
                    });
                // sort the filtered data
                const sorted = this.sortData(this.filteredData.slice());

                // Paginate Filtered Sorted Data
                const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
                return sorted.splice(startIndex, this.paginator.pageSize);
            }));
    }

    disconnect() {}

    get filter(): string {
        return this.filterChange.value;
    }

    set filter(filter: string) {
        this.filterChange.next(filter);
    }

    /**
     * Returns a sorted copy of the table data.
     * @param data: data to sort
     * @returns: sorted data
     * */
    sortData(data: Group[]): Group[] {

        // no sort, just return the data
        if (!this.sort.active || this.sort.direction === '') { return data; }

        return data.sort((a, b) => {
            let propertyA: number | string | string[] = '';
            let propertyB: number | string | string[] = '';

            switch (this.sort.active) {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'name':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case 'permissions':
                    [propertyA, propertyB] = [a.permissions, b.permissions];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
        });
    }
}
