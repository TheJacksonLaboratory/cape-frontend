import {Component, OnInit, ViewChild, AfterViewInit, SimpleChanges, Input, OnChanges, OnDestroy } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import { Subscription } from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';

import {GroupService} from '../../_services/group.service';
import {Group} from '../../_models';
import { GroupDatabase, GroupDataSource } from './group-list.datasource';


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

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.dataSource = new GroupDataSource(new GroupDatabase(this.groupService, this.filters), this.paginator, this.sort);
  }

  ngOnDestroy() {
    this.rolesSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['filters'].isFirstChange()) {
      this.dataSource = new GroupDataSource(new GroupDatabase(this.groupService, this.filters), this.paginator, this.sort);
    }
  }
}


