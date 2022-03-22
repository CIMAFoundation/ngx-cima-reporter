import * as i0 from '@angular/core';
import { Component, Injectable, Inject, NgModule } from '@angular/core';
import * as i1$1 from '@angular/material/stepper';
import * as i3 from '@angular/material/form-field';
import * as i1 from '@cima/commons';
import { APP_CONFIG, CimaCommonsModule, TimebarService } from '@cima/commons';
import * as i3$1 from '@angular/material/input';
import * as i4 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i9 from '@angular/material/button';
import * as i2 from '@angular/material/slide-toggle';
import * as i4$1 from '@angular/material/datepicker';
import * as i11 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i7 from '@angular/material/select';
import * as i8 from '@angular/material/core';
import * as i1$2 from '@angular/router';
import { RouterModule } from '@angular/router';

class InitializationComponent {
    constructor() {
        this.title = 'Bollettino speditivo di monitoraggio';
        this.text = '<span>Monitoraggio delle precipitazioni</span><br><span>Valutazione delle precipitazioni delle ultime ore</span>';
        this.config = { height: '200px', placeholder: 'Testo...' };
    }
    ngOnInit() {
    }
}
InitializationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: InitializationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
InitializationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: InitializationComponent, selector: "reporter-initialization", ngImport: i0, template: "<div class=\"row\">\n\n  <!--titolo-->\n  <div class=\"col-12\">\n    <mat-form-field appearance=\"fill\" class=\"w-100\">\n      <mat-label>Titolo</mat-label>\n      <input name=\"title\" [(ngModel)]=\"title\" matInput placeholder=\"Bollettino speditivo di monitoraggio\" required>\n    </mat-form-field>\n  </div>\n\n  <!--testo-->\n  <div class=\"col-12\">\n    <cima-text-editor [(text)]=\"text\" [config]=\"config\"></cima-text-editor>\n  </div>\n\n  <!--mappa-->\n  <div class=\"col-12 my-2\" >\n    <h2 class=\"mb-1 mt-3\">Area Geografica di analisi</h2>\n    <div class=\"map-container\">\n      <iframe width=\"100%\" height=\"450\"  src=\"https://www.openstreetmap.org/export/embed.html?bbox=-0.3592094779014588%2C37.813520326534004%2C19.789716303348545%2C46.09556117015435&amp;layer=mapnik\" style=\"border: 0px solid black\"></iframe>\n    </div>\n  </div>\n\n</div>\n", styles: [""], components: [{ type: i3.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i1.TextEditorComponent, selector: "cima-text-editor", inputs: ["validator", "text", "config"], outputs: ["textChange"] }], directives: [{ type: i3.MatLabel, selector: "mat-label" }, { type: i3$1.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: InitializationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-initialization', template: "<div class=\"row\">\n\n  <!--titolo-->\n  <div class=\"col-12\">\n    <mat-form-field appearance=\"fill\" class=\"w-100\">\n      <mat-label>Titolo</mat-label>\n      <input name=\"title\" [(ngModel)]=\"title\" matInput placeholder=\"Bollettino speditivo di monitoraggio\" required>\n    </mat-form-field>\n  </div>\n\n  <!--testo-->\n  <div class=\"col-12\">\n    <cima-text-editor [(text)]=\"text\" [config]=\"config\"></cima-text-editor>\n  </div>\n\n  <!--mappa-->\n  <div class=\"col-12 my-2\" >\n    <h2 class=\"mb-1 mt-3\">Area Geografica di analisi</h2>\n    <div class=\"map-container\">\n      <iframe width=\"100%\" height=\"450\"  src=\"https://www.openstreetmap.org/export/embed.html?bbox=-0.3592094779014588%2C37.813520326534004%2C19.789716303348545%2C46.09556117015435&amp;layer=mapnik\" style=\"border: 0px solid black\"></iframe>\n    </div>\n  </div>\n\n</div>\n", styles: [""] }]
        }], ctorParameters: function () { return []; } });

class FakeDataService {
    constructor() {
        this.cumulata = [
            {
                id: 1,
                value: '1 Ora'
            },
            {
                id: 2,
                value: '3 Ore'
            },
            {
                id: 3,
                value: '6 Ore'
            },
            {
                id: 4,
                value: '12 Ore'
            },
            {
                id: 5,
                value: '24 Ore'
            },
            {
                id: 6,
                value: '36 Ore'
            },
            {
                id: 7,
                value: '48 Ore'
            },
            {
                id: 8,
                value: '72 Ore'
            },
            {
                id: 10,
                value: 'Time Range'
            }
        ];
        this.aggWarning = [
            {
                id: 1,
                value: 'Regione'
            },
            {
                id: 1,
                value: 'Provincie'
            },
            {
                id: 1,
                value: 'Comuni'
            },
            {
                id: 1,
                value: 'Bacini'
            },
            {
                id: 1,
                value: 'Allertamento'
            },
        ];
        this.uploadedFiles = [
            {
                id: 0,
                title: 'Nome File Caricato',
                imgUrl: 'https://picsum.photos/200/300'
            }
        ];
    }
}
FakeDataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: FakeDataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FakeDataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: FakeDataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: FakeDataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class PrintLayoutComponent {
    constructor() {
        this.layoutSelected = 1;
    }
    ngOnInit() {
    }
}
PrintLayoutComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PrintLayoutComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PrintLayoutComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: PrintLayoutComponent, selector: "reporter-print-layout", ngImport: i0, template: "<h2 class=\"mb-1 mt-3\">Layout di Stampa</h2>\n<div class=\"d-flex\">\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 1? 'selected':''\"\n       (click)=\"layoutSelected=1\">\n    <img class=\"img-layout\" src=\"assets/img/1img.png\">\n    <span class=\"my-1\">1 Immagine</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 2? 'selected':''\"\n       (click)=\"layoutSelected=2\">\n    <img class=\"img-layout\" src=\"assets/img/2img.png\">\n    <span class=\"my-1\">2 Immagini</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 3? 'selected':''\"\n       (click)=\"layoutSelected=3\">\n    <img class=\"img-layout\" src=\"assets/img/4img.png\">\n    <span class=\"my-1\">4 Immagini</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n</div>\n\n", styles: [".layout-wrapper .img-layout{height:140px;cursor:pointer}.layout-wrapper .selection-bullet{width:10px;height:10px;border-radius:50%;background-color:#d3d3d3}.layout-wrapper.selected .selection-bullet{background-color:#007dfc}.layout-wrapper:hover .selection-bullet{outline:3px solid rgba(211,211,211,.6)}\n"], directives: [{ type: i11.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PrintLayoutComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-print-layout', template: "<h2 class=\"mb-1 mt-3\">Layout di Stampa</h2>\n<div class=\"d-flex\">\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 1? 'selected':''\"\n       (click)=\"layoutSelected=1\">\n    <img class=\"img-layout\" src=\"assets/img/1img.png\">\n    <span class=\"my-1\">1 Immagine</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 2? 'selected':''\"\n       (click)=\"layoutSelected=2\">\n    <img class=\"img-layout\" src=\"assets/img/2img.png\">\n    <span class=\"my-1\">2 Immagini</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 3? 'selected':''\"\n       (click)=\"layoutSelected=3\">\n    <img class=\"img-layout\" src=\"assets/img/4img.png\">\n    <span class=\"my-1\">4 Immagini</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n</div>\n\n", styles: [".layout-wrapper .img-layout{height:140px;cursor:pointer}.layout-wrapper .selection-bullet{width:10px;height:10px;border-radius:50%;background-color:#d3d3d3}.layout-wrapper.selected .selection-bullet{background-color:#007dfc}.layout-wrapper:hover .selection-bullet{outline:3px solid rgba(211,211,211,.6)}\n"] }]
        }], ctorParameters: function () { return []; } });

class PrevSituationComponent {
    constructor(fakeData) {
        this.fakeData = fakeData;
        this.sectionEnabled = false;
        this.textPrev = '<span>Testo</span>';
        this.config = { height: '200px', placeholder: 'Testo...' };
        /*RAINMAPS*/
        this.rainMaps = [
            {
                id: 0,
                timeRange: ''
            }
        ];
        /*WARNINGPLUVIO*/
        this.warningsPluvio = [
            {
                id: 0,
                aggregazione: ''
            }
        ];
        /*WARNINGIDRO*/
        this.warningsIdro = [
            {
                id: 0,
                aggregazione: ''
            }
        ];
    }
    addRainMaps() {
        this.rainMaps = [...this.rainMaps, { id: 1, timeRange: '' }];
    }
    delRainMaps(item) {
        this.rainMaps = this.rainMaps.filter((x) => x != item);
    }
    addWarningPluvio() {
        this.warningsPluvio = [...this.warningsPluvio, { id: 1, aggregazione: '' }];
    }
    delWarningPluvio(item) {
        this.warningsPluvio = this.warningsPluvio.filter((x) => x != item);
    }
    addWarningIdro() {
        this.warningsIdro = [...this.warningsIdro, { id: 1, aggregazione: '' }];
    }
    delWarningIdro(item) {
        this.warningsIdro = this.warningsIdro.filter((x) => x != item);
    }
    /*UPLOAD FILES*/
    delFile(file) {
        this.fakeData.uploadedFiles = this.fakeData.uploadedFiles.filter((x) => x != file);
    }
    ngOnInit() {
    }
}
PrevSituationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PrevSituationComponent, deps: [{ token: FakeDataService }], target: i0.ɵɵFactoryTarget.Component });
PrevSituationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: PrevSituationComponent, selector: "reporter-prev-situation", ngImport: i0, template: "<!--abilitazione-->\n<mat-slide-toggle\n  class=\"example-margin\"\n  color=primary [(ngModel)]=\"sectionEnabled\">\n  Includi Situazione Pregressa\n</mat-slide-toggle>\n\n\n<div class=\"section-wrapper\" [ngClass]=\"!sectionEnabled?'section-disabled':''\">\n  <!--mappa-->\n  <div class=\"col-12 my-2\" >\n    <!--periodo di analisi-->\n    <h2 class=\"mb-1 mt-3\">Periodo di Analisi</h2>\n    <mat-form-field appearance=\"fill\">\n      <mat-label>Enter a date range</mat-label>\n      <mat-date-range-input [rangePicker]=\"picker\">\n        <input matStartDate formControlName=\"start\" placeholder=\"Start date\">\n        <input matEndDate formControlName=\"end\" placeholder=\"End date\">\n      </mat-date-range-input>\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n      <mat-date-range-picker #picker></mat-date-range-picker>\n    </mat-form-field>\n  </div>\n\n  <!--testo situazione pregressa-->\n  <div class=\"col-12 my-2\">\n    <cima-text-editor [(text)]=\"textPrev\" [config]=\"config\"></cima-text-editor>\n  </div>\n\n  <!--layout stampa-->\n  <div class=\"col-12 my-2\">\n    <reporter-print-layout></reporter-print-layout>\n  </div>\n\n  <!--layer-->\n  <div class=\"col-12 my-2\">\n    <h2 class=\"mb-1 mt-3\">Layers</h2>\n    <div class=\"row\">\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Mappe di Pioggia</h3>\n\n          <div class=\"rainMap\" *ngFor=\"let map of rainMaps, let i = index\">\n\n            <div class=\"item-list-big-bull\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Cumulata</mat-label>\n              <mat-select>\n                <mat-option *ngFor=\"let cumulata of fakeData.cumulata\" [value]=\"cumulata.value\">\n                  {{cumulata.value}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delRainMaps(map)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addRainMaps()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Mappa</button>\n\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Warnings Pluviometrici</h3>\n\n          <div class=\"warningPluvio\" *ngFor=\"let warning of warningsPluvio, let i = index\">\n\n            <div class=\"item-list-big-bull\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Aggregazione</mat-label>\n              <mat-select>\n                <mat-option *ngFor=\"let aggregazione of fakeData.aggWarning\" [value]=\"aggregazione.value\">\n                  {{aggregazione.value}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delWarningPluvio(warning)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addWarningPluvio()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Warning Pluvio</button>\n\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Warnings Idrometrici</h3>\n\n          <div class=\"warningPluvio\" *ngFor=\"let warning of warningsIdro, let i = index\">\n\n            <div class=\"item-list-big-bull\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Aggregazione</mat-label>\n              <mat-select>\n                <mat-option *ngFor=\"let aggregazione of fakeData.aggWarning\" [value]=\"aggregazione.value\">\n                  {{aggregazione.value}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delWarningIdro(warning)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addWarningIdro()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Warning Idro</button>\n\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Immagini</h3>\n          <!--file uploaded-->\n          <div class=\"file-wrapper uploaded\" *ngFor=\"let file of fakeData.uploadedFiles\">\n            <div class=\"preview\" [style.background-image]=\"'url('+ file.imgUrl +')'\"></div>\n            <div class=\"title\">\n              <a [href]=\"file.imgUrl\" target=\"_blank\">{{file.title}}</a>\n              <span class=\"del-btn ms-2 fas fa-trash-alt\" (click)=\"delFile(file)\"></span>\n            </div>\n          </div>\n\n          <!--upload-->\n          <div class=\"file-wrapper upload\">\n            <input type=\"file\">\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n\n\n", styles: [".section-disabled{opacity:.3;pointer-events:none}.col-wrapper{background-color:#f5f5f5;border-radius:4px}.rainMap,.warningPluvio,.warningIdro{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}.file-wrapper{width:100%;height:48px;border-radius:8px;margin-bottom:1.34375em}.file-wrapper.upload{border:dashed 2px #9e9e9e;display:flex;align-items:center;justify-content:center}.file-wrapper.uploaded{background-color:#fff;display:flex;align-items:center;overflow:hidden;height:52px}.file-wrapper.uploaded .preview{width:60px;background-color:#4d92eb;background-size:cover;height:100%}.file-wrapper.uploaded .title{padding:0 8px}.file-wrapper.uploaded .title .del-btn{cursor:pointer;color:gray}.file-wrapper.uploaded .title .del-btn:hover{color:#2f4f4f}:host ::ng-deep .mat-form-field-infix{width:auto!important}\n"], components: [{ type: i2.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex", "name", "id", "labelPosition", "aria-label", "aria-labelledby", "aria-describedby", "required", "checked"], outputs: ["change", "toggleChange"], exportAs: ["matSlideToggle"] }, { type: i3.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i4$1.MatDateRangeInput, selector: "mat-date-range-input", inputs: ["rangePicker", "required", "dateFilter", "min", "max", "disabled", "separator", "comparisonStart", "comparisonEnd"], exportAs: ["matDateRangeInput"] }, { type: i4$1.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { type: i4$1.MatDateRangePicker, selector: "mat-date-range-picker", exportAs: ["matDateRangePicker"] }, { type: i1.TextEditorComponent, selector: "cima-text-editor", inputs: ["validator", "text", "config"], outputs: ["textChange"] }, { type: PrintLayoutComponent, selector: "reporter-print-layout" }, { type: i7.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i8.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i9.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i11.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.MatLabel, selector: "mat-label" }, { type: i4$1.MatStartDate, selector: "input[matStartDate]", inputs: ["errorStateMatcher"], outputs: ["dateChange", "dateInput"] }, { type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i4.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i4$1.MatEndDate, selector: "input[matEndDate]", inputs: ["errorStateMatcher"], outputs: ["dateChange", "dateInput"] }, { type: i3.MatSuffix, selector: "[matSuffix]" }, { type: i11.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i11.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PrevSituationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-prev-situation', template: "<!--abilitazione-->\n<mat-slide-toggle\n  class=\"example-margin\"\n  color=primary [(ngModel)]=\"sectionEnabled\">\n  Includi Situazione Pregressa\n</mat-slide-toggle>\n\n\n<div class=\"section-wrapper\" [ngClass]=\"!sectionEnabled?'section-disabled':''\">\n  <!--mappa-->\n  <div class=\"col-12 my-2\" >\n    <!--periodo di analisi-->\n    <h2 class=\"mb-1 mt-3\">Periodo di Analisi</h2>\n    <mat-form-field appearance=\"fill\">\n      <mat-label>Enter a date range</mat-label>\n      <mat-date-range-input [rangePicker]=\"picker\">\n        <input matStartDate formControlName=\"start\" placeholder=\"Start date\">\n        <input matEndDate formControlName=\"end\" placeholder=\"End date\">\n      </mat-date-range-input>\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n      <mat-date-range-picker #picker></mat-date-range-picker>\n    </mat-form-field>\n  </div>\n\n  <!--testo situazione pregressa-->\n  <div class=\"col-12 my-2\">\n    <cima-text-editor [(text)]=\"textPrev\" [config]=\"config\"></cima-text-editor>\n  </div>\n\n  <!--layout stampa-->\n  <div class=\"col-12 my-2\">\n    <reporter-print-layout></reporter-print-layout>\n  </div>\n\n  <!--layer-->\n  <div class=\"col-12 my-2\">\n    <h2 class=\"mb-1 mt-3\">Layers</h2>\n    <div class=\"row\">\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Mappe di Pioggia</h3>\n\n          <div class=\"rainMap\" *ngFor=\"let map of rainMaps, let i = index\">\n\n            <div class=\"item-list-big-bull\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Cumulata</mat-label>\n              <mat-select>\n                <mat-option *ngFor=\"let cumulata of fakeData.cumulata\" [value]=\"cumulata.value\">\n                  {{cumulata.value}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delRainMaps(map)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addRainMaps()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Mappa</button>\n\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Warnings Pluviometrici</h3>\n\n          <div class=\"warningPluvio\" *ngFor=\"let warning of warningsPluvio, let i = index\">\n\n            <div class=\"item-list-big-bull\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Aggregazione</mat-label>\n              <mat-select>\n                <mat-option *ngFor=\"let aggregazione of fakeData.aggWarning\" [value]=\"aggregazione.value\">\n                  {{aggregazione.value}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delWarningPluvio(warning)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addWarningPluvio()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Warning Pluvio</button>\n\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Warnings Idrometrici</h3>\n\n          <div class=\"warningPluvio\" *ngFor=\"let warning of warningsIdro, let i = index\">\n\n            <div class=\"item-list-big-bull\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Aggregazione</mat-label>\n              <mat-select>\n                <mat-option *ngFor=\"let aggregazione of fakeData.aggWarning\" [value]=\"aggregazione.value\">\n                  {{aggregazione.value}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delWarningIdro(warning)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addWarningIdro()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Warning Idro</button>\n\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Immagini</h3>\n          <!--file uploaded-->\n          <div class=\"file-wrapper uploaded\" *ngFor=\"let file of fakeData.uploadedFiles\">\n            <div class=\"preview\" [style.background-image]=\"'url('+ file.imgUrl +')'\"></div>\n            <div class=\"title\">\n              <a [href]=\"file.imgUrl\" target=\"_blank\">{{file.title}}</a>\n              <span class=\"del-btn ms-2 fas fa-trash-alt\" (click)=\"delFile(file)\"></span>\n            </div>\n          </div>\n\n          <!--upload-->\n          <div class=\"file-wrapper upload\">\n            <input type=\"file\">\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n\n\n", styles: [".section-disabled{opacity:.3;pointer-events:none}.col-wrapper{background-color:#f5f5f5;border-radius:4px}.rainMap,.warningPluvio,.warningIdro{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}.file-wrapper{width:100%;height:48px;border-radius:8px;margin-bottom:1.34375em}.file-wrapper.upload{border:dashed 2px #9e9e9e;display:flex;align-items:center;justify-content:center}.file-wrapper.uploaded{background-color:#fff;display:flex;align-items:center;overflow:hidden;height:52px}.file-wrapper.uploaded .preview{width:60px;background-color:#4d92eb;background-size:cover;height:100%}.file-wrapper.uploaded .title{padding:0 8px}.file-wrapper.uploaded .title .del-btn{cursor:pointer;color:gray}.file-wrapper.uploaded .title .del-btn:hover{color:#2f4f4f}:host ::ng-deep .mat-form-field-infix{width:auto!important}\n"] }]
        }], ctorParameters: function () { return [{ type: FakeDataService }]; } });

'@angular/forms';
class HomeComponent {
    constructor() { }
    ngOnInit() {
    }
}
HomeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: HomeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
HomeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: HomeComponent, selector: "cima-home", ngImport: i0, template: "<mat-stepper #stepper [linear]=\"true\">\r\n\r\n  <!--lasciare numero al posto dell'icona-->\r\n  <ng-template matStepperIcon=\"edit\" let-index=\"index\">\r\n    {{index +1}}\r\n  </ng-template>\r\n\r\n  <!--STEP 1-->\r\n  <mat-step>\r\n      <ng-template matStepLabel>Inizializzazione</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n\r\n      <div class=\"stepper-content\">\r\n        <reporter-initialization></reporter-initialization>\r\n      </div>\r\n\r\n      <div class=\"d-flex justify-content-end\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\r\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\r\n        </button>\r\n      </div>\r\n\r\n    </div>\r\n  </mat-step>\r\n\r\n\r\n  <!--STEP 2-->\r\n  <mat-step>\r\n    <ng-template matStepLabel>Situazione Pregressa</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n\r\n      <div class=\"stepper-content\">\r\n        <reporter-prev-situation></reporter-prev-situation>\r\n      </div>\r\n\r\n      <div class=\"d-flex justify-content-between\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\r\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\r\n        </button>\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\r\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n\r\n  <!--STEP 3-->\r\n  <mat-step>\r\n    <ng-template matStepLabel>Situazione Attuale</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n      <div class=\"stepper-content\">\r\n        <!--abilitazione-->\r\n        <mat-slide-toggle\r\n          class=\"example-margin\"\r\n          color=primary>\r\n          Includi Situazione Attuale\r\n        </mat-slide-toggle>\r\n      </div>\r\n      <div class=\"d-flex justify-content-between\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\r\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\r\n        </button>\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\r\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n  <!--STEP 4-->\r\n  <mat-step>\r\n    <ng-template matStepLabel>Situazione Prevista</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n      <div class=\"stepper-content\">\r\n        <!--abilitazione-->\r\n        <mat-slide-toggle\r\n          class=\"example-margin\"\r\n          color=primary>\r\n          Includi Situazione Prevista\r\n        </mat-slide-toggle>\r\n      </div>\r\n      <div class=\"d-flex justify-content-between\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\r\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\r\n        </button>\r\n        <button mat-flat-button color=\"primary\" class=\"me-2 bg-success\">\r\n          Genera Report\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n</mat-stepper>\r\n", styles: [".stepper-content-wrapper{padding:1em 0}.stepper-content{padding:1em}.map-container{border-radius:5px;overflow:hidden}:host ::ng-deep .angular-editor-wrapper{background-color:#f5f5f5;border-radius:5px 5px 0 0}:host ::ng-deep .mat-button-wrapper{display:flex;align-items:center}\n"], components: [{ type: i1$1.MatStepper, selector: "mat-stepper, mat-vertical-stepper, mat-horizontal-stepper, [matStepper]", inputs: ["selectedIndex", "disableRipple", "color", "labelPosition"], outputs: ["animationDone"], exportAs: ["matStepper", "matVerticalStepper", "matHorizontalStepper"] }, { type: i1$1.MatStep, selector: "mat-step", inputs: ["color"], exportAs: ["matStep"] }, { type: InitializationComponent, selector: "reporter-initialization" }, { type: i9.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: PrevSituationComponent, selector: "reporter-prev-situation" }, { type: i2.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex", "name", "id", "labelPosition", "aria-label", "aria-labelledby", "aria-describedby", "required", "checked"], outputs: ["change", "toggleChange"], exportAs: ["matSlideToggle"] }], directives: [{ type: i1$1.MatStepperIcon, selector: "ng-template[matStepperIcon]", inputs: ["matStepperIcon"] }, { type: i1$1.MatStepLabel, selector: "[matStepLabel]" }, { type: i1$1.MatStepperNext, selector: "button[matStepperNext]", inputs: ["type"] }, { type: i1$1.MatStepperPrevious, selector: "button[matStepperPrevious]", inputs: ["type"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: HomeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cima-home', template: "<mat-stepper #stepper [linear]=\"true\">\r\n\r\n  <!--lasciare numero al posto dell'icona-->\r\n  <ng-template matStepperIcon=\"edit\" let-index=\"index\">\r\n    {{index +1}}\r\n  </ng-template>\r\n\r\n  <!--STEP 1-->\r\n  <mat-step>\r\n      <ng-template matStepLabel>Inizializzazione</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n\r\n      <div class=\"stepper-content\">\r\n        <reporter-initialization></reporter-initialization>\r\n      </div>\r\n\r\n      <div class=\"d-flex justify-content-end\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\r\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\r\n        </button>\r\n      </div>\r\n\r\n    </div>\r\n  </mat-step>\r\n\r\n\r\n  <!--STEP 2-->\r\n  <mat-step>\r\n    <ng-template matStepLabel>Situazione Pregressa</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n\r\n      <div class=\"stepper-content\">\r\n        <reporter-prev-situation></reporter-prev-situation>\r\n      </div>\r\n\r\n      <div class=\"d-flex justify-content-between\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\r\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\r\n        </button>\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\r\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n\r\n  <!--STEP 3-->\r\n  <mat-step>\r\n    <ng-template matStepLabel>Situazione Attuale</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n      <div class=\"stepper-content\">\r\n        <!--abilitazione-->\r\n        <mat-slide-toggle\r\n          class=\"example-margin\"\r\n          color=primary>\r\n          Includi Situazione Attuale\r\n        </mat-slide-toggle>\r\n      </div>\r\n      <div class=\"d-flex justify-content-between\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\r\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\r\n        </button>\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\r\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n  <!--STEP 4-->\r\n  <mat-step>\r\n    <ng-template matStepLabel>Situazione Prevista</ng-template>\r\n    <div class=\"stepper-content-wrapper\">\r\n      <div class=\"stepper-content\">\r\n        <!--abilitazione-->\r\n        <mat-slide-toggle\r\n          class=\"example-margin\"\r\n          color=primary>\r\n          Includi Situazione Prevista\r\n        </mat-slide-toggle>\r\n      </div>\r\n      <div class=\"d-flex justify-content-between\">\r\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\r\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\r\n        </button>\r\n        <button mat-flat-button color=\"primary\" class=\"me-2 bg-success\">\r\n          Genera Report\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-step>\r\n\r\n</mat-stepper>\r\n", styles: [".stepper-content-wrapper{padding:1em 0}.stepper-content{padding:1em}.map-container{border-radius:5px;overflow:hidden}:host ::ng-deep .angular-editor-wrapper{background-color:#f5f5f5;border-radius:5px 5px 0 0}:host ::ng-deep .mat-button-wrapper{display:flex;align-items:center}\n"] }]
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
ReporterAppContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ReporterAppContainerComponent, deps: [{ token: APP_CONFIG }, { token: i1.FaviconService }, { token: i1.PortalService }], target: i0.ɵɵFactoryTarget.Component });
ReporterAppContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: ReporterAppContainerComponent, selector: "reporter-app-container", ngImport: i0, template: "<cima-app-container mode=\"side\" [sidenavOpened]=\"false\"> <!--TODO ELIMINARE SIDENAV - ORA E' NASCOSTA-->\r\n<!--  <ng-container app-menu>\r\n    <a [routerLink]=\"['/', 'reporter']\">Home</a>\r\n  </ng-container>-->\r\n\r\n  <ng-container app-buttons>\r\n    <button mat-flat-button color=\"\" class=\"bg-warning\"><span class=\"fas fa-redo-alt me-2\"></span>Reset Report</button>\r\n    <button mat-flat-button color=\"primary\" class=\"bg-success\"><span class=\"fas fa-paper-plane me-2\"></span>Genera Report</button>\r\n  </ng-container>\r\n\r\n<!--  <app-sidenav-tab icon=\"list\" i18-label label=\"Tab Label\">\r\n    Contenuto Sidebar\r\n  </app-sidenav-tab>-->\r\n\r\n</cima-app-container>\r\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}:host{flex:1}:host ::ng-deep .mat-toolbar{border-bottom:solid 1px var(--border-color, #edeae9)}:host ::ng-deep .app-content{background-color:#fff!important;color:#1c1c1c!important}:host ::ng-deep .mat-tab-group.app-sidenav-tabber{background:white!important}:host ::ng-deep .mat-drawer-side.mat-drawer-end{border-color:var(--border-color, #edeae9)!important;box-shadow:5px 5px 15px 5px #0000001a}:host ::ng-deep .h-divider{border:0;border-bottom:1px solid var(--border-color, #edeae9);margin:5px 0}\n"], components: [{ type: i1.AppContainerComponent, selector: "cima-app-container", inputs: ["mode", "hasBackdrop", "sidenavOpened", "sidenavWidth"] }, { type: i9.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ReporterAppContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-app-container', template: "<cima-app-container mode=\"side\" [sidenavOpened]=\"false\"> <!--TODO ELIMINARE SIDENAV - ORA E' NASCOSTA-->\r\n<!--  <ng-container app-menu>\r\n    <a [routerLink]=\"['/', 'reporter']\">Home</a>\r\n  </ng-container>-->\r\n\r\n  <ng-container app-buttons>\r\n    <button mat-flat-button color=\"\" class=\"bg-warning\"><span class=\"fas fa-redo-alt me-2\"></span>Reset Report</button>\r\n    <button mat-flat-button color=\"primary\" class=\"bg-success\"><span class=\"fas fa-paper-plane me-2\"></span>Genera Report</button>\r\n  </ng-container>\r\n\r\n<!--  <app-sidenav-tab icon=\"list\" i18-label label=\"Tab Label\">\r\n    Contenuto Sidebar\r\n  </app-sidenav-tab>-->\r\n\r\n</cima-app-container>\r\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}:host{flex:1}:host ::ng-deep .mat-toolbar{border-bottom:solid 1px var(--border-color, #edeae9)}:host ::ng-deep .app-content{background-color:#fff!important;color:#1c1c1c!important}:host ::ng-deep .mat-tab-group.app-sidenav-tabber{background:white!important}:host ::ng-deep .mat-drawer-side.mat-drawer-end{border-color:var(--border-color, #edeae9)!important;box-shadow:5px 5px 15px 5px #0000001a}:host ::ng-deep .h-divider{border:0;border-bottom:1px solid var(--border-color, #edeae9);margin:5px 0}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_CONFIG]
                }] }, { type: i1.FaviconService }, { type: i1.PortalService }]; } });

class CurrentSituationComponent {
    constructor() { }
    ngOnInit() {
    }
}
CurrentSituationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CurrentSituationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CurrentSituationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: CurrentSituationComponent, selector: "reporter-current-situation", ngImport: i0, template: "<p>current-situation works!</p>\n", styles: [""] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CurrentSituationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-current-situation', template: "<p>current-situation works!</p>\n", styles: [""] }]
        }], ctorParameters: function () { return []; } });

class ExpectedSituationComponent {
    constructor() { }
    ngOnInit() {
    }
}
ExpectedSituationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ExpectedSituationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ExpectedSituationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: ExpectedSituationComponent, selector: "reporter-expected-situation", ngImport: i0, template: "<p>expected-situation works!</p>\n", styles: [""] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ExpectedSituationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-expected-situation', template: "<p>expected-situation works!</p>\n", styles: [""] }]
        }], ctorParameters: function () { return []; } });

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
const _COMPONENTS = [
    ReporterAppContainerComponent,
    InitializationComponent,
    PrevSituationComponent,
    CurrentSituationComponent,
    ExpectedSituationComponent,
    PrintLayoutComponent
];
class CimaReporterModule {
}
CimaReporterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CimaReporterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CimaReporterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CimaReporterModule, declarations: [HomeComponent, ReporterAppContainerComponent,
        InitializationComponent,
        PrevSituationComponent,
        CurrentSituationComponent,
        ExpectedSituationComponent,
        PrintLayoutComponent], imports: [CommonModule,
        CimaCommonsModule,
        ReporterRoutingModule,
        FormsModule], exports: [ReporterAppContainerComponent,
        InitializationComponent,
        PrevSituationComponent,
        CurrentSituationComponent,
        ExpectedSituationComponent,
        PrintLayoutComponent] });
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

export { CimaReporterModule, CurrentSituationComponent, ExpectedSituationComponent, HomeComponent, InitializationComponent, PrevSituationComponent, PrintLayoutComponent, REPORTER_CONFIG, ReporterAppContainerComponent };
//# sourceMappingURL=cima-reporter.mjs.map
