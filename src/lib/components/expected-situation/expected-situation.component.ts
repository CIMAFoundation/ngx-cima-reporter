import { Component, OnInit } from '@angular/core';
import {TextEditorComponentConfig} from "@cima/commons";
import {FakeDataService} from "../../services/fake-data.service";

@Component({
  selector: 'reporter-expected-situation',
  templateUrl: './expected-situation.component.html',
  styleUrls: ['./expected-situation.component.scss']
})
export class ExpectedSituationComponent implements OnInit {

  public sectionEnabled=false


  public textExpected: string = '<span>Situazione prevista...</span>';
  public config: TextEditorComponentConfig = {height:'200px', placeholder: 'Situazione prevista...'}

  /*PREC RUN*/
  public runsPrec: any = [
    {
      id:0,
      run:''
    }
  ]
  addRunPrec(){
    this.runsPrec = [...this.runsPrec, {id:1, aggregazione:''}]
  }
  delRunPrec(item:any) {
    this.runsPrec = this.runsPrec.filter((x: any) => x != item)
  }

  /*SNOW RUN*/
  public runsSnow: any = [
    {
      id:0,
      run:''
    }
  ]
  addRunSnow(){
    this.runsSnow = [...this.runsSnow, {id:1, aggregazione:''}]
  }
  delRunSnow(item:any) {
    this.runsSnow = this.runsSnow.filter((x: any) => x != item)
  }

  /*GEOPOT RUN*/
  public runsGeoPot: any = [
    {
      id:0,
      run:''
    }
  ]
  addRunGeoPot(){
    this.runsGeoPot = [...this.runsGeoPot, {id:1, aggregazione:''}]
  }
  delRunGeoPot(item:any) {
    this.runsGeoPot = this.runsGeoPot.filter((x: any) => x != item)
  }


  constructor(public fakeData: FakeDataService) { }

  ngOnInit(): void {
  }

}
