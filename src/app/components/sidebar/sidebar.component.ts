import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/groups', title: 'Groups',  icon: 'people', class: '' },
    { path: '/datafiles', title: 'Data Files',  icon: 'library_books', class: '' },
    { path: '/parameters', title: 'Parameters', icon: 'developer_board', class: ''},
    { path: '/jobs', title: 'Analysis',  icon: 'access_time', class: '' },
    { path: '/reports', title: 'Reports',  icon: 'timeline', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    { path: '/cape-api', title: 'API',  icon: 'api', class: '' },
    { path: '/about', title: 'About',  icon: 'explore', class: '' },
    // { path: '/administration', title: 'Administration',  icon: 'settings', class: 'admin-link' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
}
