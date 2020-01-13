import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  minValue:number = 500;
  maxValue:number = 50000;
  defaultRange:number = 25000;
  maxValueSelected:number;
  constructor() { }

  ngOnInit() {
    this.maxValueSelected = this.defaultRange;
  }
  changeValue(value: number){
    this.maxValueSelected = value;
  }
}
