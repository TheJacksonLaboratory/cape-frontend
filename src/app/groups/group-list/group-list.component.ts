import { Component, OnInit, ViewChild, AfterViewInit, SimpleChanges, Input, OnChanges, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { GroupService } from '../../_services/group.service';
import { Group } from '../../_models';
import { GroupDataSource } from './group-list.datasource';


@Component({
  selector: 'app-group-list',
  styleUrls: ['group-list.component.css'],
  templateUrl: 'group-list.component.html',
})
export class GroupListComponent implements OnInit, OnChanges, OnDestroy {
  displayedColumns: string[] = ['id', 'name'];
  dataSource: GroupDataSource | null;

  isLoadingResults = false;
  isRateLimitReached = false;
  private rolesSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() filters: object;

  constructor(private groupService: GroupService) {
    this.rolesSub = this.groupService.getGroups().subscribe(resp => {
      this.groupService.dataChange.next(resp);
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
  }

  ngOnInit() {
    this.dataSource = new GroupDataSource(this.groupService, this.paginator, this.sort);
  }

  ngOnDestroy() {
    this.rolesSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['filters'].isFirstChange()) {
      this.dataSource = new GroupDataSource(this.groupService, this.paginator, this.sort);
    }
  }
}


