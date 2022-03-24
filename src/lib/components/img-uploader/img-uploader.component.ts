import { Component, OnInit } from '@angular/core';
import {FakeDataService} from "../../services/fake-data.service";

@Component({
  selector: 'reporter-img-uploader',
  templateUrl: './img-uploader.component.html',
  styleUrls: ['./img-uploader.component.scss']
})
export class ImgUploaderComponent implements OnInit {

  constructor(public fakeData: FakeDataService) { }

  ngOnInit(): void {
  }

  /*UPLOAD FILES*/
  delFile(file:any){
    this.fakeData.uploadedFiles = this.fakeData.uploadedFiles.filter((x: any) => x != file)
  }

}
