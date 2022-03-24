import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { CimaEnvironment } from '@cima/commons';

@Injectable({
  providedIn: 'root',
})
export class ReporterService {
  constructor(
    @Inject('env') private env: CimaEnvironment,
    private http: HttpClient
  ) {}
}


