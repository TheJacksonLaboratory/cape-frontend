import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-of-contents',
  template: `
    <div id="container">
      <div class="title">{{ listTitle }}</div>
      <nav>
        <ng-content select="a"></ng-content>
      </nav>
    </div>
  `,
  styleUrls: ['./table-of-contents.component.scss']
})
export class TableOfContentsComponent implements OnInit {
  @Input() listTitle: string = 'Table of Contents';

  constructor() { }

  ngOnInit(): void {
  }

}