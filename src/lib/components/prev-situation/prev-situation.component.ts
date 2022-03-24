import { Component, OnInit } from '@angular/core';
import {TextEditorComponentConfig} from "@cima/commons";
import {FakeDataService} from "../../services/fake-data.service";


@Component({
  selector: 'reporter-prev-situation',
  templateUrl: './prev-situation.component.html',
  styleUrls: ['./prev-situation.component.scss']
})
export class PrevSituationComponent implements OnInit {

  public sectionEnabled=false

  public pluviometriTableEnabled=false
  public idrometriTableEnabled=false

  public textPrev: string = '<span>Situtazione pregressa...</span>';
  public config: TextEditorComponentConfig = {height:'200px', placeholder: 'Situtazione pregressa...'}

  /*RAINMAPS*/
  public rainMaps: any = [
    {
      id:0,
      timeRange:''
    }
  ]
  addRainMaps(){
    this.rainMaps = [...this.rainMaps, {id:1, timeRange:''}]
  }
  delRainMaps(item:any) {
    this.rainMaps = this.rainMaps.filter((x: any) => x != item)
  }



  constructor(public fakeData: FakeDataService) { }

  ngOnInit(): void {
  }

}
