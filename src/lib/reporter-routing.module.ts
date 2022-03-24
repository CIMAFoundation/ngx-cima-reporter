import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { APP_CONFIG } from '@cima/commons';

import { REPORTER_CONFIG } from './reporter.config';

import { ReporterAppContainerComponent } from './components/reporter-app-container/reporter-app-container.component';

import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home' },
  {
    path: '',
    component: ReporterAppContainerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_CONFIG, useValue: REPORTER_CONFIG }],
})
export class ReporterRoutingModule {}
