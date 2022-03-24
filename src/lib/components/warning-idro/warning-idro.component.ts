import { Component, OnInit } from '@angular/core';
import {FakeDataService} from "../../services/fake-data.service";

@Component({
  selector: 'reporter-warning-idro',
  templateUrl: './warning-idro.component.html',
  styleUrls: ['./warning-idro.component.scss']
})
export class WarningIdroComponent implements OnInit {

  constructor(public fakeData: FakeDataService) { }

  ngOnInit(): void {
  }


  /*WARNINGIDRO*/
  public warningsIdro: any = [
    {
      id:0,
      aggregazione:''
    }
  ]
  addWarningIdro(){
    this.warningsIdro = [...this.warningsIdro, {id:1, aggregazione:''}]
  }
  delWarningIdro(item:any) {
    this.warningsIdro = this.warningsIdro.filter((x: any) => x != item)
  }

}
