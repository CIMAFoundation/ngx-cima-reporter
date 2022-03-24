import { Component, OnInit } from '@angular/core';
import {FakeDataService} from "../../services/fake-data.service";

@Component({
  selector: 'reporter-warning-pluvio',
  templateUrl: './warning-pluvio.component.html',
  styleUrls: ['./warning-pluvio.component.scss']
})
export class WarningPluvioComponent implements OnInit {

  constructor(public fakeData: FakeDataService) { }

  ngOnInit(): void {
  }

  /*WARNINGPLUVIO*/
  public warningsPluvio: any = [
    {
      id:0,
      aggregazione:''
    }
  ]
  addWarningPluvio(){
    this.warningsPluvio = [...this.warningsPluvio, {id:1, aggregazione:''}]
  }
  delWarningPluvio(item:any) {
    this.warningsPluvio = this.warningsPluvio.filter((x: any) => x != item)
  }

}
