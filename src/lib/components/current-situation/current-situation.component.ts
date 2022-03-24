import { Component, OnInit } from '@angular/core';
import {TextEditorComponentConfig} from "@cima/commons";
import {FakeDataService} from "../../services/fake-data.service";

@Component({
  selector: 'reporter-current-situation',
  templateUrl: './current-situation.component.html',
  styleUrls: ['./current-situation.component.scss']
})
export class CurrentSituationComponent implements OnInit {
  public sectionEnabled=false


  public textCurrent: string = '<span>Situazione attuale...</span>';
  public config: TextEditorComponentConfig = {height:'200px', placeholder: 'Situazione attuale...'}




  constructor(public fakeData: FakeDataService) { }

  ngOnInit(): void {
  }

}
