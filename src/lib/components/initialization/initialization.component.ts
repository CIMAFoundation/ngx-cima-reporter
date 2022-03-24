import { Component, OnInit } from '@angular/core';
import {TextEditorComponentConfig} from "@cima/commons";

@Component({
  selector: 'reporter-initialization',
  templateUrl: './initialization.component.html',
  styleUrls: ['./initialization.component.scss']
})
export class InitializationComponent implements OnInit {

  public title:string='Bollettino speditivo di monitoraggio'
  public text: string = '<span>Monitoraggio delle precipitazioni</span><br><span>Valutazione delle precipitazioni delle ultime ore</span>';
  public config: TextEditorComponentConfig = {height:'200px', placeholder: 'Testo...'}

  constructor() { }

  ngOnInit(): void {
  }

}
