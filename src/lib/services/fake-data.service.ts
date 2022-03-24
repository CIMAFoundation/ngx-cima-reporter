import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

  cumulata=[
    {
      id:1,
      value: '1 Ora'
    },
    {
      id:2,
      value: '3 Ore'
    },
    {
      id:3,
      value: '6 Ore'
    },
    {
      id:4,
      value: '12 Ore'
    },
    {
      id:5,
      value: '24 Ore'
    },
    {
      id:6,
      value: '36 Ore'
    },
    {
      id:7,
      value: '48 Ore'
    },
    {
      id:8,
      value: '72 Ore'
    },
    {
      id:10,
      value: 'Time Range'
    }
  ]

  aggWarning=[
    {
      id:1,
      value:'Regione'
    },
    {
      id:1,
      value:'Provincie'
    },
    {
      id:1,
      value:'Comuni'
    },
    {
      id:1,
      value:'Bacini'
    },
    {
      id:1,
      value:'Allertamento'
    },
  ]

  uploadedFiles=[
    {
      id:0,
      title:'Nome File Caricato',
      imgUrl: 'https://picsum.photos/300/200'
    }
  ]

  runs=['2022/03/24 00UTC +006','2022/03/24 00UTC +012', '2022/03/24 00UTC +018', '2022/03/24 00UTC +024', '2022/03/24 00UTC +030']

  constructor() { }
}
