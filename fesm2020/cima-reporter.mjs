import * as i0 from '@angular/core';
import { Component, Inject, NgModule } from '@angular/core';
import * as i1 from '@angular/material/stepper';
import * as i2 from '@angular/material/form-field';
import * as i1$1 from '@cima/commons';
import { APP_CONFIG, CimaCommonsModule, TimebarService } from '@cima/commons';
import * as i4 from '@angular/material/button';
import * as i5 from '@angular/material/slide-toggle';
import * as i6 from '@angular/material/input';
import * as i7 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as i1$2 from '@angular/router';
import { RouterModule } from '@angular/router';

'@angular/forms';
class HomeComponent {
    constructor() {
        //STEP 1
        this.title = 'Bollettino speditivo di monitoraggio';
        this.text = '<span>Monitoraggio delle precipitazioni</span><br><span>Valutazione delle precipitazioni delle ultime ore</span>';
        this.config = { height: '200px', placeholder: 'Testo...' };
    }
    ngOnInit() {
    }
}
HomeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: HomeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
HomeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: HomeComponent, selector: "cima-home", ngImport: i0, template: "<mat-stepper #stepper [linear]=\"true\">\r\n\r\n  <!--lasciare numero al posto dell'icona-->\r\n  <ng-template matStepperIcon=\"edit\" let-index=\"index\">\r\n    {{index +1}}\r\n  </ng-template>\r\n\r\n  <!--STEP 1-->\r\n  <mat-step>\r\n      <ng-template matStepLabel>Inizializzazione</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n      <div class=\"stepper-content\">\r\n\r\n          <div class=\"row\">\r\n\r\n            <!--titolo-->\r\n            <div class=\"col-12\">\r\n              <mat-form-field appearance=\"fill\" class=\"w-100\">\r\n                <mat-label>Titolo</mat-label>\r\n                <input name=\"title\" [(ngModel)]=\"title\" matInput placeholder=\"Bollettino speditivo di monitoraggio\" required>\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <!--testo-->\r\n            <div class=\"col-12\">\r\n              <cima-text-editor [(text)]=\"text\" [config]=\"config\"></cima-text-editor>\r\n            </div>\r\n\r\n            <!--mappa-->\r\n            <div class=\"col-12 my-2\" >\r\n              <h2 class=\"mb-1 mt-3\">Area Geografica di analisi</h2>\r\n              <div class=\"map-container\">\r\n                <iframe width=\"100%\" height=\"450\"  src=\"https://www.openstreetmap.org/export/embed.html?bbox=-0.3592094779014588%2C37.813520326534004%2C19.789716303348545%2C46.09556117015435&amp;layer=mapnik\" style=\"border: 0px solid black\"></iframe>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n      </div>\r\n      <div class=\"d-flex justify-content-end\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\r\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n\r\n  <!--STEP 2-->\r\n  <mat-step>\r\n    <ng-template matStepLabel>Situazione Pregressa</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n      <div class=\"stepper-content\">\r\n\r\n        <!--abilitazione-->\r\n        <mat-slide-toggle\r\n          class=\"example-margin\"\r\n          color=primary>\r\n          Includi Situazione Pregressa\r\n        </mat-slide-toggle>\r\n\r\n\r\n      </div>\r\n      <div class=\"d-flex justify-content-between\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\r\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\r\n        </button>\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\r\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n\r\n  <!--STEP 3-->\r\n  <mat-step>\r\n    <ng-template matStepLabel>Situazione Attuale</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n      <div class=\"stepper-content\">\r\n        <!--abilitazione-->\r\n        <mat-slide-toggle\r\n          class=\"example-margin\"\r\n          color=primary>\r\n          Includi Situazione Attuale\r\n        </mat-slide-toggle>\r\n      </div>\r\n      <div class=\"d-flex justify-content-between\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\r\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\r\n        </button>\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\r\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n  <!--STEP 4-->\r\n  <mat-step>\r\n    <ng-template matStepLabel>Situazione Prevista</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n      <div class=\"stepper-content\">\r\n        <!--abilitazione-->\r\n        <mat-slide-toggle\r\n          class=\"example-margin\"\r\n          color=primary>\r\n          Includi Situazione Prevista\r\n        </mat-slide-toggle>\r\n      </div>\r\n      <div class=\"d-flex justify-content-between\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\r\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\r\n        </button>\r\n        <button mat-flat-button color=\"primary\" class=\"me-2 bg-success\">\r\n          Genera Report\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n</mat-stepper>\r\n", styles: [".stepper-content-wrapper{padding:1em 0}.stepper-content{padding:1em}.map-container{border-radius:5px;overflow:hidden}:host ::ng-deep .angular-editor-wrapper{background-color:#f5f5f5;border-radius:5px 5px 0 0}:host ::ng-deep .mat-button-wrapper{display:flex;align-items:center}\n"], components: [{ type: i1.MatStepper, selector: "mat-stepper, mat-vertical-stepper, mat-horizontal-stepper, [matStepper]", inputs: ["selectedIndex", "disableRipple", "color", "labelPosition"], outputs: ["animationDone"], exportAs: ["matStepper", "matVerticalStepper", "matHorizontalStepper"] }, { type: i1.MatStep, selector: "mat-step", inputs: ["color"], exportAs: ["matStep"] }, { type: i2.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i1$1.TextEditorComponent, selector: "cima-text-editor", inputs: ["validator", "text", "config"], outputs: ["textChange"] }, { type: i4.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i5.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex", "name", "id", "labelPosition", "aria-label", "aria-labelledby", "aria-describedby", "required", "checked"], outputs: ["change", "toggleChange"], exportAs: ["matSlideToggle"] }], directives: [{ type: i1.MatStepperIcon, selector: "ng-template[matStepperIcon]", inputs: ["matStepperIcon"] }, { type: i1.MatStepLabel, selector: "[matStepLabel]" }, { type: i2.MatLabel, selector: "mat-label" }, { type: i6.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1.MatStepperNext, selector: "button[matStepperNext]", inputs: ["type"] }, { type: i1.MatStepperPrevious, selector: "button[matStepperPrevious]", inputs: ["type"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: HomeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cima-home', template: "<mat-stepper #stepper [linear]=\"true\">\r\n\r\n  <!--lasciare numero al posto dell'icona-->\r\n  <ng-template matStepperIcon=\"edit\" let-index=\"index\">\r\n    {{index +1}}\r\n  </ng-template>\r\n\r\n  <!--STEP 1-->\r\n  <mat-step>\r\n      <ng-template matStepLabel>Inizializzazione</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n      <div class=\"stepper-content\">\r\n\r\n          <div class=\"row\">\r\n\r\n            <!--titolo-->\r\n            <div class=\"col-12\">\r\n              <mat-form-field appearance=\"fill\" class=\"w-100\">\r\n                <mat-label>Titolo</mat-label>\r\n                <input name=\"title\" [(ngModel)]=\"title\" matInput placeholder=\"Bollettino speditivo di monitoraggio\" required>\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <!--testo-->\r\n            <div class=\"col-12\">\r\n              <cima-text-editor [(text)]=\"text\" [config]=\"config\"></cima-text-editor>\r\n            </div>\r\n\r\n            <!--mappa-->\r\n            <div class=\"col-12 my-2\" >\r\n              <h2 class=\"mb-1 mt-3\">Area Geografica di analisi</h2>\r\n              <div class=\"map-container\">\r\n                <iframe width=\"100%\" height=\"450\"  src=\"https://www.openstreetmap.org/export/embed.html?bbox=-0.3592094779014588%2C37.813520326534004%2C19.789716303348545%2C46.09556117015435&amp;layer=mapnik\" style=\"border: 0px solid black\"></iframe>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n      </div>\r\n      <div class=\"d-flex justify-content-end\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\r\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n\r\n  <!--STEP 2-->\r\n  <mat-step>\r\n    <ng-template matStepLabel>Situazione Pregressa</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n      <div class=\"stepper-content\">\r\n\r\n        <!--abilitazione-->\r\n        <mat-slide-toggle\r\n          class=\"example-margin\"\r\n          color=primary>\r\n          Includi Situazione Pregressa\r\n        </mat-slide-toggle>\r\n\r\n\r\n      </div>\r\n      <div class=\"d-flex justify-content-between\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\r\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\r\n        </button>\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\r\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n\r\n  <!--STEP 3-->\r\n  <mat-step>\r\n    <ng-template matStepLabel>Situazione Attuale</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n      <div class=\"stepper-content\">\r\n        <!--abilitazione-->\r\n        <mat-slide-toggle\r\n          class=\"example-margin\"\r\n          color=primary>\r\n          Includi Situazione Attuale\r\n        </mat-slide-toggle>\r\n      </div>\r\n      <div class=\"d-flex justify-content-between\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\r\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\r\n        </button>\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\r\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n  <!--STEP 4-->\r\n  <mat-step>\r\n    <ng-template matStepLabel>Situazione Prevista</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n      <div class=\"stepper-content\">\r\n        <!--abilitazione-->\r\n        <mat-slide-toggle\r\n          class=\"example-margin\"\r\n          color=primary>\r\n          Includi Situazione Prevista\r\n        </mat-slide-toggle>\r\n      </div>\r\n      <div class=\"d-flex justify-content-between\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\r\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\r\n        </button>\r\n        <button mat-flat-button color=\"primary\" class=\"me-2 bg-success\">\r\n          Genera Report\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n</mat-stepper>\r\n", styles: [".stepper-content-wrapper{padding:1em 0}.stepper-content{padding:1em}.map-container{border-radius:5px;overflow:hidden}:host ::ng-deep .angular-editor-wrapper{background-color:#f5f5f5;border-radius:5px 5px 0 0}:host ::ng-deep .mat-button-wrapper{display:flex;align-items:center}\n"] }]
        }], ctorParameters: function () { return []; } });

class ReporterAppContainerComponent {
    constructor(config, faviconService, portalService) {
        this.config = config;
        this.faviconService = faviconService;
        this.portalService = portalService;
    }
    ngAfterViewInit() {
        this.faviconService.setAppFavicon(this.config.name);
        this.portalService.setTitle(this.config.description);
    }
}
ReporterAppContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ReporterAppContainerComponent, deps: [{ token: APP_CONFIG }, { token: i1$1.FaviconService }, { token: i1$1.PortalService }], target: i0.ɵɵFactoryTarget.Component });
ReporterAppContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: ReporterAppContainerComponent, selector: "reporter-app-container", ngImport: i0, template: "<cima-app-container mode=\"side\" [sidenavOpened]=\"false\"> <!--TODO ELIMINARE SIDENAV - ORA E' NASCOSTA-->\r\n<!--  <ng-container app-menu>\r\n    <a [routerLink]=\"['/', 'reporter']\">Home</a>\r\n  </ng-container>-->\r\n\r\n  <ng-container app-buttons>\r\n    <button mat-flat-button color=\"\" class=\"bg-warning\"><span class=\"fas fa-redo-alt me-2\"></span>Reset Report</button>\r\n    <button mat-flat-button color=\"primary\" class=\"bg-success\"><span class=\"fas fa-paper-plane me-2\"></span>Genera Report</button>\r\n  </ng-container>\r\n\r\n<!--  <app-sidenav-tab icon=\"list\" i18-label label=\"Tab Label\">\r\n    Contenuto Sidebar\r\n  </app-sidenav-tab>-->\r\n\r\n</cima-app-container>\r\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}:host{flex:1}:host ::ng-deep .mat-toolbar{border-bottom:solid 1px var(--border-color, #edeae9)}:host ::ng-deep .app-content{background-color:#fff!important;color:#1c1c1c!important}:host ::ng-deep .mat-tab-group.app-sidenav-tabber{background:white!important}:host ::ng-deep .mat-drawer-side.mat-drawer-end{border-color:var(--border-color, #edeae9)!important;box-shadow:5px 5px 15px 5px #0000001a}:host ::ng-deep .h-divider{border:0;border-bottom:1px solid var(--border-color, #edeae9);margin:5px 0}\n"], components: [{ type: i1$1.AppContainerComponent, selector: "cima-app-container", inputs: ["mode", "hasBackdrop", "sidenavOpened", "sidenavWidth"] }, { type: i4.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ReporterAppContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-app-container', template: "<cima-app-container mode=\"side\" [sidenavOpened]=\"false\"> <!--TODO ELIMINARE SIDENAV - ORA E' NASCOSTA-->\r\n<!--  <ng-container app-menu>\r\n    <a [routerLink]=\"['/', 'reporter']\">Home</a>\r\n  </ng-container>-->\r\n\r\n  <ng-container app-buttons>\r\n    <button mat-flat-button color=\"\" class=\"bg-warning\"><span class=\"fas fa-redo-alt me-2\"></span>Reset Report</button>\r\n    <button mat-flat-button color=\"primary\" class=\"bg-success\"><span class=\"fas fa-paper-plane me-2\"></span>Genera Report</button>\r\n  </ng-container>\r\n\r\n<!--  <app-sidenav-tab icon=\"list\" i18-label label=\"Tab Label\">\r\n    Contenuto Sidebar\r\n  </app-sidenav-tab>-->\r\n\r\n</cima-app-container>\r\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}:host{flex:1}:host ::ng-deep .mat-toolbar{border-bottom:solid 1px var(--border-color, #edeae9)}:host ::ng-deep .app-content{background-color:#fff!important;color:#1c1c1c!important}:host ::ng-deep .mat-tab-group.app-sidenav-tabber{background:white!important}:host ::ng-deep .mat-drawer-side.mat-drawer-end{border-color:var(--border-color, #edeae9)!important;box-shadow:5px 5px 15px 5px #0000001a}:host ::ng-deep .h-divider{border:0;border-bottom:1px solid var(--border-color, #edeae9);margin:5px 0}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_CONFIG]
                }] }, { type: i1$1.FaviconService }, { type: i1$1.PortalService }]; } });

const REPORTER_CONFIG = {
    name: 'reporter',
    description: 'Reporter',
    version: "0.0.1",
};

const routes = [
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
class ReporterRoutingModule {
}
ReporterRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ReporterRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReporterRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ReporterRoutingModule, imports: [i1$2.RouterModule], exports: [RouterModule] });
ReporterRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ReporterRoutingModule, providers: [{ provide: APP_CONFIG, useValue: REPORTER_CONFIG }], imports: [[RouterModule.forChild(routes)], RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ReporterRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule],
                    providers: [{ provide: APP_CONFIG, useValue: REPORTER_CONFIG }],
                }]
        }] });

const _PAGES = [HomeComponent];
const _COMPONENTS = [ReporterAppContainerComponent];
class CimaReporterModule {
}
CimaReporterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CimaReporterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CimaReporterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CimaReporterModule, declarations: [HomeComponent, ReporterAppContainerComponent], imports: [CommonModule,
        CimaCommonsModule,
        ReporterRoutingModule,
        FormsModule], exports: [ReporterAppContainerComponent] });
CimaReporterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CimaReporterModule, providers: [
        TimebarService,
        { provide: APP_CONFIG, useValue: REPORTER_CONFIG },
    ], imports: [[
            CommonModule,
            CimaCommonsModule,
            ReporterRoutingModule,
            FormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CimaReporterModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });

/*
 * Public API Surface of reporter
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CimaReporterModule, HomeComponent, REPORTER_CONFIG, ReporterAppContainerComponent };
//# sourceMappingURL=cima-reporter.mjs.map
