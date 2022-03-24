import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reporter-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss']
})
export class PrintLayoutComponent implements OnInit {

  layoutSelected=1

  constructor() { }

  ngOnInit(): void {
  }

}
