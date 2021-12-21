import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { GroupService } from '../../_services/group.service';
import { Group } from '../../_models';


@Component({
  selector: 'app-group-list',
  styleUrls: ['group-list.component.css'],
  templateUrl: 'group-list.component.html',
})
export class GroupListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<Group>;

  private rolesSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private groupService: GroupService) {
    this.rolesSub = this.groupService.getGroups().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      // TODO: display our server error dialog?
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.rolesSub.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


