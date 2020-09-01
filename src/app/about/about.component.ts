import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  // searchOption = 'variant';

  constructor(private router: Router) { }

  ngOnInit() {

  }

  // onSelectedItem(event: any){

  // }
}
