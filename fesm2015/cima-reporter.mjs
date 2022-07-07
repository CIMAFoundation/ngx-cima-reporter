import * as i0 from '@angular/core';
import { Injectable, Inject, EventEmitter, Component, Output, Input, NgModule } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import { __decorate } from 'tslib';
import { UntilDestroy } from '@ngneat/until-destroy';
import * as i3$2 from '@angular/material/stepper';
import * as i4 from '@angular/material/form-field';
import * as i3$1 from '@cima/commons';
import { ConfirmDialogModel, ConfirmDialogComponent, APP_CONFIG, CimaCommonsModule, TimebarService } from '@cima/commons';
import * as L from 'leaflet';
import 'leaflet-draw';
import * as i3 from '@angular/material/dialog';
import * as i8 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@angular/material/input';
import * as i14 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i7 from '@angular/material/button';
import * as i4$1 from '@angular/material/slide-toggle';
import * as i5$1 from '@angular/material/select';
import * as i6 from '@angular/material/core';
import * as i13 from '@angular/material/checkbox';
import * as i1$1 from '@angular/router';
import { RouterModule } from '@angular/router';

class LocalReport {
    constructor() {
        this.analysisPeriod = 'PERIODO DI ANALISI';
        this.cumulLabel = 'Cumulata';
        this.aggrLabel = 'aggregazione';
        this.date_creation = new Date().toLocaleDateString();
        this.prevReport = undefined;
        //  {
        //     fromUTCSecond: 0,
        //     toUTCSecond: 0,
        //     text: '',
        //     title: '',
        //     nImgs: 1, 
        //     raings_title: 'Pluviometri',
        //     hydros_title: 'Idrometri',
        //     layers: [], 
        //     raings: [], 
        //     hydros: [], 
        //     raings_cumul: '1 Ora'
        //   }
        this.currReport = undefined;
        // {
        //     fromUTCSecond: 0,
        //     toUTCSecond: 0,
        //     text: '',
        //     title: '',
        //     nImgs: 1, 
        //     raings_title: 'Pluviometri',
        //     hydros_title: 'Idrometri',
        //     layers: [], //todo
        //   }
        this.foreReport = undefined;
        // {
        //     fromUTCSecond: 0,
        //     toUTCSecond: 0,
        //     text: '',
        //     title: '',
        //     nImgs: 1, 
        //     raings_title: 'Pluviometri',
        //     hydros_title: 'Idrometri',
        //     layers: [], 
        //   }
    }
}
class PrintLayout {
    constructor(nImgs) {
        this.numberOfImages = nImgs;
    }
}

let GeographicService = class GeographicService {
    //TODOO AGGIUNGERE RITAGLIO GEOGRAFICO
    constructor() {
        this.lock = false;
        this.selectedFeatures = new BehaviorSubject([]);
        this.currentViews = new BehaviorSubject(undefined);
    }
    lockView() {
        this.lock = true;
    }
    unlockView() {
        this.lock = false;
    }
    setViews(view) {
        this.lock = false;
        this.currentViews.next(view);
    }
    setFeatures(features) {
        this.selectedFeatures.next(features);
    }
    onFeaturesChange() {
        return this.selectedFeatures.asObservable();
    }
    onViewCange() {
        return this.currentViews.asObservable();
    }
    isLocked() {
        return this.lock;
    }
};
GeographicService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GeographicService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GeographicService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GeographicService, providedIn: 'root' });
GeographicService = __decorate([
    UntilDestroy()
], GeographicService);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GeographicService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

class ReporterService {
    constructor(env, http, geoService) {
        this.env = env;
        this.http = http;
        this.geoService = geoService;
        this.bboxSet = false;
    }
    backend_url(relPath) {
        //https://acroweb3-portal-backend-test.cimafoundation.org/reporter/api/
        return `https://acroweb3-portal-backend-test.cimafoundation.org/reporter/api/${relPath}`;
        // return `http://localhost:8000/${relPath}`;
        //return `${this.env.server.baseUrl}/reporter/${relPath}`;
    }
    execute_get(url, httpParams = undefined) {
        return this.http.get(this.backend_url(url), { params: httpParams });
    }
    execute_post(url, object) {
        return this.http.post(this.backend_url(url), object).pipe(map((data) => {
            return data;
        }, (error) => {
            console.error(error);
        }));
    }
    createReport(report) {
        return this.http.post(this.backend_url('create_report/'), report, { responseType: 'blob' });
    }
    /**
     * Return aggregations layers
     * @param aggregation
     * @returns
     */
    getWarning(aggregation) {
        this.geoService.lockView();
        return this.execute_post('aggregation_warning/', aggregation).pipe(map((data) => {
            return data;
        }, (error) => {
            console.error(error);
        }));
    }
    /**
     * Return pluvios
     * @param regions:  list of regions separated by comma
     * @param date_to: utc date in seconds
     * @param cumul
     * @returns array of stations
     */
    getPluvio(regions, date_to, cumul, bbox) {
        return this.execute_post('list_pluvio/', { regions: (regions.length > 0 ? regions : undefined), date_to: date_to, cumul: cumul,
            lat_min: bbox.getSouth(), lat_max: bbox.getNorth(),
            lon_min: bbox.getWest(), lon_max: bbox.getEast()
        });
    }
    /**
     * Return Hydros
     * @param regions: list of regions separated by comma
     * @param date_to: utc date in seconds
     * @returns array of stations
     */
    getHydro(regions, date_to, bbox) {
        return this.execute_post('list_hydro/', { regions: (regions.length > 0 ? regions : undefined), date_to: date_to,
            lat_min: bbox.getSouth(), lat_max: bbox.getNorth(),
            lon_min: bbox.getWest(), lon_max: bbox.getEast() });
    }
    /**
     * Create maps for previous state, SRI, SRI Adj, VMI, Heavy Rain warning, Snow Hunter and current state
     * @param mapParameters
     * @returns Layer (json)
     */
    printMap(mapParameters) {
        this.geoService.lockView();
        return this.execute_post('print_map/', mapParameters);
    }
    /**
     *
     * @param dataTypeId //enum?
     * @param from
     * @param to
     * @returns
     */
    getForecastDatasAvailability(dataTypeId, from, to) {
        return this.execute_post('forecast_data_availability/', { dataTypeId: dataTypeId, from: from, to: to });
    }
    getForecastData(dataTypeId, run) {
        return this.execute_post('get_forecast_data/', { dataTypeId: dataTypeId, descr: run.descr, path: run.path });
    }
    getAvailableCumul() {
        //TODO LEGGERE DA BACKEND IN FUTURO
        const cumulata = [
            {
                id: 1,
                value: 1,
                descr: '1 Ora'
            },
            {
                id: 2,
                value: 3,
                descr: '3 Ore'
            },
            {
                id: 3,
                value: 6,
                descr: '6 Ore'
            },
            {
                id: 4,
                value: 12,
                descr: '12 Ore'
            },
            {
                id: 5,
                value: 24,
                descr: '24 Ore'
            },
            {
                id: 6,
                value: 36,
                descr: '36 Ore'
            },
            {
                id: 7,
                value: 48,
                descr: '48 Ore'
            },
            {
                id: 8,
                value: 72,
                descr: '72 Ore'
            },
            {
                id: 10,
                value: 0,
                descr: 'Time Range'
            }
        ];
        return of(cumulata);
    }
    getAvailablesWarnAggr() {
        //TODO LEGGERE DA BACKEND IN FUTURO
        const aggWarning = [
            {
                id: 1,
                descr: 'Regione',
                value: 'regions_it'
            },
            {
                id: 2,
                descr: 'Provincie',
                value: 'districts_it'
            },
            {
                id: 3,
                descr: 'Comuni',
                value: 'municipalities_it'
            },
            {
                id: 4,
                descr: 'Bacini',
                value: 'catchments_it'
            },
            {
                id: 5,
                descr: 'Zone di Allertamento',
                value: 'warningareas_it'
            },
        ];
        return of(aggWarning);
    }
    getAvailableMaps() {
        const maps = [
            { id: 1, value: 'RADAR_DPC_HDF5_SRI', description: 'SRI' },
            { id: 2, value: 'RADAR_DPC_HDF5_SRIADJ_TEST', description: 'SRI Adjusted' },
            { id: 3, value: 'RADAR_HDF5_VMI', description: 'VMI' },
            { id: 4, value: 'RADAR_DPC_HRW', description: 'Heavy Rain Warning' },
            { id: 5, value: 'SNOW_HUNTER', description: 'Snow Hunter' },
        ];
        return of(maps);
    }
    //SRI, SRI Adjusted, VMI, Heavy Rain Warning, Snow Hunter
    uploadImage(file, title) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        return this.execute_post('upload_img/', formData);
    }
    getAncillaryLayer(idlayer) {
        // https://dds.cimafoundation.org/sentinel/sentinelapi/aggr/layer/regions_it/
        return this.execute_get(idlayer + '_geometry/');
        //return this.http.get('https://dds.cimafoundation.org/sentinel/sentinelapi/aggr/layer/'+idlayer+'/');
    }
}
ReporterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterService, deps: [{ token: 'env' }, { token: i1.HttpClient }, { token: GeographicService }], target: i0.ɵɵFactoryTarget.Injectable });
ReporterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: ['env']
                    }] }, { type: i1.HttpClient }, { type: GeographicService }];
    } });

class MapComponentComponent {
    constructor(reportService, geoService, dialog, _ref) {
        this.reportService = reportService;
        this.geoService = geoService;
        this.dialog = dialog;
        this._ref = _ref;
        this.selected = new EventEmitter();
        this.mapLoading = false;
        this.selectedFeautures = [];
        this.featuresStyle = {
            default_style: {
                stroke: true,
                color: '#a5a59e',
                weight: 2,
                opacity: 1,
                fill: true,
                fillColor: '#a5a59e',
                fillOpacity: 0
            },
            selected_style: {
                stroke: false,
                color: '#d23e3e',
                weight: 2,
                opacity: 1,
                fill: true,
                fillColor: '#d23e3e',
                fillOpacity: 0.4
            }
        };
        this.view = {};
    }
    initDrawTool() {
        var drawnItems = new L.FeatureGroup();
        this.map.addLayer(drawnItems);
        var drawControl = new L.Control.Draw({
            draw: {
                polyline: false,
                circle: false,
                polygon: false,
                marker: false,
                circlemarker: false,
                rectangle: {}
            },
            edit: {
                featureGroup: drawnItems,
            }
        });
        this.map.addControl(drawControl);
        this.map.on(L.Draw.Event.DRAWSTOP, (e) => {
            if (drawnItems.getLayers().length == 0) {
                drawnItems.addLayer(L.rectangle(this.view.bbox));
            }
        });
        this.map.on(L.Draw.Event.CREATED, (e) => {
            drawnItems.addLayer(e.layer);
            this.canSetBounding().subscribe(result => {
                if (result) {
                    this.setView(e.layer.getBounds());
                    this.reportService.bboxSet = true;
                    this._ref.markForCheck();
                }
                else {
                    e.layer.setBounds(this.view.bbox);
                }
            });
        });
        this.map.on(L.Draw.Event.EDITED, (e) => {
            this.canSetBounding().subscribe(result => {
                if (result) {
                    this.setView(e.layers.getLayers()[0].getBounds());
                }
                else {
                    e.layers.getLayers()[0].setBounds(this.view.bbox);
                }
            });
        });
        this.map.on(L.Draw.Event.DELETED, (e) => {
            this.canSetBounding().subscribe(result => {
                if (result) {
                    this.setView(undefined);
                    this.reportService.bboxSet = false;
                    this._ref.markForCheck();
                }
                else {
                    drawnItems.addLayer(e.layers.getLayers()[0]);
                }
            });
        });
        this.map.on(L.Draw.Event.DRAWSTART, (e) => {
            drawnItems.clearLayers();
        });
    }
    canSetBounding() {
        const dialogData = new ConfirmDialogModel($localize `Conferma operazione`, $localize `Procedendo alcuni parametri basati sul ritaglio verrano resettati. Vuoi procedere?`);
        if (this.geoService.isLocked()) {
            return this.dialog.open(ConfirmDialogComponent, {
                data: dialogData,
            }).afterClosed();
        }
        else
            return of(true);
    }
    initMap() {
        this.mapLoading = true;
        this.map = L.map('main_map', { scrollWheelZoom: false }).setView([0, 0], 1);
        //6.7499552751, 36.619987291, 18.4802470232, 47.1153931748
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
        this.map.fitBounds([[36.619987291, 6.7499552751], [47.1153931748, 18.4802470232]]);
        this.initDrawTool();
        setTimeout(() => {
            this.map.invalidateSize(true);
            window.dispatchEvent(new Event('resize'));
        }, 200);
        this.setView();
    }
    ngAfterViewInit() {
        this.initMap();
    }
    resetView() {
        this.map.flyTo([this.view.lat, this.view.lon], this.view.zoom);
    }
    setView(bounding) {
        this.view = {
            lon: this.map.getCenter().lng,
            lat: this.map.getCenter().lat,
            zoom: this.map.getZoom(),
            bbox: bounding
        };
        this.geoService.setViews(this.view);
    }
    updateSelected() {
        var sels = [];
        this.selectedFeautures.forEach(itm => sels.push(itm.properties.nome_reg));
        this.selected.emit(sels);
    }
    loadFeautures(data) {
        L.geoJSON(data, {
            style: (feature) => {
                return this.featuresStyle.default_style;
            },
            onEachFeature: (feature, mlayer) => {
                if (feature.properties) {
                    feature.properties.id = feature.id;
                    // if (this.styleProperties && this.styleProperties.tooltip) {
                    //   mlayer.bindTooltip(this.styleProperties.tooltip(feature.properties));
                    // }
                    // mlayer.bindTooltip(feature.properties.cod_area + '<br>' + feature.properties.nome_area);
                }
                mlayer.on('click', () => {
                    // if (this.selectionEnabled) {
                    feature.selected = !feature.selected;
                    if (feature.selected) {
                        mlayer.setStyle(this.featuresStyle.selected_style);
                        this.selectedFeautures.push(feature);
                    }
                    else {
                        this.selectedFeautures = this.selectedFeautures.filter(itm => itm.properties.gid !== feature.properties.gid);
                        mlayer.setStyle(this.featuresStyle.default_style);
                    }
                    this.updateSelected();
                    console.log(this.selectedFeautures);
                    //this.selectedlayersChange.emit(this.selectedlayers);
                    // } else {
                    //   this.jsonlayer.resetStyle();
                    //   mlayer.setStyle(this.availableStyles.selected_style);
                    // }
                    //this.layerclick.emit(feature);
                });
            }
        }).addTo(this.map);
    }
    ngOnInit() {
        this.reportService.getAncillaryLayer('regions').subscribe(data => {
            console.log(data);
            this.loadFeautures(data);
        });
    }
}
MapComponentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MapComponentComponent, deps: [{ token: ReporterService }, { token: GeographicService }, { token: i3.MatDialog }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MapComponentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: MapComponentComponent, selector: "app-map-component", outputs: { selected: "selected" }, ngImport: i0, template: "<ng-container >\n  <div class=\"d-flex justify-content-between align-items-center mb-2\">\n    <h2 class=\"m-0\">Area Geografica di analisi</h2>\n    <!-- <div class=\"d-flex\">\n      <button mat-flat-button color=\"\" [disabled]=\"!view\" (click)=\"resetView()\"class=\"bg-warning me-2\">\n        <span class=\"fas fa-redo-alt me-2\"></span>Ripristina\n      </button>\n      <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"setView()\">\n        <span class=\"fas fa-crop me-2\"></span>Imposta ritaglio\n      </button>\n    </div> -->\n\n  </div>\n</ng-container>\n\n<div class=\"big-map\" id=\"main_map\">\n   <div class=\"crop-overlay\" *ngIf=\"!view.bbox\">\n     <span><span class=\"fas fa-arrow-left me-2\"></span>Seleziona un ritaglio per proseguire</span>\n  </div>\n</div>\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}.big-map{width:100%;height:calc(100vh - 409px);z-index:1;min-height:400px;position:relative}.crop-overlay{position:absolute;left:58px;top:86px;z-index:410;background-color:red;color:#fff;border-radius:4px;padding:5px;font-size:1.2em}\n"], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MapComponentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-map-component', template: "<ng-container >\n  <div class=\"d-flex justify-content-between align-items-center mb-2\">\n    <h2 class=\"m-0\">Area Geografica di analisi</h2>\n    <!-- <div class=\"d-flex\">\n      <button mat-flat-button color=\"\" [disabled]=\"!view\" (click)=\"resetView()\"class=\"bg-warning me-2\">\n        <span class=\"fas fa-redo-alt me-2\"></span>Ripristina\n      </button>\n      <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"setView()\">\n        <span class=\"fas fa-crop me-2\"></span>Imposta ritaglio\n      </button>\n    </div> -->\n\n  </div>\n</ng-container>\n\n<div class=\"big-map\" id=\"main_map\">\n   <div class=\"crop-overlay\" *ngIf=\"!view.bbox\">\n     <span><span class=\"fas fa-arrow-left me-2\"></span>Seleziona un ritaglio per proseguire</span>\n  </div>\n</div>\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}.big-map{width:100%;height:calc(100vh - 409px);z-index:1;min-height:400px;position:relative}.crop-overlay{position:absolute;left:58px;top:86px;z-index:410;background-color:red;color:#fff;border-radius:4px;padding:5px;font-size:1.2em}\n"] }]
        }], ctorParameters: function () { return [{ type: ReporterService }, { type: GeographicService }, { type: i3.MatDialog }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { selected: [{
                type: Output
            }] } });

class InitializationComponent {
    constructor(geoService) {
        this.geoService = geoService;
        this.reportChange = new EventEmitter();
        // public title:string='Bollettino speditivo di monitoraggio'
        // public text: string = '<span>Monitoraggio delle precipitazioni</span><br><span>Valutazione delle precipitazioni delle ultime ore</span>';
        this.config = { height: '200px', placeholder: 'Testo...' };
    }
    ngOnInit() {
        this.report.title = 'Bollettino speditivo di monitoraggio';
        this.report.txt = 'Testo...';
    }
    featuresSelected(event) {
        //aggiorna service
        this.geoService.setFeatures(event);
    }
}
InitializationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: InitializationComponent, deps: [{ token: GeographicService }], target: i0.ɵɵFactoryTarget.Component });
InitializationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: InitializationComponent, selector: "reporter-initialization", inputs: { report: "report" }, outputs: { reportChange: "reportChange" }, ngImport: i0, template: "<div class=\"row\">\n\n  <!--titolo-->\n  <div class=\"col-12\">\n    <mat-form-field appearance=\"fill\" class=\"w-100\">\n      <mat-label>Titolo</mat-label>\n      <input name=\"title\" [(ngModel)]=\"report.title\" matInput placeholder=\"Bollettino speditivo di monitoraggio\" required>\n    </mat-form-field>\n  </div>\n\n  <!--testo-->\n  <div class=\"col-12\">\n    <cima-text-editor [(text)]=\"report.txt\" [config]=\"config\"></cima-text-editor>\n  </div>\n\n  <!--mappa-->\n  <div class=\"col-12 my-2\" >\n    <!--<h2 class=\"mb-1 mt-3\">Area Geografica di analisi</h2>-->\n    <div class=\"map-container\">\n      <app-map-component (selected)=\"featuresSelected($event)\" ></app-map-component>\n      <!-- <iframe width=\"100%\" height=\"450\"  src=\"https://www.openstreetmap.org/export/embed.html?bbox=-0.3592094779014588%2C37.813520326534004%2C19.789716303348545%2C46.09556117015435&amp;layer=mapnik\" style=\"border: 0px solid black\"></iframe> -->\n    </div>\n  </div>\n\n</div>\n", styles: [""], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3$1.TextEditorComponent, selector: "cima-text-editor", inputs: ["validator", "text", "config"], outputs: ["textChange"] }, { type: MapComponentComponent, selector: "app-map-component", outputs: ["selected"] }], directives: [{ type: i4.MatLabel, selector: "mat-label" }, { type: i5.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i14.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i14.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i14.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i14.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: InitializationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-initialization', template: "<div class=\"row\">\n\n  <!--titolo-->\n  <div class=\"col-12\">\n    <mat-form-field appearance=\"fill\" class=\"w-100\">\n      <mat-label>Titolo</mat-label>\n      <input name=\"title\" [(ngModel)]=\"report.title\" matInput placeholder=\"Bollettino speditivo di monitoraggio\" required>\n    </mat-form-field>\n  </div>\n\n  <!--testo-->\n  <div class=\"col-12\">\n    <cima-text-editor [(text)]=\"report.txt\" [config]=\"config\"></cima-text-editor>\n  </div>\n\n  <!--mappa-->\n  <div class=\"col-12 my-2\" >\n    <!--<h2 class=\"mb-1 mt-3\">Area Geografica di analisi</h2>-->\n    <div class=\"map-container\">\n      <app-map-component (selected)=\"featuresSelected($event)\" ></app-map-component>\n      <!-- <iframe width=\"100%\" height=\"450\"  src=\"https://www.openstreetmap.org/export/embed.html?bbox=-0.3592094779014588%2C37.813520326534004%2C19.789716303348545%2C46.09556117015435&amp;layer=mapnik\" style=\"border: 0px solid black\"></iframe> -->\n    </div>\n  </div>\n\n</div>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: GeographicService }]; }, propDecorators: { report: [{
                type: Input
            }], reportChange: [{
                type: Output
            }] } });

class PrintLayoutComponent {
    constructor() {
        this.selected = new EventEmitter();
        //TODO: LEGGERE DA BACKEND IN FUTURO?
        this.layouts = [
            new PrintLayout(1),
            new PrintLayout(2),
            new PrintLayout(4)
        ];
        this.layoutSelected = 0;
    }
    setLayout(idlayout) {
        this.layoutSelected = idlayout;
        this.selected.emit(this.layouts[idlayout]);
    }
    ngOnInit() {
        this.selected.emit(this.layouts[this.layoutSelected]);
    }
}
PrintLayoutComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PrintLayoutComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PrintLayoutComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: PrintLayoutComponent, selector: "reporter-print-layout", outputs: { selected: "selected" }, ngImport: i0, template: "<h2 class=\"mb-2 mt-3 border-bottom\">Layout di Stampa</h2>\n<div class=\"d-flex\">\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 0? 'selected':''\"\n       (click)=\"setLayout(0)\">\n    <img class=\"img-layout\" src=\"assets/reporter/img/1img.png\">\n    <span class=\"my-1\">{{layouts[0].numberOfImages}} Immagine</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 1? 'selected':''\"\n       (click)=\"setLayout(1)\">\n    <img class=\"img-layout\" src=\"assets/reporter/img/2img.png\">\n    <span class=\"my-1\">{{layouts[1].numberOfImages}} Immagini</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 2? 'selected':''\"\n       (click)=\"setLayout(2)\">\n    <img class=\"img-layout\" src=\"assets/reporter/img/4img.png\">\n    <span class=\"my-1\">{{layouts[2].numberOfImages}} Immagini</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n</div>\n\n", styles: [".layout-wrapper .img-layout{height:140px;cursor:pointer}.layout-wrapper .selection-bullet{width:10px;height:10px;border-radius:50%;background-color:#d3d3d3}.layout-wrapper.selected .selection-bullet{background-color:#007dfc}.layout-wrapper:hover .selection-bullet{outline:3px solid rgba(211,211,211,.6)}\n"], directives: [{ type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PrintLayoutComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-print-layout', template: "<h2 class=\"mb-2 mt-3 border-bottom\">Layout di Stampa</h2>\n<div class=\"d-flex\">\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 0? 'selected':''\"\n       (click)=\"setLayout(0)\">\n    <img class=\"img-layout\" src=\"assets/reporter/img/1img.png\">\n    <span class=\"my-1\">{{layouts[0].numberOfImages}} Immagine</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 1? 'selected':''\"\n       (click)=\"setLayout(1)\">\n    <img class=\"img-layout\" src=\"assets/reporter/img/2img.png\">\n    <span class=\"my-1\">{{layouts[1].numberOfImages}} Immagini</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 2? 'selected':''\"\n       (click)=\"setLayout(2)\">\n    <img class=\"img-layout\" src=\"assets/reporter/img/4img.png\">\n    <span class=\"my-1\">{{layouts[2].numberOfImages}} Immagini</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n</div>\n\n", styles: [".layout-wrapper .img-layout{height:140px;cursor:pointer}.layout-wrapper .selection-bullet{width:10px;height:10px;border-radius:50%;background-color:#d3d3d3}.layout-wrapper.selected .selection-bullet{background-color:#007dfc}.layout-wrapper:hover .selection-bullet{outline:3px solid rgba(211,211,211,.6)}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { selected: [{
                type: Output
            }] } });

class WarningPluvioComponent {
    constructor(reportService, geoService, snackBar) {
        this.reportService = reportService;
        this.geoService = geoService;
        this.snackBar = snackBar;
        this.disabled = false;
        this.warningChange = new EventEmitter();
        this.aggrWarning$ = this.reportService.getAvailablesWarnAggr();
        this.view = undefined;
        this.disabled$ = new BehaviorSubject(true);
    }
    ngOnChanges(changes) {
        if (changes.disabled && changes.disabled.currentValue != changes.disabled.previousValue)
            this.changeControlStatus();
    }
    ngOnInit() {
    }
    changeControlStatus() {
        if (this.disabled) {
            if (this.viewSubscription)
                this.viewSubscription.unsubscribe();
        }
        else {
            this.viewSubscription = this.geoService.onViewCange().subscribe(data => {
                console.log('warning pluvio ', this.disabled, data);
                this.view = data;
                this.resetWarningPluvio();
                this.updateControlStatus();
            });
        }
    }
    updateControlStatus(disable = false) {
        this.disabled$.next(this.view == undefined || this.disabled || disable);
    }
    resetWarningPluvio() {
        this.warningsPluvio = [
            {
                id: 0,
                aggregazione: ''
            }
        ];
        this.updateWarningLayers();
    }
    addWarningPluvio() {
        this.warningsPluvio = [...this.warningsPluvio, { id: 1, aggregazione: '' }];
    }
    delWarningPluvio(item) {
        this.warningsPluvio = this.warningsPluvio.filter((x) => x != item);
    }
    updateWarningLayers() {
        const layer = [];
        this.warningsPluvio.forEach((item) => {
            if (item.data)
                layer.push(item.data);
        });
        this.warningChange.emit(layer);
    }
    selectAggregation(aggr, warning) {
        //this.disabled$.next(true);
        this.updateControlStatus(true);
        this.reportService.getWarning({
            aggregation: aggr, type: 'national_PLUVIOMETRO', date_to: this.report.toUTCSecond,
            lon_min: this.view.bbox.getWest(), lon_max: this.view.bbox.getEast(),
            lat_min: this.view.bbox.getSouth(), lat_max: this.view.bbox.getNorth()
        })
            .pipe(finalize(() => this.updateControlStatus(false)))
            .subscribe(data => {
            warning.data = data;
            this.updateWarningLayers();
        }, error => {
            console.error(error);
            this.snackBar.error('Si è verificato un errore durante la lettura dei warning pluviometrici', '', { duration: 2000 });
        });
    }
}
WarningPluvioComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WarningPluvioComponent, deps: [{ token: ReporterService }, { token: GeographicService }, { token: i3$1.SnackbarService }], target: i0.ɵɵFactoryTarget.Component });
WarningPluvioComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: WarningPluvioComponent, selector: "reporter-warning-pluvio", inputs: { disabled: "disabled", report: "report" }, outputs: { warningChange: "warningChange" }, usesOnChanges: true, ngImport: i0, template: "<h3>Warnings Pluviometrici</h3>\n\n<div class=\"warningPluvio\" *ngFor=\"let warning of warningsPluvio, let i = index\">\n\n  <div class=\"item-list-big-bull bg-secondary\">\n    <span>{{i+1}}</span>\n  </div>\n\n  <mat-form-field appearance=\"fill\" class=\"w-100\">\n    <mat-label>Aggregazione</mat-label>\n    <mat-select  [(value)]=\"warning.selected\" (valueChange)=\"selectAggregation($event,warning)\" [disabled]=\"disabled$ | async\"> \n      <mat-option *ngFor=\"let aggregazione of aggrWarning$ | async\" [value]=\"aggregazione.value\">\n        {{aggregazione.descr}}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n\n  <div class=\"del-btn-wrapper ms-2\">\n    <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\"  (click)=\"delWarningPluvio(warning)\"></span>\n  </div>\n\n</div>\n\n<button mat-flat-button color=\"primary\" class=\"bg-success\" [disabled]=\"disabled$ | async\" (click)=\"addWarningPluvio()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Warning Pluvio</button>\n", styles: [".warningPluvio{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i7.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WarningPluvioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-warning-pluvio', template: "<h3>Warnings Pluviometrici</h3>\n\n<div class=\"warningPluvio\" *ngFor=\"let warning of warningsPluvio, let i = index\">\n\n  <div class=\"item-list-big-bull bg-secondary\">\n    <span>{{i+1}}</span>\n  </div>\n\n  <mat-form-field appearance=\"fill\" class=\"w-100\">\n    <mat-label>Aggregazione</mat-label>\n    <mat-select  [(value)]=\"warning.selected\" (valueChange)=\"selectAggregation($event,warning)\" [disabled]=\"disabled$ | async\"> \n      <mat-option *ngFor=\"let aggregazione of aggrWarning$ | async\" [value]=\"aggregazione.value\">\n        {{aggregazione.descr}}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n\n  <div class=\"del-btn-wrapper ms-2\">\n    <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\"  (click)=\"delWarningPluvio(warning)\"></span>\n  </div>\n\n</div>\n\n<button mat-flat-button color=\"primary\" class=\"bg-success\" [disabled]=\"disabled$ | async\" (click)=\"addWarningPluvio()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Warning Pluvio</button>\n", styles: [".warningPluvio{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}\n"] }]
        }], ctorParameters: function () { return [{ type: ReporterService }, { type: GeographicService }, { type: i3$1.SnackbarService }]; }, propDecorators: { disabled: [{
                type: Input
            }], report: [{
                type: Input
            }], warningChange: [{
                type: Output
            }] } });

class WarningIdroComponent {
    constructor(reportService, geoService, snackBar) {
        this.reportService = reportService;
        this.geoService = geoService;
        this.snackBar = snackBar;
        this.disabled = false;
        this.warningChange = new EventEmitter();
        this.aggrWarning$ = this.reportService.getAvailablesWarnAggr();
        this.view = undefined;
        this.disabled$ = new BehaviorSubject(true);
    }
    ngOnChanges(changes) {
        if (changes.disabled && changes.disabled.currentValue != changes.disabled.previousValue)
            this.changeControlStatus();
    }
    ngOnInit() {
    }
    changeControlStatus() {
        if (this.disabled) {
            if (this.viewSubscription)
                this.viewSubscription.unsubscribe();
        }
        else {
            this.viewSubscription = this.geoService.onViewCange().subscribe(data => {
                console.log('warning pluvio ', this.disabled, data);
                this.view = data;
                this.resetWarningIdro();
                this.updateControlStatus();
            });
        }
    }
    updateControlStatus(disable = false) {
        this.disabled$.next(this.view == undefined || this.disabled || disable);
    }
    resetWarningIdro() {
        this.warningsIdro = [
            {
                id: 0,
                aggregazione: ''
            }
        ];
        this.updateWarningLayers();
    }
    addWarningIdro() {
        this.warningsIdro = [...this.warningsIdro, { id: 1, aggregazione: '' }];
    }
    delWarningIdro(item) {
        this.warningsIdro = this.warningsIdro.filter((x) => x != item);
    }
    updateWarningLayers() {
        const layer = [];
        this.warningsIdro.forEach((item) => {
            console.log(item);
            if (item.data)
                layer.push(item.data);
        });
        this.warningChange.emit(layer);
    }
    selectAggregation(aggr, warning) {
        this.disabled$.next(true);
        // lon: this.view.lon, lat: this.view.lat, zoom: this.view.zoom
        this.reportService.getWarning({
            aggregation: aggr,
            type: 'national_IDROMETRO',
            date_to: this.report.toUTCSecond,
            lon_min: this.view.bbox.getWest(), lon_max: this.view.bbox.getEast(),
            lat_min: this.view.bbox.getSouth(), lat_max: this.view.bbox.getNorth()
        })
            .pipe(finalize(() => this.disabled$.next(false)))
            .subscribe(data => {
            warning.data = data;
            this.updateWarningLayers();
        }, error => {
            console.error(error);
            this.snackBar.error('Si è verificato un errore durante la lettura dei warning idrometrici', '', { duration: 2000 });
        });
    }
}
WarningIdroComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WarningIdroComponent, deps: [{ token: ReporterService }, { token: GeographicService }, { token: i3$1.SnackbarService }], target: i0.ɵɵFactoryTarget.Component });
WarningIdroComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: WarningIdroComponent, selector: "reporter-warning-idro", inputs: { disabled: "disabled", report: "report" }, outputs: { warningChange: "warningChange" }, usesOnChanges: true, ngImport: i0, template: "<h3>Warnings Idrometrici</h3>\n\n<div class=\"warningIdro\" *ngFor=\"let warning of warningsIdro, let i = index\">\n\n  <div class=\"item-list-big-bull bg-info\">\n    <span>{{i+1}}</span>\n  </div>\n\n  <mat-form-field appearance=\"fill\" class=\"w-100\">\n    <mat-label>Aggregazione</mat-label>\n    <mat-select [(value)]=\"warning.selected\" (valueChange)=\"selectAggregation($event,warning)\" [disabled]=\"disabled$ | async\">\n      <mat-option *ngFor=\"let aggregazione of aggrWarning$ | async\" [value]=\"aggregazione.value\">\n        {{aggregazione.descr}}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n\n  <div class=\"del-btn-wrapper ms-2\">\n    <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delWarningIdro(warning)\"></span>\n  </div>\n\n</div>\n\n<button mat-flat-button color=\"primary\" class=\"bg-success\" [disabled]=\"disabled$ | async\" (click)=\"addWarningIdro()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Warning Idro</button>\n", styles: [".warningIdro{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i7.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WarningIdroComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-warning-idro', template: "<h3>Warnings Idrometrici</h3>\n\n<div class=\"warningIdro\" *ngFor=\"let warning of warningsIdro, let i = index\">\n\n  <div class=\"item-list-big-bull bg-info\">\n    <span>{{i+1}}</span>\n  </div>\n\n  <mat-form-field appearance=\"fill\" class=\"w-100\">\n    <mat-label>Aggregazione</mat-label>\n    <mat-select [(value)]=\"warning.selected\" (valueChange)=\"selectAggregation($event,warning)\" [disabled]=\"disabled$ | async\">\n      <mat-option *ngFor=\"let aggregazione of aggrWarning$ | async\" [value]=\"aggregazione.value\">\n        {{aggregazione.descr}}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n\n  <div class=\"del-btn-wrapper ms-2\">\n    <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delWarningIdro(warning)\"></span>\n  </div>\n\n</div>\n\n<button mat-flat-button color=\"primary\" class=\"bg-success\" [disabled]=\"disabled$ | async\" (click)=\"addWarningIdro()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Warning Idro</button>\n", styles: [".warningIdro{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}\n"] }]
        }], ctorParameters: function () { return [{ type: ReporterService }, { type: GeographicService }, { type: i3$1.SnackbarService }]; }, propDecorators: { disabled: [{
                type: Input
            }], report: [{
                type: Input
            }], warningChange: [{
                type: Output
            }] } });

class ImgUploaderComponent {
    constructor(reporterService) {
        this.reporterService = reporterService;
        this.uploadedChange = new EventEmitter();
        this.uploadedFiles = [];
        this.uploading = false;
    }
    ngOnInit() {
    }
    /*UPLOAD FILES*/
    delFile(file) {
        this.uploadedFiles = this.uploadedFiles.filter((x) => x != file);
        this.notifyChange();
    }
    notifyChange() {
        const layers = [];
        this.uploadedFiles.forEach(itm => layers.push(itm.layer));
        this.uploadedChange.emit(layers);
    }
    onFileChange(event) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            this.uploading = true;
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                const image = { id: this.uploadedFiles.length, name: event.target.files[0].name, src: reader.result, layer: {} };
                this.reporterService.uploadImage(event.target.files[0], image.name).subscribe(data => {
                    image.layer = data;
                    this.uploadedFiles.push(image);
                    this.notifyChange();
                }, error => {
                    console.error(error);
                    this.uploading = false;
                });
            };
        }
    }
}
ImgUploaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ImgUploaderComponent, deps: [{ token: ReporterService }], target: i0.ɵɵFactoryTarget.Component });
ImgUploaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ImgUploaderComponent, selector: "reporter-img-uploader", outputs: { uploadedChange: "uploadedChange" }, ngImport: i0, template: "<h3>Immagini</h3>\n<!--file uploaded-->\n<div class=\"file-wrapper uploaded\" *ngFor=\"let file of uploadedFiles\">\n  <div class=\"preview\" [style.background-image]=\"'URL('+file.src+')'\"></div>\n  <div class=\"title\">\n    <a [href]=\"file.src\" target=\"_blank\">{{file.title}}</a>\n    <span class=\"del-btn ms-2 fas fa-trash-alt\" (click)=\"delFile(file)\"></span>\n  </div>\n</div>\n\n<!--upload-->\n<div class=\"file-wrapper upload\">\n  <input type=\"file\" (change)=\"onFileChange($event)\">\n</div>\n", styles: [".file-wrapper{width:100%;height:48px;border-radius:8px;margin-bottom:1.34375em}.file-wrapper.upload{border:dashed 2px #9e9e9e;display:flex;align-items:center;justify-content:center}.file-wrapper.uploaded{background-color:#fff;display:flex;align-items:center;overflow:hidden;height:52px}.file-wrapper.uploaded .preview{width:60px;background-color:#4d92eb;background-size:cover;height:100%}.file-wrapper.uploaded .title{padding:0 8px}.file-wrapper.uploaded .title .del-btn{cursor:pointer;color:gray}.file-wrapper.uploaded .title .del-btn:hover{color:#2f4f4f}\n"], directives: [{ type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ImgUploaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-img-uploader', template: "<h3>Immagini</h3>\n<!--file uploaded-->\n<div class=\"file-wrapper uploaded\" *ngFor=\"let file of uploadedFiles\">\n  <div class=\"preview\" [style.background-image]=\"'URL('+file.src+')'\"></div>\n  <div class=\"title\">\n    <a [href]=\"file.src\" target=\"_blank\">{{file.title}}</a>\n    <span class=\"del-btn ms-2 fas fa-trash-alt\" (click)=\"delFile(file)\"></span>\n  </div>\n</div>\n\n<!--upload-->\n<div class=\"file-wrapper upload\">\n  <input type=\"file\" (change)=\"onFileChange($event)\">\n</div>\n", styles: [".file-wrapper{width:100%;height:48px;border-radius:8px;margin-bottom:1.34375em}.file-wrapper.upload{border:dashed 2px #9e9e9e;display:flex;align-items:center;justify-content:center}.file-wrapper.uploaded{background-color:#fff;display:flex;align-items:center;overflow:hidden;height:52px}.file-wrapper.uploaded .preview{width:60px;background-color:#4d92eb;background-size:cover;height:100%}.file-wrapper.uploaded .title{padding:0 8px}.file-wrapper.uploaded .title .del-btn{cursor:pointer;color:gray}.file-wrapper.uploaded .title .del-btn:hover{color:#2f4f4f}\n"] }]
        }], ctorParameters: function () { return [{ type: ReporterService }]; }, propDecorators: { uploadedChange: [{
                type: Output
            }] } });

class PrevSituationComponent {
    constructor(reporterService, geoService, snackBar) {
        this.reporterService = reporterService;
        this.geoService = geoService;
        this.snackBar = snackBar;
        this.previousReportChange = new EventEmitter();
        this.sectionEnabled = false;
        this.pluviometriTableEnabled = false;
        this.idrometriTableEnabled = false;
        this.textPrev = '<span>Situtazione pregressa...</span>';
        this.config = { height: '200px', placeholder: 'Situazione pregressa...' };
        this.uploadedImageLayers = [];
        this.warningIdroLayers = [];
        this.warningPluvioLayers = [];
        this.pluvioCum = 1;
        this.selectedFeatures = '';
        this.view = undefined;
        /*RAINMAPS*/
        this.rainMaps = [{
                id: 0,
                timerange: ''
            }];
        this.mapDisabled = new BehaviorSubject(true);
        this.featureSubscription = undefined;
        this.viewSubscription = undefined;
    }
    resetRainMaps() {
        this.rainMaps = [{ id: 0, timerange: '' }];
        this.updateLayers();
    }
    addRainMaps() {
        this.rainMaps = [...this.rainMaps, { id: 0, timeRange: '' }];
    }
    delRainMaps(item) {
        this.rainMaps = this.rainMaps.filter((x) => x != item);
    }
    updateLayers() {
        this.previousReport.layers = [];
        this.rainMaps.forEach(itm => {
            if (itm.data)
                this.previousReport.layers.push(itm.data);
        });
        this.warningIdroLayers.forEach(itm => this.previousReport.layers.push(itm));
        this.warningPluvioLayers.forEach(itm => this.previousReport.layers.push(itm));
        this.uploadedImageLayers.forEach(itm => this.previousReport.layers.push(itm));
    }
    uploadedImageChange(event) {
        this.uploadedImageLayers = event;
        this.updateLayers();
    }
    warnIdroChange(event) {
        this.warningIdroLayers = event;
        this.updateLayers();
    }
    warnPluvioChange(event) {
        this.warningPluvioLayers = event;
        this.updateLayers();
    }
    selectMap(cumValue, map) {
        let mapParameter = {
            layer: 'RAINMAP_ITALY',
            from: this.previousReport.fromUTCSecond,
            to: this.previousReport.toUTCSecond,
            description: '',
            cumul: cumValue,
            lon_min: this.view.bbox.getWest(), lon_max: this.view.bbox.getEast(),
            lat_min: this.view.bbox.getSouth(), lat_max: this.view.bbox.getNorth()
        };
        this.mapDisabled.next(true);
        this.reporterService.printMap(mapParameter)
            .pipe(finalize(() => this.mapDisabled.next(false)))
            .subscribe(data => {
            map.data = data;
            this.updateLayers();
        }, error => {
            console.error(error);
            this.snackBar.error('Si è verificato un errore duranta la generazione della mappa.', '', { duration: 2000 });
        });
    }
    selectPluvioCum(value) {
        this.previousReport.raings_cumul = value + (value > 1 ? ' Ore' : 'Ora');
        this.loadStations();
    }
    dateUpdate() {
        if (this.dateFrom)
            this.previousReport.fromUTCSecond = Math.trunc(new Date(this.dateFrom).getTime() / 1000);
        if (this.dateTo)
            this.previousReport.toUTCSecond = Math.trunc(new Date(this.dateTo).getTime() / 1000);
        this.loadStations();
    }
    layoutChange(layout) {
        if (this.previousReport)
            this.previousReport.nImgs = layout.numberOfImages;
    }
    toggleStationAll(stationlist, listitem, event) {
        console.log('toggleall');
        console.log(stationlist);
        console.log(listitem);
        console.log(event.checked);
        stationlist.splice(0, stationlist.length);
        listitem.forEach(itm => {
            itm.selected = event.checked;
        });
        stationlist.push(...listitem.filter(itm => itm.selected));
    }
    toggleStation(stationlist, listitem, item, event) {
        item.selected = event.checked;
        stationlist.splice(0, stationlist.length);
        stationlist.push(...listitem.filter(itm => itm.selected));
    }
    loadStations() {
        this.pluvioStations = [];
        this.hydroStations = [];
        if (this.selectedFeatures.length > 0 || (this.view && this.view.bbox)) {
            this.reporterService.getPluvio(this.selectedFeatures, this.previousReport.toUTCSecond, this.pluvioCum, this.view.bbox).subscribe(data => {
                console.log('stations', data);
                this.pluvioStations = data;
            }, error => {
                console.error(error);
                this.snackBar.error('Errore durante la lettura dei pluviometri', '', { duration: 2000 });
            });
            this.reporterService.getHydro(this.selectedFeatures, this.previousReport.toUTCSecond, this.view.bbox).subscribe(data => {
                this.hydroStations = data;
                console.log('stations hydro ', data);
            }, error => {
                console.error(error);
                this.snackBar.error('Errore durante la lettura degli idrometri', '', { duration: 2000 });
            });
        }
    }
    enableReport() {
        if (this.sectionEnabled) {
            this.previousReport = {
                fromUTCSecond: 0,
                toUTCSecond: 0,
                text: '',
                title: '',
                nImgs: 1,
                raings_title: 'Pluviometri',
                hydros_title: 'Idrometri',
                layers: [],
                raings: [],
                hydros: [],
                raings_cumul: '1 Ora'
            };
            this.updateLayers();
            this.dateUpdate();
            this.featureSubscription = this.geoService.onFeaturesChange().subscribe(data => {
                this.selectedFeatures = data.join(',');
                this.loadStations();
            });
            this.viewSubscription = this.geoService.onViewCange().subscribe(data => {
                this.view = data;
                this.resetRainMaps();
                this.mapDisabled.next(this.view === undefined);
                this.loadStations();
            });
        }
        else {
            if (this.viewSubscription)
                this.viewSubscription.unsubscribe();
            if (this.featureSubscription)
                this.featureSubscription.unsubscribe();
            this.previousReport = undefined;
        }
        this.previousReportChange.emit(this.previousReport);
    }
    ngOnInit() {
        this.enableReport();
        this.reporterService.getAvailableCumul().subscribe(data => {
            this.cumuls = data;
        });
        this.loadStations();
    }
}
PrevSituationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PrevSituationComponent, deps: [{ token: ReporterService }, { token: GeographicService }, { token: i3$1.SnackbarService }], target: i0.ɵɵFactoryTarget.Component });
PrevSituationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: PrevSituationComponent, selector: "reporter-prev-situation", inputs: { previousReport: "previousReport" }, outputs: { previousReportChange: "previousReportChange" }, ngImport: i0, template: "<!--abilitazione-->\n<mat-slide-toggle\n  class=\"\"\n  color=primary [(ngModel)]=\"sectionEnabled\"  (change)=\"enableReport()\">\n  Includi Situazione Pregressa\n</mat-slide-toggle>\n\n\n<div class=\"section-wrapper\" [ngClass]=\"!sectionEnabled?'section-disabled':''\">\n  <!--mappa-->\n  <div class=\"col-12 my-2\" >\n    <!--periodo di analisi-->\n    <h2 class=\"border-bottom mb-3 mt-3\">Periodo di Analisi</h2>\n\n    <mat-form-field appearance=\"fill\" class=\"me-2\">\n      <mat-label>da</mat-label>\n        <input matInput type=\"datetime-local\" placeholder=\"data da\" [(ngModel)]= \"dateFrom\" (change)=\"dateUpdate()\">\n    </mat-form-field>\n\n    <mat-form-field appearance=\"fill\" class=\"me-2\">\n      <mat-label>a</mat-label>\n      <input matInput type=\"datetime-local\" placeholder=\"data a\" [(ngModel)]= \"dateTo\" (change)=\"dateUpdate()\">\n    </mat-form-field>\n\n    <!-- <button mat-flat-button color=\"primary\"><span class=\"fas fa-clock me-1\"></span>Now</button> -->\n\n  </div>\n\n  <!--testo situazione pregressa-->\n  <div class=\"col-12 my-2\" *ngIf=\"sectionEnabled\">\n    <cima-text-editor [(text)]=\"previousReport.text\" [config]=\"config\"></cima-text-editor>\n  </div>\n\n  <!--layout stampa-->\n  <div class=\"col-12 my-2\">\n    <reporter-print-layout (selected)=\"layoutChange($event)\"></reporter-print-layout>\n \n  </div>\n\n  <!--layer-->\n  <div class=\"col-12 my-2\">\n    <h2 class=\"border-bottom mb-3 mt-3\">Layers</h2>\n    <div class=\"row\">\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Mappe di Pioggia</h3>\n\n          <div class=\"rainMap\" *ngFor=\"let map of rainMaps, let i = index\">\n\n            <div class=\"item-list-big-bull\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Cumulata</mat-label>\n              <mat-select [(value)]=\"map.selection\" (valueChange)=\"selectMap($event, map)\" [disabled]=\"mapDisabled | async\">\n                <mat-option *ngFor=\"let cumulata of cumuls\" [value]=\"cumulata.value\">\n                  {{cumulata.descr}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delRainMaps(map)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addRainMaps()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Mappa</button>\n\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-warning-pluvio  [disabled]=\"!sectionEnabled\" [report]=\"previousReport\" (warningChange)=\"warnPluvioChange($event)\" ></reporter-warning-pluvio>\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-warning-idro   [disabled]=\"!sectionEnabled\" [report]=\"previousReport\" (warningChange)=\"warnIdroChange($event)\"></reporter-warning-idro>\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-img-uploader (uploadedChange)=\"uploadedImageChange($event)\"></reporter-img-uploader>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <!--tabella pluvio -->\n  <div class=\"col-12 my-2\">\n\n    <!--pluviometri-->\n    <h2 class=\"border-bottom mb-3 mt-3\">Pluviometri</h2>\n\n    <div class=\"row\">\n\n      <div class=\"col-12 d-flex justify-content-between align-items-center\">\n        <!--abilitazione-->\n        <mat-slide-toggle\n          class=\"me-2\"\n          color=primary [(ngModel)]=\"pluviometriTableEnabled\">\n          Includi Pluviometri\n        </mat-slide-toggle>\n\n        <mat-form-field appearance=\"fill\" class=\"\">\n          <mat-label>Cumulata</mat-label>\n          <mat-select [(value)]=\"pluvioCum\" (valueChange)=\"selectPluvioCum($event)\">\n            <mat-option *ngFor=\"let cumulata of cumuls\" [value]=\"cumulata.value\">\n              {{cumulata.descr}}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n      </div>\n\n      <!--tabella pluviometri-->\n      <div class=\"col-12 pluviometri-table\" [ngClass]=\"!pluviometriTableEnabled?'section-disabled':''\">\n\n        <table class=\"table table-striped\">\n          <thead>\n          <tr>\n            <th scope=\"col\">\n              <mat-checkbox class=\"example-margin\" (change)=\"toggleStationAll(previousReport.raings,pluvioStations, $event)\"></mat-checkbox>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Stazione</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca stazione\">\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Comune</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca comune\">\n              </span></th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Provincia</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca provincia\">\n              </span></th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Regione</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca regione\">\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Valore</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca valore\">\n              </span>\n            </th>\n          </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let pluvio of pluvioStations\">\n              <td scope=\"row\">\n                <mat-checkbox class=\"example-margin\"  [checked]=\"pluvio.selected\" (change)=\"toggleStation(previousReport.raings,pluvioStations,pluvio,$event)\"></mat-checkbox>\n              </td>\n              <td>{{pluvio.stationname}}</td>\n              <td>{{pluvio.munic}}</td>\n              <td>{{pluvio.district}}</td>\n              <td>{{pluvio.region}}</td>\n              <td>{{pluvio.value}} {{pluvio.mu}}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n\n\n\n    </div>\n\n  </div>\n\n  <!--tabella idro -->\n  <div class=\"col-12 my-2\">\n\n    <!--pluviometri-->\n    <h2 class=\"border-bottom mb-3 mt-3\">Idrometri</h2>\n\n    <div class=\"row\">\n\n      <div class=\"col-12 d-flex justify-content-between align-items-center\">\n        <!--abilitazione-->\n        <mat-slide-toggle\n          class=\"me-2\"\n          color=primary [(ngModel)]=\"idrometriTableEnabled\">\n          Includi Idrometri \n        </mat-slide-toggle>\n\n      </div>\n\n      <!--tabella idrometri-->\n      <div class=\"col-12 pluviometri-table\" [ngClass]=\"!idrometriTableEnabled?'section-disabled':''\">\n\n        <table class=\"table table-striped\">\n          <thead>\n          <tr>\n            <th scope=\"col\">\n              <mat-checkbox class=\"example-margin\" (change)=\"toggleStationAll(previousReport.hydros,hydroStations,$event)\"></mat-checkbox>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Stazione</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca stazione\">\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Comune</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca comune\">\n              </span></th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Provincia</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca provincia\">\n              </span></th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Regione</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca regione\">\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Valore</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca valore\">\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Superamento Soglia</span>\n              <select class=\"table-filter\" type=\"text\">\n                <option value=\"1\">Nussuna selezione</option>\n                <option value=\"1\">Bassa</option>\n                <option value=\"1\">Media</option>\n                <option value=\"1\">Elevata</option>\n                <option value=\"1\">Molto Elevata</option>\n                <option value=\"1\">Massima</option>\n              </select>\n            </th>\n          </tr>\n          </thead>\n          <tbody>\n          <tr *ngFor=\"let hydro of hydroStations\">\n            <th scope=\"row\">\n              <mat-checkbox class=\"example-margin\"  [checked]=\"hydro.selected\" (change)=\"toggleStation(previousReport.hydros,hydroStations,hydro,$event)\"></mat-checkbox>\n            </th>\n            <td>{{hydro.stationname}}</td>\n            <td>{{hydro.munic}}</td>\n            <td>{{hydro.district}}</td>\n            <td>{{hydro.region}}</td>\n            <td>{{hydro.value}} {{hydro.mu}}</td>\n          </tr>\n          </tbody>\n        </table>\n      </div>\n\n\n\n    </div>\n\n  </div>\n</div>\n\n\n\n\n", styles: [".section-disabled{opacity:.3;pointer-events:none}.col-wrapper{background-color:#f5f5f5;border-radius:4px}.rainMap{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}.table-input-wrapper{position:relative}.table-input-wrapper:after{position:absolute;right:5px;top:50%;transform:translateY(-50%);content:\"\\f002\";font-family:\"Font Awesome 5 Free\";font-weight:900;color:gray}.table-filter{border-radius:4px;border:solid 1px lightgray;padding-right:20px;width:100px}:host ::ng-deep .col-wrapper .mat-form-field-infix{width:auto!important}table tbody{display:block;height:200px;overflow:auto}table thead,tbody tr{display:table;width:100%;table-layout:fixed}table thead{width:calc(100% - 1em)}\n"], components: [{ type: i4$1.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex", "name", "id", "labelPosition", "aria-label", "aria-labelledby", "aria-describedby", "required", "checked"], outputs: ["change", "toggleChange"], exportAs: ["matSlideToggle"] }, { type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3$1.TextEditorComponent, selector: "cima-text-editor", inputs: ["validator", "text", "config"], outputs: ["textChange"] }, { type: PrintLayoutComponent, selector: "reporter-print-layout", outputs: ["selected"] }, { type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i7.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: WarningPluvioComponent, selector: "reporter-warning-pluvio", inputs: ["disabled", "report"], outputs: ["warningChange"] }, { type: WarningIdroComponent, selector: "reporter-warning-idro", inputs: ["disabled", "report"], outputs: ["warningChange"] }, { type: ImgUploaderComponent, selector: "reporter-img-uploader", outputs: ["uploadedChange"] }, { type: i13.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "aria-describedby", "id", "required", "labelPosition", "name", "value", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }], directives: [{ type: i14.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i14.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i5.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i14.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i14.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i14.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PrevSituationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-prev-situation', template: "<!--abilitazione-->\n<mat-slide-toggle\n  class=\"\"\n  color=primary [(ngModel)]=\"sectionEnabled\"  (change)=\"enableReport()\">\n  Includi Situazione Pregressa\n</mat-slide-toggle>\n\n\n<div class=\"section-wrapper\" [ngClass]=\"!sectionEnabled?'section-disabled':''\">\n  <!--mappa-->\n  <div class=\"col-12 my-2\" >\n    <!--periodo di analisi-->\n    <h2 class=\"border-bottom mb-3 mt-3\">Periodo di Analisi</h2>\n\n    <mat-form-field appearance=\"fill\" class=\"me-2\">\n      <mat-label>da</mat-label>\n        <input matInput type=\"datetime-local\" placeholder=\"data da\" [(ngModel)]= \"dateFrom\" (change)=\"dateUpdate()\">\n    </mat-form-field>\n\n    <mat-form-field appearance=\"fill\" class=\"me-2\">\n      <mat-label>a</mat-label>\n      <input matInput type=\"datetime-local\" placeholder=\"data a\" [(ngModel)]= \"dateTo\" (change)=\"dateUpdate()\">\n    </mat-form-field>\n\n    <!-- <button mat-flat-button color=\"primary\"><span class=\"fas fa-clock me-1\"></span>Now</button> -->\n\n  </div>\n\n  <!--testo situazione pregressa-->\n  <div class=\"col-12 my-2\" *ngIf=\"sectionEnabled\">\n    <cima-text-editor [(text)]=\"previousReport.text\" [config]=\"config\"></cima-text-editor>\n  </div>\n\n  <!--layout stampa-->\n  <div class=\"col-12 my-2\">\n    <reporter-print-layout (selected)=\"layoutChange($event)\"></reporter-print-layout>\n \n  </div>\n\n  <!--layer-->\n  <div class=\"col-12 my-2\">\n    <h2 class=\"border-bottom mb-3 mt-3\">Layers</h2>\n    <div class=\"row\">\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Mappe di Pioggia</h3>\n\n          <div class=\"rainMap\" *ngFor=\"let map of rainMaps, let i = index\">\n\n            <div class=\"item-list-big-bull\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Cumulata</mat-label>\n              <mat-select [(value)]=\"map.selection\" (valueChange)=\"selectMap($event, map)\" [disabled]=\"mapDisabled | async\">\n                <mat-option *ngFor=\"let cumulata of cumuls\" [value]=\"cumulata.value\">\n                  {{cumulata.descr}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delRainMaps(map)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addRainMaps()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Mappa</button>\n\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-warning-pluvio  [disabled]=\"!sectionEnabled\" [report]=\"previousReport\" (warningChange)=\"warnPluvioChange($event)\" ></reporter-warning-pluvio>\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-warning-idro   [disabled]=\"!sectionEnabled\" [report]=\"previousReport\" (warningChange)=\"warnIdroChange($event)\"></reporter-warning-idro>\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-img-uploader (uploadedChange)=\"uploadedImageChange($event)\"></reporter-img-uploader>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <!--tabella pluvio -->\n  <div class=\"col-12 my-2\">\n\n    <!--pluviometri-->\n    <h2 class=\"border-bottom mb-3 mt-3\">Pluviometri</h2>\n\n    <div class=\"row\">\n\n      <div class=\"col-12 d-flex justify-content-between align-items-center\">\n        <!--abilitazione-->\n        <mat-slide-toggle\n          class=\"me-2\"\n          color=primary [(ngModel)]=\"pluviometriTableEnabled\">\n          Includi Pluviometri\n        </mat-slide-toggle>\n\n        <mat-form-field appearance=\"fill\" class=\"\">\n          <mat-label>Cumulata</mat-label>\n          <mat-select [(value)]=\"pluvioCum\" (valueChange)=\"selectPluvioCum($event)\">\n            <mat-option *ngFor=\"let cumulata of cumuls\" [value]=\"cumulata.value\">\n              {{cumulata.descr}}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n      </div>\n\n      <!--tabella pluviometri-->\n      <div class=\"col-12 pluviometri-table\" [ngClass]=\"!pluviometriTableEnabled?'section-disabled':''\">\n\n        <table class=\"table table-striped\">\n          <thead>\n          <tr>\n            <th scope=\"col\">\n              <mat-checkbox class=\"example-margin\" (change)=\"toggleStationAll(previousReport.raings,pluvioStations, $event)\"></mat-checkbox>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Stazione</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca stazione\">\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Comune</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca comune\">\n              </span></th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Provincia</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca provincia\">\n              </span></th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Regione</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca regione\">\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Valore</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca valore\">\n              </span>\n            </th>\n          </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let pluvio of pluvioStations\">\n              <td scope=\"row\">\n                <mat-checkbox class=\"example-margin\"  [checked]=\"pluvio.selected\" (change)=\"toggleStation(previousReport.raings,pluvioStations,pluvio,$event)\"></mat-checkbox>\n              </td>\n              <td>{{pluvio.stationname}}</td>\n              <td>{{pluvio.munic}}</td>\n              <td>{{pluvio.district}}</td>\n              <td>{{pluvio.region}}</td>\n              <td>{{pluvio.value}} {{pluvio.mu}}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n\n\n\n    </div>\n\n  </div>\n\n  <!--tabella idro -->\n  <div class=\"col-12 my-2\">\n\n    <!--pluviometri-->\n    <h2 class=\"border-bottom mb-3 mt-3\">Idrometri</h2>\n\n    <div class=\"row\">\n\n      <div class=\"col-12 d-flex justify-content-between align-items-center\">\n        <!--abilitazione-->\n        <mat-slide-toggle\n          class=\"me-2\"\n          color=primary [(ngModel)]=\"idrometriTableEnabled\">\n          Includi Idrometri \n        </mat-slide-toggle>\n\n      </div>\n\n      <!--tabella idrometri-->\n      <div class=\"col-12 pluviometri-table\" [ngClass]=\"!idrometriTableEnabled?'section-disabled':''\">\n\n        <table class=\"table table-striped\">\n          <thead>\n          <tr>\n            <th scope=\"col\">\n              <mat-checkbox class=\"example-margin\" (change)=\"toggleStationAll(previousReport.hydros,hydroStations,$event)\"></mat-checkbox>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Stazione</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca stazione\">\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Comune</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca comune\">\n              </span></th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Provincia</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca provincia\">\n              </span></th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Regione</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca regione\">\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Valore</span>\n              <span class=\"table-input-wrapper\">\n                <input class=\"table-filter\" type=\"text\" placeholder=\"Cerca valore\">\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"me-1\">Superamento Soglia</span>\n              <select class=\"table-filter\" type=\"text\">\n                <option value=\"1\">Nussuna selezione</option>\n                <option value=\"1\">Bassa</option>\n                <option value=\"1\">Media</option>\n                <option value=\"1\">Elevata</option>\n                <option value=\"1\">Molto Elevata</option>\n                <option value=\"1\">Massima</option>\n              </select>\n            </th>\n          </tr>\n          </thead>\n          <tbody>\n          <tr *ngFor=\"let hydro of hydroStations\">\n            <th scope=\"row\">\n              <mat-checkbox class=\"example-margin\"  [checked]=\"hydro.selected\" (change)=\"toggleStation(previousReport.hydros,hydroStations,hydro,$event)\"></mat-checkbox>\n            </th>\n            <td>{{hydro.stationname}}</td>\n            <td>{{hydro.munic}}</td>\n            <td>{{hydro.district}}</td>\n            <td>{{hydro.region}}</td>\n            <td>{{hydro.value}} {{hydro.mu}}</td>\n          </tr>\n          </tbody>\n        </table>\n      </div>\n\n\n\n    </div>\n\n  </div>\n</div>\n\n\n\n\n", styles: [".section-disabled{opacity:.3;pointer-events:none}.col-wrapper{background-color:#f5f5f5;border-radius:4px}.rainMap{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}.table-input-wrapper{position:relative}.table-input-wrapper:after{position:absolute;right:5px;top:50%;transform:translateY(-50%);content:\"\\f002\";font-family:\"Font Awesome 5 Free\";font-weight:900;color:gray}.table-filter{border-radius:4px;border:solid 1px lightgray;padding-right:20px;width:100px}:host ::ng-deep .col-wrapper .mat-form-field-infix{width:auto!important}table tbody{display:block;height:200px;overflow:auto}table thead,tbody tr{display:table;width:100%;table-layout:fixed}table thead{width:calc(100% - 1em)}\n"] }]
        }], ctorParameters: function () { return [{ type: ReporterService }, { type: GeographicService }, { type: i3$1.SnackbarService }]; }, propDecorators: { previousReport: [{
                type: Input
            }], previousReportChange: [{
                type: Output
            }] } });

class CurrentSituationComponent {
    constructor(reportService, geoService, snackBar) {
        this.reportService = reportService;
        this.geoService = geoService;
        this.snackBar = snackBar;
        this.currentReportChange = new EventEmitter();
        this.availableMaps = [];
        this.sectionEnabled = false;
        this.textCurrent = '<span>Situazione attuale...</span>';
        this.config = { height: '200px', placeholder: 'Situazione attuale...' };
        this.uploadedImageLayers = [];
        this.warningIdroLayers = [];
        this.warningPluvioLayers = [];
        this.view = undefined;
        this.mapDisabled = new BehaviorSubject(true);
    }
    enableReport() {
        if (this.sectionEnabled) {
            this.currentReport = {
                fromUTCSecond: 0,
                toUTCSecond: 0,
                text: '',
                title: '',
                nImgs: 1,
                raings_title: 'Pluviometri',
                hydros_title: 'Idrometri',
                layers: [] //todo
            };
            this.viewSubscription = this.geoService.onViewCange().subscribe(data => {
                this.view = data;
                this.mapDisabled.next(this.view === undefined);
            });
            this.updateLayers();
            this.dateUpdate();
        }
        else {
            this.currentReport = undefined;
            if (this.viewSubscription)
                this.viewSubscription.unsubscribe();
        }
        this.currentReportChange.emit(this.currentReport);
    }
    ngOnInit() {
        this.enableReport();
        this.reportService.getAvailableMaps().subscribe(data => this.availableMaps = data);
    }
    updateLayers() {
        this.currentReport.layers = [];
        this.availableMaps.forEach(itm => {
            if (itm.selected && itm.data)
                this.currentReport.layers.push(itm.data);
        });
        this.warningIdroLayers.forEach(itm => this.currentReport.layers.push(itm));
        this.warningPluvioLayers.forEach(itm => this.currentReport.layers.push(itm));
        this.uploadedImageLayers.forEach(itm => this.currentReport.layers.push(itm));
        console.log('layers', this.currentReport.layers);
    }
    uploadedImageChange(event) {
        console.log(event);
        this.uploadedImageLayers = event;
        this.updateLayers();
    }
    warnIdroChange(event) {
        console.log(event);
        this.warningIdroLayers = event;
        this.updateLayers();
    }
    warnPluvioChange(event) {
        this.warningPluvioLayers = event;
        this.updateLayers();
    }
    layoutChange(layout) {
        if (this.currentReport)
            this.currentReport.nImgs = layout.numberOfImages;
        console.log('report', this.currentReport);
    }
    //todo: gestire cambio ritaglio
    selectMaps(map, value) {
        map.selected = value.checked;
        if (map.selected) {
            let mapParameter = {
                layer: map.value,
                from: this.currentReport.fromUTCSecond,
                to: this.currentReport.toUTCSecond,
                description: map.description,
                cumul: 3,
                lon_min: this.view.bbox.getWest(), lon_max: this.view.bbox.getEast(),
                lat_min: this.view.bbox.getSouth(), lat_max: this.view.bbox.getNorth()
            };
            this.mapDisabled.next(true);
            this.reportService.printMap(mapParameter)
                .pipe(finalize(() => this.mapDisabled.next(false)))
                .subscribe(data => {
                map.data = data;
                this.updateLayers();
            }, error => {
                console.log(error);
                this.snackBar.error('Errore durante il caricamento della mappa ' + map.description, '', { duration: 2000 });
                map.selected = false;
            });
        }
    }
    dateUpdate() {
        if (this.dateFrom)
            this.currentReport.fromUTCSecond = Math.trunc(new Date(this.dateFrom).getTime() / 1000);
        if (this.dateTo)
            this.currentReport.toUTCSecond = Math.trunc(new Date(this.dateTo).getTime() / 1000);
    }
}
CurrentSituationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CurrentSituationComponent, deps: [{ token: ReporterService }, { token: GeographicService }, { token: i3$1.SnackbarService }], target: i0.ɵɵFactoryTarget.Component });
CurrentSituationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: CurrentSituationComponent, selector: "reporter-current-situation", inputs: { currentReport: "currentReport" }, outputs: { currentReportChange: "currentReportChange" }, ngImport: i0, template: "<!--abilitazione-->\n<mat-slide-toggle\n  class=\"\"\n  color=primary [(ngModel)]=\"sectionEnabled\" (change)=\"enableReport()\">\n  Includi Situazione Attuale\n</mat-slide-toggle>\n\n\n<div class=\"section-wrapper\" [ngClass]=\"!sectionEnabled?'section-disabled':''\">\n  <!--mappa-->\n  <div class=\"col-12 my-2\">\n    <!--periodo di analisi-->\n    <h2 class=\"border-bottom mb-3 mt-3\">Periodo di Analisi</h2>\n\n    <mat-form-field appearance=\"fill\" class=\"me-2\">\n      <mat-label>da</mat-label>\n      <input matInput type=\"datetime-local\" placeholder=\"data da\" [(ngModel)]= \"dateFrom\" (change)=\"dateUpdate()\">\n    </mat-form-field>\n\n    <mat-form-field appearance=\"fill\" class=\"me-2\">\n      <mat-label>a</mat-label>\n      <input matInput type=\"datetime-local\" placeholder=\"data a\" [(ngModel)]= \"dateTo\" (change)=\"dateUpdate()\">\n    </mat-form-field>\n\n    <!-- <button mat-flat-button color=\"primary\"><span class=\"fas fa-clock me-1\"></span>Now</button> -->\n\n  </div>\n\n  <!--testo situazione pregressa-->\n  <div class=\"col-12 my-2\" *ngIf=\"sectionEnabled\">\n    <cima-text-editor [(text)]=\"currentReport.text\" [config]=\"config\"></cima-text-editor>\n  </div>\n\n  <!--layout stampa-->\n  <div class=\"col-12 my-2\">\n    <reporter-print-layout (selected)=\"layoutChange($event)\"></reporter-print-layout>\n  </div>\n\n  <!--layer-->\n  <div class=\"col-12 my-2\">\n    <h2 class=\"border-bottom mb-3 mt-3\">Layers</h2>\n    <div class=\"row\">\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Data</h3>\n          <div *ngFor=\"let map of availableMaps\" >\n            <mat-checkbox class=\"example-margin\"  [checked]=\"map.selected\" [disabled]=\"mapDisabled | async\" (change)=\"selectMaps(map,$event)\">{{map.description}}</mat-checkbox>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-warning-pluvio  [disabled]=\"!sectionEnabled\" [report]=\"currentReport\" (warningChange)=\"warnPluvioChange($event)\"></reporter-warning-pluvio>\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-warning-idro  [disabled]=\"!sectionEnabled\" [report]=\"currentReport\" (warningChange)=\"warnIdroChange($event)\"></reporter-warning-idro>\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-img-uploader (uploadedChange)=\"uploadedImageChange($event)\"></reporter-img-uploader>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n</div>\n", styles: [".section-disabled{opacity:.3;pointer-events:none}.col-wrapper{background-color:#f5f5f5;border-radius:4px}:host ::ng-deep .col-wrapper .mat-form-field-infix{width:auto!important}\n"], components: [{ type: i4$1.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex", "name", "id", "labelPosition", "aria-label", "aria-labelledby", "aria-describedby", "required", "checked"], outputs: ["change", "toggleChange"], exportAs: ["matSlideToggle"] }, { type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3$1.TextEditorComponent, selector: "cima-text-editor", inputs: ["validator", "text", "config"], outputs: ["textChange"] }, { type: PrintLayoutComponent, selector: "reporter-print-layout", outputs: ["selected"] }, { type: i13.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "aria-describedby", "id", "required", "labelPosition", "name", "value", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { type: WarningPluvioComponent, selector: "reporter-warning-pluvio", inputs: ["disabled", "report"], outputs: ["warningChange"] }, { type: WarningIdroComponent, selector: "reporter-warning-idro", inputs: ["disabled", "report"], outputs: ["warningChange"] }, { type: ImgUploaderComponent, selector: "reporter-img-uploader", outputs: ["uploadedChange"] }], directives: [{ type: i14.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i14.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i5.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i14.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CurrentSituationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-current-situation', template: "<!--abilitazione-->\n<mat-slide-toggle\n  class=\"\"\n  color=primary [(ngModel)]=\"sectionEnabled\" (change)=\"enableReport()\">\n  Includi Situazione Attuale\n</mat-slide-toggle>\n\n\n<div class=\"section-wrapper\" [ngClass]=\"!sectionEnabled?'section-disabled':''\">\n  <!--mappa-->\n  <div class=\"col-12 my-2\">\n    <!--periodo di analisi-->\n    <h2 class=\"border-bottom mb-3 mt-3\">Periodo di Analisi</h2>\n\n    <mat-form-field appearance=\"fill\" class=\"me-2\">\n      <mat-label>da</mat-label>\n      <input matInput type=\"datetime-local\" placeholder=\"data da\" [(ngModel)]= \"dateFrom\" (change)=\"dateUpdate()\">\n    </mat-form-field>\n\n    <mat-form-field appearance=\"fill\" class=\"me-2\">\n      <mat-label>a</mat-label>\n      <input matInput type=\"datetime-local\" placeholder=\"data a\" [(ngModel)]= \"dateTo\" (change)=\"dateUpdate()\">\n    </mat-form-field>\n\n    <!-- <button mat-flat-button color=\"primary\"><span class=\"fas fa-clock me-1\"></span>Now</button> -->\n\n  </div>\n\n  <!--testo situazione pregressa-->\n  <div class=\"col-12 my-2\" *ngIf=\"sectionEnabled\">\n    <cima-text-editor [(text)]=\"currentReport.text\" [config]=\"config\"></cima-text-editor>\n  </div>\n\n  <!--layout stampa-->\n  <div class=\"col-12 my-2\">\n    <reporter-print-layout (selected)=\"layoutChange($event)\"></reporter-print-layout>\n  </div>\n\n  <!--layer-->\n  <div class=\"col-12 my-2\">\n    <h2 class=\"border-bottom mb-3 mt-3\">Layers</h2>\n    <div class=\"row\">\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Data</h3>\n          <div *ngFor=\"let map of availableMaps\" >\n            <mat-checkbox class=\"example-margin\"  [checked]=\"map.selected\" [disabled]=\"mapDisabled | async\" (change)=\"selectMaps(map,$event)\">{{map.description}}</mat-checkbox>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-warning-pluvio  [disabled]=\"!sectionEnabled\" [report]=\"currentReport\" (warningChange)=\"warnPluvioChange($event)\"></reporter-warning-pluvio>\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-warning-idro  [disabled]=\"!sectionEnabled\" [report]=\"currentReport\" (warningChange)=\"warnIdroChange($event)\"></reporter-warning-idro>\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-img-uploader (uploadedChange)=\"uploadedImageChange($event)\"></reporter-img-uploader>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n</div>\n", styles: [".section-disabled{opacity:.3;pointer-events:none}.col-wrapper{background-color:#f5f5f5;border-radius:4px}:host ::ng-deep .col-wrapper .mat-form-field-infix{width:auto!important}\n"] }]
        }], ctorParameters: function () { return [{ type: ReporterService }, { type: GeographicService }, { type: i3$1.SnackbarService }]; }, propDecorators: { currentReport: [{
                type: Input
            }], currentReportChange: [{
                type: Output
            }] } });

class ExpectedSituationComponent {
    constructor(reporterService, snackBar) {
        this.reporterService = reporterService;
        this.snackBar = snackBar;
        this.forecastReportChange = new EventEmitter();
        this.sectionEnabled = false;
        this.textExpected = '<span>Situazione prevista...</span>';
        this.config = { height: '200px', placeholder: 'Situazione prevista...' };
        this.rainMapDatas = [];
        this.snowMapDatas = [];
        this.geoMapDatas = [];
        this.uploadedImageLayers = [];
        /*PREC RUN*/
        this.runsPrec = [
            {
                id: 0,
                run: ''
            }
        ];
        /*SNOW RUN*/
        this.runsSnow = [
            {
                id: 0,
                run: ''
            }
        ];
        /*GEOPOT RUN*/
        this.runsGeoPot = [
            {
                id: 0,
                run: ''
            }
        ];
    }
    addRunPrec() {
        this.runsPrec = [...this.runsPrec, { id: 1, run: '' }];
    }
    delRunPrec(item) {
        this.runsPrec = this.runsPrec.filter((x) => x != item);
    }
    addRunSnow() {
        this.runsSnow = [...this.runsSnow, { id: 1, run: '' }];
    }
    delRunSnow(item) {
        this.runsSnow = this.runsSnow.filter((x) => x != item);
    }
    addRunGeoPot() {
        this.runsGeoPot = [...this.runsGeoPot, { id: 1, run: '' }];
    }
    delRunGeoPot(item) {
        this.runsGeoPot =
            this.runsGeoPot.filter((x) => x != item);
    }
    uploadedImageChange(event) {
        console.log(event);
        this.uploadedImageLayers = event;
        this.updateLayers();
    }
    updateLayers() {
        this.forecastReport.layers = [];
        this.runsPrec.forEach(itm => {
            if (itm.data)
                this.forecastReport.layers.push(itm.data);
        });
        this.runsSnow.forEach(itm => {
            if (itm.data)
                this.forecastReport.layers.push(itm.data);
        });
        this.runsGeoPot.forEach(itm => {
            if (itm.data)
                this.forecastReport.layers.push(itm.data);
        });
        this.uploadedImageLayers.forEach(itm => this.forecastReport.layers.push(itm));
        console.log('layers', this.forecastReport.layers);
    }
    dateUpdate() {
        if (this.dateFrom)
            this.forecastReport.fromUTCSecond = Math.trunc(new Date(this.dateFrom).getTime() / 1000);
        if (this.dateTo)
            this.forecastReport.toUTCSecond = Math.trunc(new Date(this.dateTo).getTime() / 1000);
        //this.loadStations();
        this.loadForecastDatasAvailability();
    }
    layoutChange(layout) {
        if (this.forecastReport)
            this.forecastReport.nImgs = layout.numberOfImages;
        console.log('report', this.forecastReport);
    }
    selectMap(type, event, prec) {
        console.log('selected', event, prec);
        //TODO
        this.reporterService.getForecastData(type, event).subscribe(data => {
            console.log(data);
            prec.data = data;
            this.updateLayers();
        }, error => {
            console.error(error);
            this.snackBar.error("Errore durante il caricamento della mappa di previsione.", '', { duration: 2000 });
        });
    }
    loadAvailability(dataType, listData) {
        listData.splice(0, listData.length);
        this.reporterService.getForecastDatasAvailability(dataType, this.forecastReport.fromUTCSecond, this.forecastReport.toUTCSecond).subscribe(data => {
            listData.push(...data.runs);
        }, error => {
            console.error(error);
            this.snackBar.error('Si è verificato un errore durante la lettura dei dati.', '', { duration: 2000 });
        });
    }
    loadForecastDatasAvailability() {
        //todo cancellare vecchi layers
        if (this.forecastReport.fromUTCSecond > 0 && this.forecastReport.toUTCSecond > 0) {
            this.loadAvailability('ITALIA_PT', this.rainMapDatas);
            this.loadAvailability('ITALIA_NT', this.snowMapDatas);
            this.loadAvailability('EURATL_GGTT', this.geoMapDatas);
        }
    }
    enableReport() {
        if (this.sectionEnabled) {
            this.forecastReport = {
                fromUTCSecond: 0,
                toUTCSecond: 0,
                text: '',
                title: '',
                nImgs: 1,
                raings_title: 'Pluviometri',
                hydros_title: 'Idrometri',
                layers: [], //todo
            };
            this.updateLayers();
            this.dateUpdate();
            this.forecastReportChange.emit(this.forecastReport);
        }
        else {
            this.forecastReport = undefined;
        }
    }
    ngOnInit() {
        this.enableReport();
    }
}
ExpectedSituationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ExpectedSituationComponent, deps: [{ token: ReporterService }, { token: i3$1.SnackbarService }], target: i0.ɵɵFactoryTarget.Component });
ExpectedSituationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ExpectedSituationComponent, selector: "reporter-expected-situation", inputs: { forecastReport: "forecastReport" }, outputs: { forecastReportChange: "forecastReportChange" }, ngImport: i0, template: "<!--abilitazione-->\n<mat-slide-toggle\n  class=\"\"\n  color=primary [(ngModel)]=\"sectionEnabled\" (change)=\"enableReport()\">\n  Includi Situazione Prevista\n</mat-slide-toggle>\n\n\n<div class=\"section-wrapper\" [ngClass]=\"!sectionEnabled?'section-disabled':''\">\n  <!--mappa-->\n  <div class=\"col-12 my-2\">\n    <!--periodo di analisi-->\n    <h2 class=\"border-bottom mb-3 mt-3\">Periodo di Analisi</h2>\n\n    <mat-form-field appearance=\"fill\" class=\"me-2\">\n      <mat-label>da</mat-label>\n      <input matInput type=\"datetime-local\" placeholder=\"data da\" [(ngModel)]= \"dateFrom\" (change)=\"dateUpdate()\">\n    </mat-form-field>\n\n    <mat-form-field appearance=\"fill\" class=\"me-2\">\n      <mat-label>a</mat-label>\n      <input matInput type=\"datetime-local\" placeholder=\"data a\" [(ngModel)]= \"dateTo\" (change)=\"dateUpdate()\">\n    </mat-form-field>\n\n    <!-- <button mat-flat-button color=\"primary\"><span class=\"fas fa-clock me-1\"></span>Now</button> -->\n\n  </div>\n\n  <!--testo situazione pregressa-->\n  <div class=\"col-12 my-2\">\n    <cima-text-editor [(text)]=\"textExpected\" [config]=\"config\"></cima-text-editor>\n  </div>\n\n  <!--layout stampa-->\n  <div class=\"col-12 my-2\">\n    <reporter-print-layout  (selected)=\"layoutChange($event)\"></reporter-print-layout>\n  </div>\n\n  <!--layer-->\n  <div class=\"col-12 my-2\">\n    <h2 class=\"border-bottom mb-3 mt-3\">Layers</h2>\n    <div class=\"row\">\n\n      <!--PRECIPITAZIONI-->\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Previsione Precipitazione cum. 6h</h3>\n          <div class=\"runPrec\" *ngFor=\"let prec of runsPrec, let i = index\">\n\n            <div class=\"item-list-big-bull bg-secondary\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Seleziona run</mat-label>\n              <mat-select (valueChange)=\"selectMap('ITALIA_PT',$event, prec)\">\n                <mat-option *ngFor=\"let run of rainMapDatas\"  [value]=\"run\">\n                  {{run.descr}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delRunPrec(prec)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addRunPrec()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Run Precipitazioni</button>\n\n        </div>\n      </div>\n\n      <!--NEVE-->\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Previsione Neve cum. 6h</h3>\n          <div class=\"runPrec\" *ngFor=\"let snow of runsSnow, let i = index\">\n\n            <div class=\"item-list-big-bull bg-secondary\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Seleziona run</mat-label>\n              <mat-select (valueChange)=\"selectMap('ITALIA_NT',$event, snow)\">\n                <mat-option *ngFor=\"let run of snowMapDatas\" [value]=\"run\">\n                  {{run.descr}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delRunSnow(snow)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addRunSnow()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Run Neve</button>\n\n        </div>\n      </div>\n\n      <!--GEOPOTENZIALI-->\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Previsione Geopotenziale cum. 6h  (500hpa)</h3>\n          <div class=\"runPrec\" *ngFor=\"let geo of runsGeoPot, let i = index\">\n\n            <div class=\"item-list-big-bull bg-secondary\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Seleziona run</mat-label>\n              <mat-select (valueChange)=\"selectMap('EURATL_GGTT',$event, geo)\">\n                <mat-option *ngFor=\"let run of geoMapDatas\" [value]=\"run\">\n                  {{run.descr}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delRunGeoPot(geo)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addRunGeoPot()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Run Geopotenziale</button>\n\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-img-uploader (uploadedChange)=\"uploadedImageChange($event)\"></reporter-img-uploader>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n</div>\n", styles: [".section-disabled{opacity:.3;pointer-events:none}.col-wrapper{background-color:#f5f5f5;border-radius:4px}:host ::ng-deep .col-wrapper .mat-form-field-infix{width:auto!important}.runPrec{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}\n"], components: [{ type: i4$1.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex", "name", "id", "labelPosition", "aria-label", "aria-labelledby", "aria-describedby", "required", "checked"], outputs: ["change", "toggleChange"], exportAs: ["matSlideToggle"] }, { type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3$1.TextEditorComponent, selector: "cima-text-editor", inputs: ["validator", "text", "config"], outputs: ["textChange"] }, { type: PrintLayoutComponent, selector: "reporter-print-layout", outputs: ["selected"] }, { type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i7.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: ImgUploaderComponent, selector: "reporter-img-uploader", outputs: ["uploadedChange"] }], directives: [{ type: i14.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i14.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i5.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i14.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ExpectedSituationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-expected-situation', template: "<!--abilitazione-->\n<mat-slide-toggle\n  class=\"\"\n  color=primary [(ngModel)]=\"sectionEnabled\" (change)=\"enableReport()\">\n  Includi Situazione Prevista\n</mat-slide-toggle>\n\n\n<div class=\"section-wrapper\" [ngClass]=\"!sectionEnabled?'section-disabled':''\">\n  <!--mappa-->\n  <div class=\"col-12 my-2\">\n    <!--periodo di analisi-->\n    <h2 class=\"border-bottom mb-3 mt-3\">Periodo di Analisi</h2>\n\n    <mat-form-field appearance=\"fill\" class=\"me-2\">\n      <mat-label>da</mat-label>\n      <input matInput type=\"datetime-local\" placeholder=\"data da\" [(ngModel)]= \"dateFrom\" (change)=\"dateUpdate()\">\n    </mat-form-field>\n\n    <mat-form-field appearance=\"fill\" class=\"me-2\">\n      <mat-label>a</mat-label>\n      <input matInput type=\"datetime-local\" placeholder=\"data a\" [(ngModel)]= \"dateTo\" (change)=\"dateUpdate()\">\n    </mat-form-field>\n\n    <!-- <button mat-flat-button color=\"primary\"><span class=\"fas fa-clock me-1\"></span>Now</button> -->\n\n  </div>\n\n  <!--testo situazione pregressa-->\n  <div class=\"col-12 my-2\">\n    <cima-text-editor [(text)]=\"textExpected\" [config]=\"config\"></cima-text-editor>\n  </div>\n\n  <!--layout stampa-->\n  <div class=\"col-12 my-2\">\n    <reporter-print-layout  (selected)=\"layoutChange($event)\"></reporter-print-layout>\n  </div>\n\n  <!--layer-->\n  <div class=\"col-12 my-2\">\n    <h2 class=\"border-bottom mb-3 mt-3\">Layers</h2>\n    <div class=\"row\">\n\n      <!--PRECIPITAZIONI-->\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Previsione Precipitazione cum. 6h</h3>\n          <div class=\"runPrec\" *ngFor=\"let prec of runsPrec, let i = index\">\n\n            <div class=\"item-list-big-bull bg-secondary\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Seleziona run</mat-label>\n              <mat-select (valueChange)=\"selectMap('ITALIA_PT',$event, prec)\">\n                <mat-option *ngFor=\"let run of rainMapDatas\"  [value]=\"run\">\n                  {{run.descr}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delRunPrec(prec)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addRunPrec()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Run Precipitazioni</button>\n\n        </div>\n      </div>\n\n      <!--NEVE-->\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Previsione Neve cum. 6h</h3>\n          <div class=\"runPrec\" *ngFor=\"let snow of runsSnow, let i = index\">\n\n            <div class=\"item-list-big-bull bg-secondary\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Seleziona run</mat-label>\n              <mat-select (valueChange)=\"selectMap('ITALIA_NT',$event, snow)\">\n                <mat-option *ngFor=\"let run of snowMapDatas\" [value]=\"run\">\n                  {{run.descr}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delRunSnow(snow)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addRunSnow()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Run Neve</button>\n\n        </div>\n      </div>\n\n      <!--GEOPOTENZIALI-->\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <h3>Previsione Geopotenziale cum. 6h  (500hpa)</h3>\n          <div class=\"runPrec\" *ngFor=\"let geo of runsGeoPot, let i = index\">\n\n            <div class=\"item-list-big-bull bg-secondary\">\n              <span>{{i+1}}</span>\n            </div>\n\n            <mat-form-field appearance=\"fill\" class=\"w-100\">\n              <mat-label>Seleziona run</mat-label>\n              <mat-select (valueChange)=\"selectMap('EURATL_GGTT',$event, geo)\">\n                <mat-option *ngFor=\"let run of geoMapDatas\" [value]=\"run\">\n                  {{run.descr}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <div class=\"del-btn-wrapper ms-2\">\n              <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delRunGeoPot(geo)\"></span>\n            </div>\n\n          </div>\n\n          <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"addRunGeoPot()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Run Geopotenziale</button>\n\n        </div>\n      </div>\n\n      <div class=\"col-12 col-lg-6 col-xl-3 mb-2\">\n        <div class=\"col-wrapper p-3\">\n          <reporter-img-uploader (uploadedChange)=\"uploadedImageChange($event)\"></reporter-img-uploader>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n</div>\n", styles: [".section-disabled{opacity:.3;pointer-events:none}.col-wrapper{background-color:#f5f5f5;border-radius:4px}:host ::ng-deep .col-wrapper .mat-form-field-infix{width:auto!important}.runPrec{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}\n"] }]
        }], ctorParameters: function () { return [{ type: ReporterService }, { type: i3$1.SnackbarService }]; }, propDecorators: { forecastReport: [{
                type: Input
            }], forecastReportChange: [{
                type: Output
            }] } });

'@angular/forms';
class HomeComponent {
    constructor(reporterService, geoService) {
        this.reporterService = reporterService;
        this.geoService = geoService;
        this.loadingReport = false;
    }
    ngOnInit() {
        this.report = new LocalReport();
        // this.geoService.onViewCange().subscribe(
        //   data =>{
        //     this.report=new LocalReport();
        //     alert("reset");
        //   }
        // );
    }
    createReport() {
        console.log(this.report);
        this.loadingReport = true;
        this.reporterService.createReport(this.report).subscribe(data => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            var url = window.URL.createObjectURL(blob);
            //window.open(url, '_blank');
            var anchor = document.createElement("a");
            anchor.download = "report.docx";
            anchor.href = url;
            anchor.click();
            console.log('Report creato');
            console.log(data);
            this.loadingReport = false;
        }, error => {
            this.loadingReport = false;
            console.error(error);
        });
    }
}
HomeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: HomeComponent, deps: [{ token: ReporterService }, { token: GeographicService }], target: i0.ɵɵFactoryTarget.Component });
HomeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: HomeComponent, selector: "cima-home", ngImport: i0, template: "<mat-stepper #stepper [linear]=\"true\">\n\n  <!--lasciare numero al posto dell'icona-->\n  <ng-template matStepperIcon=\"edit\" let-index=\"index\">\n    {{index +1}}\n  </ng-template>\n\n  <!--STEP 1-->\n  <mat-step>\n      <ng-template matStepLabel>Inizializzazione </ng-template>\n    <div class=\"stepper-content-wrapper\">\n\n      <div class=\"stepper-content\">\n        <reporter-initialization [(report)]=\"report\"></reporter-initialization>\n      </div>\n\n      <div class=\"d-flex justify-content-end align-items-center\">\n        <span class=\"me-2 text-danger\" *ngIf=\"!reporterService.bboxSet\">E' necessario impostare un ritaglio per proseguire</span>\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext [disabled]=\"!reporterService.bboxSet\n\">\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\n        </button>\n      </div>\n\n    </div>\n  </mat-step>\n\n\n  <!--STEP 2-->\n  <mat-step>\n    <ng-template matStepLabel>Situazione Pregressa</ng-template>\n    <div class=\"stepper-content-wrapper\">\n\n      <div class=\"stepper-content\">\n        <reporter-prev-situation [(previousReport)]=\"report.prevReport\"></reporter-prev-situation>\n      </div>\n\n      <div class=\"d-flex justify-content-between\">\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\n        </button>\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\n        </button>\n      </div>\n    </div>\n  </mat-step>\n\n\n  <!--STEP 3-->\n  <mat-step>\n    <ng-template matStepLabel>Situazione Attuale</ng-template>\n    <div class=\"stepper-content-wrapper\">\n      <div class=\"stepper-content\">\n       <reporter-current-situation [(currentReport)]=\"report.currReport\"></reporter-current-situation>\n      </div>\n      <div class=\"d-flex justify-content-between\">\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\n        </button>\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\n        </button>\n      </div>\n    </div>\n  </mat-step>\n\n  <!--STEP 4-->\n  <mat-step>\n    <ng-template matStepLabel>Situazione Prevista</ng-template>\n    <div class=\"stepper-content-wrapper\">\n      <div class=\"stepper-content\">\n        <reporter-expected-situation [(forecastReport)]=\"report.foreReport\"></reporter-expected-situation>\n      </div>\n      <div class=\"d-flex justify-content-between\">\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\n        </button>\n        <button mat-flat-button color=\"primary\" class=\"me-2 bg-success\" (click)=\"createReport()\">\n          Genera Report\n        </button>\n      </div>\n    </div>\n  </mat-step>\n\n</mat-stepper>\n", styles: [".stepper-content-wrapper{padding:1em 0}.stepper-content{padding:1em}.map-container{border-radius:5px;overflow:hidden}:host ::ng-deep .angular-editor-wrapper{background-color:#f5f5f5;border-radius:5px 5px 0 0}:host ::ng-deep .mat-button-wrapper{display:flex;align-items:center}\n"], components: [{ type: i3$2.MatStepper, selector: "mat-stepper, mat-vertical-stepper, mat-horizontal-stepper, [matStepper]", inputs: ["selectedIndex", "disableRipple", "color", "labelPosition"], outputs: ["animationDone"], exportAs: ["matStepper", "matVerticalStepper", "matHorizontalStepper"] }, { type: i3$2.MatStep, selector: "mat-step", inputs: ["color"], exportAs: ["matStep"] }, { type: InitializationComponent, selector: "reporter-initialization", inputs: ["report"], outputs: ["reportChange"] }, { type: i7.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: PrevSituationComponent, selector: "reporter-prev-situation", inputs: ["previousReport"], outputs: ["previousReportChange"] }, { type: CurrentSituationComponent, selector: "reporter-current-situation", inputs: ["currentReport"], outputs: ["currentReportChange"] }, { type: ExpectedSituationComponent, selector: "reporter-expected-situation", inputs: ["forecastReport"], outputs: ["forecastReportChange"] }], directives: [{ type: i3$2.MatStepperIcon, selector: "ng-template[matStepperIcon]", inputs: ["matStepperIcon"] }, { type: i3$2.MatStepLabel, selector: "[matStepLabel]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$2.MatStepperNext, selector: "button[matStepperNext]", inputs: ["type"] }, { type: i3$2.MatStepperPrevious, selector: "button[matStepperPrevious]", inputs: ["type"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: HomeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cima-home', template: "<mat-stepper #stepper [linear]=\"true\">\n\n  <!--lasciare numero al posto dell'icona-->\n  <ng-template matStepperIcon=\"edit\" let-index=\"index\">\n    {{index +1}}\n  </ng-template>\n\n  <!--STEP 1-->\n  <mat-step>\n      <ng-template matStepLabel>Inizializzazione </ng-template>\n    <div class=\"stepper-content-wrapper\">\n\n      <div class=\"stepper-content\">\n        <reporter-initialization [(report)]=\"report\"></reporter-initialization>\n      </div>\n\n      <div class=\"d-flex justify-content-end align-items-center\">\n        <span class=\"me-2 text-danger\" *ngIf=\"!reporterService.bboxSet\">E' necessario impostare un ritaglio per proseguire</span>\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext [disabled]=\"!reporterService.bboxSet\n\">\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\n        </button>\n      </div>\n\n    </div>\n  </mat-step>\n\n\n  <!--STEP 2-->\n  <mat-step>\n    <ng-template matStepLabel>Situazione Pregressa</ng-template>\n    <div class=\"stepper-content-wrapper\">\n\n      <div class=\"stepper-content\">\n        <reporter-prev-situation [(previousReport)]=\"report.prevReport\"></reporter-prev-situation>\n      </div>\n\n      <div class=\"d-flex justify-content-between\">\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\n        </button>\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\n        </button>\n      </div>\n    </div>\n  </mat-step>\n\n\n  <!--STEP 3-->\n  <mat-step>\n    <ng-template matStepLabel>Situazione Attuale</ng-template>\n    <div class=\"stepper-content-wrapper\">\n      <div class=\"stepper-content\">\n       <reporter-current-situation [(currentReport)]=\"report.currReport\"></reporter-current-situation>\n      </div>\n      <div class=\"d-flex justify-content-between\">\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\n        </button>\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperNext>\n          Successivo<span class=\"fas fa-angle-right ms-2\"></span>\n        </button>\n      </div>\n    </div>\n  </mat-step>\n\n  <!--STEP 4-->\n  <mat-step>\n    <ng-template matStepLabel>Situazione Prevista</ng-template>\n    <div class=\"stepper-content-wrapper\">\n      <div class=\"stepper-content\">\n        <reporter-expected-situation [(forecastReport)]=\"report.foreReport\"></reporter-expected-situation>\n      </div>\n      <div class=\"d-flex justify-content-between\">\n        <button mat-flat-button color=\"primary\" class=\"me-2\" matStepperPrevious>\n          <span class=\"fas fa-angle-left me-2\"></span>Precedente\n        </button>\n        <button mat-flat-button color=\"primary\" class=\"me-2 bg-success\" (click)=\"createReport()\">\n          Genera Report\n        </button>\n      </div>\n    </div>\n  </mat-step>\n\n</mat-stepper>\n", styles: [".stepper-content-wrapper{padding:1em 0}.stepper-content{padding:1em}.map-container{border-radius:5px;overflow:hidden}:host ::ng-deep .angular-editor-wrapper{background-color:#f5f5f5;border-radius:5px 5px 0 0}:host ::ng-deep .mat-button-wrapper{display:flex;align-items:center}\n"] }]
        }], ctorParameters: function () { return [{ type: ReporterService }, { type: GeographicService }]; } });

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
ReporterAppContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterAppContainerComponent, deps: [{ token: APP_CONFIG }, { token: i3$1.FaviconService }, { token: i3$1.PortalService }], target: i0.ɵɵFactoryTarget.Component });
ReporterAppContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ReporterAppContainerComponent, selector: "reporter-app-container", ngImport: i0, template: "<cima-app-container mode=\"side\" [sidenavOpened]=\"false\"> <!--TODO ELIMINARE SIDENAV - ORA E' NASCOSTA-->\n<!--  <ng-container app-menu>\n    <a [routerLink]=\"['/', 'reporter']\">Home</a>\n  </ng-container>-->\n\n  <ng-container app-buttons>\n    <button mat-flat-button color=\"\" class=\"bg-warning\"><span class=\"fas fa-redo-alt me-2\"></span>Reset Report</button>\n    <button mat-flat-button color=\"primary\" class=\"bg-success\"><span class=\"fas fa-paper-plane me-2\"></span>Genera Report</button>\n  </ng-container>\n\n<!--  <app-sidenav-tab icon=\"list\" i18-label label=\"Tab Label\">\n    Contenuto Sidebar\n  </app-sidenav-tab>-->\n\n</cima-app-container>\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}:host{flex:1}:host ::ng-deep .mat-toolbar{border-bottom:solid 1px var(--border-color, #edeae9)}:host ::ng-deep .app-content{background-color:#fff!important;color:#1c1c1c!important}:host ::ng-deep .mat-tab-group.app-sidenav-tabber{background:white!important}:host ::ng-deep .mat-drawer-side.mat-drawer-end{border-color:var(--border-color, #edeae9)!important;box-shadow:5px 5px 15px 5px #0000001a}:host ::ng-deep .h-divider{border:0;border-bottom:1px solid var(--border-color, #edeae9);margin:5px 0}:host ::ng-deep .table{width:100%;margin-bottom:1rem;background-color:transparent;border-collapse:collapse}:host ::ng-deep .table td,:host ::ng-deep .table th{text-align:left;padding:.75rem;vertical-align:top;border-top:1px solid #dee2e6}:host ::ng-deep .table-striped tbody tr:nth-of-type(odd){background-color:#0000000d}\n"], components: [{ type: i3$1.AppContainerComponent, selector: "cima-app-container", inputs: ["mode", "hasBackdrop", "sidenavOpened", "sidenavWidth", "sidenavMinWidth"] }, { type: i7.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterAppContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-app-container', template: "<cima-app-container mode=\"side\" [sidenavOpened]=\"false\"> <!--TODO ELIMINARE SIDENAV - ORA E' NASCOSTA-->\n<!--  <ng-container app-menu>\n    <a [routerLink]=\"['/', 'reporter']\">Home</a>\n  </ng-container>-->\n\n  <ng-container app-buttons>\n    <button mat-flat-button color=\"\" class=\"bg-warning\"><span class=\"fas fa-redo-alt me-2\"></span>Reset Report</button>\n    <button mat-flat-button color=\"primary\" class=\"bg-success\"><span class=\"fas fa-paper-plane me-2\"></span>Genera Report</button>\n  </ng-container>\n\n<!--  <app-sidenav-tab icon=\"list\" i18-label label=\"Tab Label\">\n    Contenuto Sidebar\n  </app-sidenav-tab>-->\n\n</cima-app-container>\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}:host{flex:1}:host ::ng-deep .mat-toolbar{border-bottom:solid 1px var(--border-color, #edeae9)}:host ::ng-deep .app-content{background-color:#fff!important;color:#1c1c1c!important}:host ::ng-deep .mat-tab-group.app-sidenav-tabber{background:white!important}:host ::ng-deep .mat-drawer-side.mat-drawer-end{border-color:var(--border-color, #edeae9)!important;box-shadow:5px 5px 15px 5px #0000001a}:host ::ng-deep .h-divider{border:0;border-bottom:1px solid var(--border-color, #edeae9);margin:5px 0}:host ::ng-deep .table{width:100%;margin-bottom:1rem;background-color:transparent;border-collapse:collapse}:host ::ng-deep .table td,:host ::ng-deep .table th{text-align:left;padding:.75rem;vertical-align:top;border-top:1px solid #dee2e6}:host ::ng-deep .table-striped tbody tr:nth-of-type(odd){background-color:#0000000d}\n"] }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [APP_CONFIG]
                    }] }, { type: i3$1.FaviconService }, { type: i3$1.PortalService }];
    } });

const REPORTER_CONFIG = {
    name: 'reporter',
    description: 'Reporter',
    version: "0.1.15",
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
ReporterRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReporterRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterRoutingModule, imports: [i1$1.RouterModule], exports: [RouterModule] });
ReporterRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterRoutingModule, providers: [{ provide: APP_CONFIG, useValue: REPORTER_CONFIG }], imports: [[RouterModule.forChild(routes)], RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterRoutingModule, decorators: [{
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
    PrintLayoutComponent,
    ImgUploaderComponent,
    WarningPluvioComponent,
    WarningIdroComponent,
    MapComponentComponent
];
class CimaReporterModule {
}
CimaReporterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CimaReporterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CimaReporterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CimaReporterModule, declarations: [HomeComponent, ReporterAppContainerComponent,
        InitializationComponent,
        PrevSituationComponent,
        CurrentSituationComponent,
        ExpectedSituationComponent,
        PrintLayoutComponent,
        ImgUploaderComponent,
        WarningPluvioComponent,
        WarningIdroComponent,
        MapComponentComponent], imports: [CommonModule,
        CimaCommonsModule,
        ReporterRoutingModule,
        FormsModule], exports: [ReporterAppContainerComponent,
        InitializationComponent,
        PrevSituationComponent,
        CurrentSituationComponent,
        ExpectedSituationComponent,
        PrintLayoutComponent,
        ImgUploaderComponent,
        WarningPluvioComponent,
        WarningIdroComponent,
        MapComponentComponent] });
CimaReporterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CimaReporterModule, providers: [
        TimebarService,
        { provide: APP_CONFIG, useValue: REPORTER_CONFIG },
    ], imports: [[
            CommonModule,
            CimaCommonsModule,
            ReporterRoutingModule,
            FormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CimaReporterModule, decorators: [{
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

export { CimaReporterModule, CurrentSituationComponent, ExpectedSituationComponent, HomeComponent, ImgUploaderComponent, InitializationComponent, MapComponentComponent, PrevSituationComponent, PrintLayoutComponent, REPORTER_CONFIG, ReporterAppContainerComponent, WarningIdroComponent, WarningPluvioComponent };
//# sourceMappingURL=cima-reporter.mjs.map
