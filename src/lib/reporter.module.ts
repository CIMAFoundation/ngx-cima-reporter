import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { APP_CONFIG, CimaCommonsModule, TimebarService } from '@cima/commons';

import { ReporterRoutingModule } from "./reporter-routing.module";

import { ReporterAppContainerComponent } from './components/reporter-app-container/reporter-app-container.component';

import { HomeComponent } from "./pages/home/home.component";

const _PAGES = [HomeComponent];

const _COMPONENTS = [
  ReporterAppContainerComponent,
  InitializationComponent,
  PrevSituationComponent,
  CurrentSituationComponent,
  ExpectedSituationComponent,
  PrintLayoutComponent,
  ImgUploaderComponent,
  WarningPluvioComponent,
  WarningIdroComponent];

import { REPORTER_CONFIG } from './reporter.config';
import {FormsModule} from "@angular/forms";
import { InitializationComponent } from './components/initialization/initialization.component';
import { PrevSituationComponent } from './components/prev-situation/prev-situation.component';
import { CurrentSituationComponent } from './components/current-situation/current-situation.component';
import { ExpectedSituationComponent } from './components/expected-situation/expected-situation.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { ImgUploaderComponent } from './components/img-uploader/img-uploader.component';
import { WarningPluvioComponent } from './components/warning-pluvio/warning-pluvio.component';
import { WarningIdroComponent } from './components/warning-idro/warning-idro.component';

@NgModule({
  declarations: [_PAGES, _COMPONENTS],
    imports: [
        CommonModule,
        CimaCommonsModule,
        ReporterRoutingModule,
        FormsModule
    ],
  exports: [_COMPONENTS],
  providers: [
    TimebarService,
    { provide: APP_CONFIG, useValue: REPORTER_CONFIG },
  ],
})
export class CimaReporterModule {}
