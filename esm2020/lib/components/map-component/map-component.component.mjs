import { Component, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { ConfirmDialogComponent, ConfirmDialogModel } from "@cima/commons";
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../services/reporter.service";
import * as i2 from "../../services/geographic.service";
import * as i3 from "@angular/material/dialog";
import * as i4 from "@angular/common";
export class MapComponentComponent {
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
MapComponentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MapComponentComponent, deps: [{ token: i1.ReporterService }, { token: i2.GeographicService }, { token: i3.MatDialog }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MapComponentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: MapComponentComponent, selector: "app-map-component", outputs: { selected: "selected" }, ngImport: i0, template: "<ng-container >\n  <div class=\"d-flex justify-content-between align-items-center mb-2\">\n    <h2 class=\"m-0\">Area Geografica di analisi</h2>\n    <!-- <div class=\"d-flex\">\n      <button mat-flat-button color=\"\" [disabled]=\"!view\" (click)=\"resetView()\"class=\"bg-warning me-2\">\n        <span class=\"fas fa-redo-alt me-2\"></span>Ripristina\n      </button>\n      <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"setView()\">\n        <span class=\"fas fa-crop me-2\"></span>Imposta ritaglio\n      </button>\n    </div> -->\n\n  </div>\n</ng-container>\n\n<div class=\"big-map\" id=\"main_map\">\n   <div class=\"crop-overlay\" *ngIf=\"!view.bbox\">\n     <span><span class=\"fas fa-arrow-left me-2\"></span>Seleziona un ritaglio per proseguire</span>\n  </div>\n</div>\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}.big-map{width:100%;height:calc(100vh - 409px);z-index:1;min-height:400px;position:relative}.crop-overlay{position:absolute;left:58px;top:86px;z-index:410;background-color:red;color:#fff;border-radius:4px;padding:5px;font-size:1.2em}\n"], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MapComponentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-map-component', template: "<ng-container >\n  <div class=\"d-flex justify-content-between align-items-center mb-2\">\n    <h2 class=\"m-0\">Area Geografica di analisi</h2>\n    <!-- <div class=\"d-flex\">\n      <button mat-flat-button color=\"\" [disabled]=\"!view\" (click)=\"resetView()\"class=\"bg-warning me-2\">\n        <span class=\"fas fa-redo-alt me-2\"></span>Ripristina\n      </button>\n      <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"setView()\">\n        <span class=\"fas fa-crop me-2\"></span>Imposta ritaglio\n      </button>\n    </div> -->\n\n  </div>\n</ng-container>\n\n<div class=\"big-map\" id=\"main_map\">\n   <div class=\"crop-overlay\" *ngIf=\"!view.bbox\">\n     <span><span class=\"fas fa-arrow-left me-2\"></span>Seleziona un ritaglio per proseguire</span>\n  </div>\n</div>\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}.big-map{width:100%;height:calc(100vh - 409px);z-index:1;min-height:400px;position:relative}.crop-overlay{position:absolute;left:58px;top:86px;z-index:410;background-color:red;color:#fff;border-radius:4px;padding:5px;font-size:1.2em}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ReporterService }, { type: i2.GeographicService }, { type: i3.MatDialog }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { selected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWNvbXBvbmVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jaW1hL3JlcG9ydGVyL3NyYy9saWIvY29tcG9uZW50cy9tYXAtY29tcG9uZW50L21hcC1jb21wb25lbnQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL2NvbXBvbmVudHMvbWFwLWNvbXBvbmVudC9tYXAtY29tcG9uZW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBVSxNQUFNLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzdCLE9BQU8sY0FBYyxDQUFDO0FBT3RCLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7QUFRdEMsTUFBTSxPQUFPLHFCQUFxQjtJQWdDaEMsWUFBb0IsYUFBOEIsRUFDeEMsVUFBNkIsRUFBVSxNQUFpQixFQUFVLElBQXNCO1FBRDlFLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUN4QyxlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVc7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFrQjtRQWhDeEYsYUFBUSxHQUFDLElBQUksWUFBWSxFQUFTLENBQUM7UUFFN0MsZUFBVSxHQUFVLEtBQUssQ0FBQztRQUMxQixzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFDcEIsa0JBQWEsR0FBRztZQUN0QixhQUFhLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLElBQUk7Z0JBQ1osS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLE1BQU0sRUFBRSxD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Q0FDdkQsSUFBSSxDQUFDLEVBQUU7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDOzttSEF0TlUscUJBQXFCO3VHQUFyQixxQkFBcUIsNEZDbEJsQyw2eUJBb0JBOzRGREZhLHFCQUFxQjtrQkFMakMsU0FBUzsrQkFDRSxtQkFBbUI7OExBS25CLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPdXRwdXQsIENoYW5nZURldGVjdG9yUmVmICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCAnbGVhZmxldC1kcmF3JztcbmltcG9ydCB7IEdlb2dyYXBoaWNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ2VvZ3JhcGhpYy5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIE1hdERpYWxvZyxcbiAgTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBSZXBvcnRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZXBvcnRlci5zZXJ2aWNlJztcbmltcG9ydCB7Q29uZmlybURpYWxvZ0NvbXBvbmVudCwgQ29uZmlybURpYWxvZ01vZGVsfSBmcm9tIFwiQGNpbWEvY29tbW9uc1wiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWFwLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXAtY29tcG9uZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWFwLWNvbXBvbmVudC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1hcENvbXBvbmVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZD1uZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuICBtYXA6IEwuTWFwO1xuICBtYXBMb2FkaW5nOiBib29sZWFuPWZhbHNlO1xuICBzZWxlY3RlZEZlYXV0dXJlczogYW55W109W107XG4gIHByaXZhdGUgZmVhdHVyZXNTdHlsZSA9IHtcbiAgICBkZWZhdWx0X3N0eWxlOiB7XG4gICAgICAgIHN0cm9rZTogdHJ1ZSxcbiAgICAgICAgY29sb3I6ICcjYTVhNTllJyxcbiAgICAgICAgd2VpZ2h0OiAyLFxuICAgICAgICBvcGFjaXR5OiAxLFxuXG4gICAgICAgIGZpbGw6IHRydWUsXG4gICAgICAgIGZpbGxDb2xvcjogJyNhNWE1OWUnLFxuICAgICAgICBmaWxsT3BhY2l0eTogMFxuICAgIH0sXG4gICAgc2VsZWN0ZWRfc3R5bGU6IHtcbiAgICAgICAgc3Ryb2tlOiBmYWxzZSxcbiAgICAgICAgY29sb3I6ICcjZDIzZTNlJyxcbiAgICAgICAgd2VpZ2h0OiAyLFxuICAgICAgICBvcGFjaXR5OiAxLFxuXG4gICAgICAgIGZpbGw6IHRydWUsXG4gICAgICAgIGZpbGxDb2xvcjogJyNkMjNlM2UnLFxuICAgICAgICBmaWxsT3BhY2l0eTogMC40XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHZpZXc6IGFueT17fTtcblxuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXBvcnRTZXJ2aWNlOiBSZXBvcnRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnZW9TZXJ2aWNlOiBHZW9ncmFwaGljU2VydmljZSwgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZywgcHJpdmF0ZSBfcmVmOkNoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuXG5cblxuICBwcml2YXRlIGluaXREcmF3VG9vbCgpIHtcblxuICAgIHZhciBkcmF3bkl0ZW1zID0gbmV3IEwuRmVhdHVyZUdyb3VwKCk7XG4gICAgdGhpcy5tYXAuYWRkTGF5ZXIoZHJhd25JdGVtcyk7XG5cbiAgICB2YXIgZHJhd0NvbnRyb2wgPSBuZXcgTC5Db250cm9sLkRyYXcoe1xuICAgICAgICBkcmF3OiB7XG4gICAgICAgICAgcG9seWxpbmU6IGZhbHNlLFxuICAgICAgICAgIGNpcmNsZTogZmFsc2UsXG4gICAgICAgICAgcG9seWdvbjogZmFsc2UsXG4gICAgICAgICAgbWFya2VyOiBmYWxzZSxcbiAgICAgICAgICBjaXJjbGVtYXJrZXI6IGZhbHNlLFxuICAgICAgICAgIHJlY3RhbmdsZToge31cbiAgICAgICAgfSxcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgICAgZmVhdHVyZUdyb3VwOiBkcmF3bkl0ZW1zLFxuICAgICAgICB9XG5cbiAgICB9KTtcblxuXG4gICAgdGhpcy5tYXAuYWRkQ29udHJvbChkcmF3Q29udHJvbCk7XG4gICAgdGhpcy5tYXAub24oTC5EcmF3LkV2ZW50LkRSQVdTVE9QLCAoZTogYW55KSA9PiB7XG4gICAgICAgIGlmIChkcmF3bkl0ZW1zLmdldExheWVycygpLmxlbmd0aD09MCl7XG4gICAgICAgICAgZHJhd25JdGVtcy5hZGRMYXllcihMLnJlY3RhbmdsZSh0aGlzLnZpZXcuYmJveCkpO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIHRoaXMubWFwLm9uKEwuRHJhdy5FdmVudC5DUkVBVEVELCAoZTogYW55KSA9PiB7XG4gICAgICBkcmF3bkl0ZW1zLmFkZExheWVyKGUubGF5ZXIpXG4gICAgICB0aGlzLmNhblNldEJvdW5kaW5nKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICB0aGlzLnNldFZpZXcoZS5sYXllci5nZXRCb3VuZHMoKSlcbiAgICAgICAgICB0aGlzLnJlcG9ydFNlcnZpY2UuYmJveFNldCA9IHRydWVcbiAgICAgICAgICB0aGlzLl9yZWYubWFya0ZvckNoZWNrKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlLmxheWVyLnNldEJvdW5kcyh0aGlzLnZpZXcuYmJveCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICB9KTtcblxuICAgIHRoaXMubWFwLm9uKEwuRHJhdy5FdmVudC5FRElURUQsIChlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuY2FuU2V0Qm91bmRpbmcoKS5zdWJzY3JpYmUocmVzdWx0PT57XG4gICAgICAgIGlmIChyZXN1bHQpe1xuICAgICAgICAgIHRoaXMuc2V0VmlldyhlLmxheWVycy5nZXRMYXllcnMoKVswXS5nZXRCb3VuZHMoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZS5sYXllcnMuZ2V0TGF5ZXJzKClbMF0uc2V0Qm91bmRzKHRoaXMudmlldy5iYm94KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KTtcbiAgICB0aGlzLm1hcC5vbihMLkRyYXcuRXZlbnQuREVMRVRFRCwgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5jYW5TZXRCb3VuZGluZygpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KXtcbiAgICAgICAgICB0aGlzLnNldFZpZXcodW5kZWZpbmVkKTtcbiAgICAgICAgICB0aGlzLnJlcG9ydFNlcnZpY2UuYmJveFNldCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHJhd25JdGVtcy5hZGRMYXllcihlLmxheWVycy5nZXRMYXllcnMoKVswXSlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIH0pO1xuICAgIHRoaXMubWFwLm9uKEwuRHJhdy5FdmVudC5EUkFXU1RBUlQsIChlOiBhbnkpID0+IHtcbiAgICAgIGRyYXduSXRlbXMuY2xlYXJMYXllcnMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2FuU2V0Qm91bmRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc3QgZGlhbG9nRGF0YSA9IG5ldyBDb25maXJtRGlhbG9nTW9kZWwoXG4gICAgICAkbG9jYWxpemVgQ29uZmVybWEgb3BlcmF6aW9uZWAsXG4gICAgICAkbG9jYWxpemVgUHJvY2VkZW5kbyBhbGN1bmkgcGFyYW1ldHJpIGJhc2F0aSBzdWwgcml0YWdsaW8gdmVycmFubyByZXNldHRhdGkuIFZ1b2kgcHJvY2VkZXJlP2BcbiAgICApO1xuICAgIGlmICh0aGlzLmdlb1NlcnZpY2UuaXNMb2NrZWQoKSl7XG4gICAgICByZXR1cm4gdGhpcy5kaWFsb2cub3BlbihDb25maXJtRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgIGRhdGE6IGRpYWxvZ0RhdGEsXG4gICAgICB9KS5hZnRlckNsb3NlZCgpO1xuICAgIH0gZWxzZSByZXR1cm4gb2YodHJ1ZSk7XG4gIH1cblxuXG4gIHByaXZhdGUgaW5pdE1hcCgpIHtcbiAgICB0aGlzLm1hcExvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMubWFwID0gTC5tYXAoJ21haW5fbWFwJywge3Njcm9sbFdoZWVsWm9vbTogZmFsc2V9KS5zZXRWaWV3KFswLCAwXSwgMSk7XG4gICAgLy82Ljc0OTk1NTI3NTEsIDM2LjYxOTk4NzI5MSwgMTguNDgwMjQ3MDIzMiwgNDcuMTE1MzkzMTc0OFxuICAgIEwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcbiAgICAgICAgYXR0cmlidXRpb246ICcmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycycsXG4gICAgfSkuYWRkVG8odGhpcy5tYXApO1xuXG4gICAgdGhpcy5tYXAuZml0Qm91bmRzKFtbMzYuNjE5OTg3MjkxLDYuNzQ5OTU1Mjc1MSBdLFs0Ny4xMTUzOTMxNzQ4LDE4LjQ4MDI0NzAyMzJdXSlcblxuICAgIHRoaXMuaW5pdERyYXdUb29sKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgIHRoaXMubWFwLmludmFsaWRhdGVTaXplKHRydWUpO1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZXNpemUnKSk7XG4gICAgfSwyMDApO1xuXG4gICAgdGhpcy5zZXRWaWV3KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0TWFwKCk7XG5cbiAgfVxuXG4gIHB1YmxpYyByZXNldFZpZXcoKSB7XG4gICAgdGhpcy5tYXAuZmx5VG8oW3RoaXMudmlldy5sYXQsIHRoaXMudmlldy5sb25dLHRoaXMudmlldy56b29tKTtcbiAgfVxuXG5cbiAgcHVibGljIHNldFZpZXcoYm91bmRpbmc/OiBMLkxhdExuZ0JvdW5kcyl7XG4gICAgdGhpcy52aWV3PXtcbiAgICAgIGxvbjogdGhpcy5tYXAuZ2V0Q2VudGVyKCkubG5nLFxuICAgICAgbGF0OiB0aGlzLm1hcC5nZXRDZW50ZXIoKS5sYXQsXG4gICAgICB6b29tOiB0aGlzLm1hcC5nZXRab29tKCksXG4gICAgICBiYm94OiBib3VuZGluZ1xuICAgIH1cbiAgICB0aGlzLmdlb1NlcnZpY2Uuc2V0Vmlld3ModGhpcy52aWV3KTtcbiAgfVxuXG5cblxuXG5cblxuICBwcml2YXRlIHVwZGF0ZVNlbGVjdGVkKCkge1xuICAgIHZhciBzZWxzOiBhbnlbXT1bXTtcbiAgICB0aGlzLnNlbGVjdGVkRmVhdXR1cmVzLmZvckVhY2goXG4gICAgICBpdG0gPT4gc2Vscy5wdXNoKGl0bS5wcm9wZXJ0aWVzLm5vbWVfcmVnKVxuICAgICk7XG4gICAgdGhpcy5zZWxlY3RlZC5lbWl0KHNlbHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRmVhdXR1cmVzKGRhdGE6IGFueSl7XG4gICAgTC5nZW9KU09OKGRhdGEse1xuICAgICAgc3R5bGU6IChmZWF0dXJlKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZlYXR1cmVzU3R5bGUuZGVmYXVsdF9zdHlsZTtcbiAgICAgIH0sXG4gICAgICBvbkVhY2hGZWF0dXJlOiAoZmVhdHVyZTogYW55LCBtbGF5ZXI6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLmlkID0gZmVhdHVyZS5pZDtcbiAgICAgICAgICAvLyBpZiAodGhpcy5zdHlsZVByb3BlcnRpZXMgJiYgdGhpcy5zdHlsZVByb3BlcnRpZXMudG9vbHRpcCkge1xuICAgICAgICAgIC8vICAgbWxheWVyLmJpbmRUb29sdGlwKHRoaXMuc3R5bGVQcm9wZXJ0aWVzLnRvb2x0aXAoZmVhdHVyZS5wcm9wZXJ0aWVzKSk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIC8vIG1sYXllci5iaW5kVG9vbHRpcChmZWF0dXJlLnByb3BlcnRpZXMuY29kX2FyZWEgKyAnPGJyPicgKyBmZWF0dXJlLnByb3BlcnRpZXMubm9tZV9hcmVhKTtcbiAgICAgICAgfVxuICAgICAgICBtbGF5ZXIub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gaWYgKHRoaXMuc2VsZWN0aW9uRW5hYmxlZCkge1xuICAgICAgICAgICAgICBmZWF0dXJlLnNlbGVjdGVkID0gIWZlYXR1cmUuc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgIGlmIChmZWF0dXJlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgbWxheWVyLnNldFN0eWxlKHRoaXMuZmVhdHVyZXNTdHlsZS5zZWxlY3RlZF9zdHlsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEZlYXV0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRGZWF1dHVyZXMgPSB0aGlzLnNlbGVjdGVkRmVhdXR1cmVzLmZpbHRlciggaXRtID0+IGl0bS5wcm9wZXJ0aWVzLmdpZCAhPT0gZmVhdHVyZS5wcm9wZXJ0aWVzLmdpZCk7XG4gICAgICAgICAgICAgICAgbWxheWVyLnNldFN0eWxlKHRoaXMuZmVhdHVyZXNTdHlsZS5kZWZhdWx0X3N0eWxlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkKCk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRGZWF1dHVyZXMpO1xuICAgICAgICAgICAgICAvL3RoaXMuc2VsZWN0ZWRsYXllcnNDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkbGF5ZXJzKTtcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgIHRoaXMuanNvbmxheWVyLnJlc2V0U3R5bGUoKTtcbiAgICAgICAgICAgIC8vICAgbWxheWVyLnNldFN0eWxlKHRoaXMuYXZhaWxhYmxlU3R5bGVzLnNlbGVjdGVkX3N0eWxlKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vdGhpcy5sYXllcmNsaWNrLmVtaXQoZmVhdHVyZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICAgICkuYWRkVG8odGhpcy5tYXApO1xuICB9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVwb3J0U2VydmljZS5nZXRBbmNpbGxhcnlMYXllcigncmVnaW9ucycpLnN1YnNjcmliZShcbiAgICAgIGRhdGEgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgdGhpcy5sb2FkRmVhdXR1cmVzKGRhdGEpO1xuICAgICAgfVxuICAgIClcbiAgfVxuXG59XG4iLCI8bmctY29udGFpbmVyID5cbiAgPGRpdiBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXIgbWItMlwiPlxuICAgIDxoMiBjbGFzcz1cIm0tMFwiPkFyZWEgR2VvZ3JhZmljYSBkaSBhbmFsaXNpPC9oMj5cbiAgICA8IS0tIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj5cbiAgICAgIDxidXR0b24gbWF0LWZsYXQtYnV0dG9uIGNvbG9yPVwiXCIgW2Rpc2FibGVkXT1cIiF2aWV3XCIgKGNsaWNrKT1cInJlc2V0VmlldygpXCJjbGFzcz1cImJnLXdhcm5pbmcgbWUtMlwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1yZWRvLWFsdCBtZS0yXCI+PC9zcGFuPlJpcHJpc3RpbmFcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtZmxhdC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgY2xhc3M9XCJiZy1zdWNjZXNzXCIgKGNsaWNrKT1cInNldFZpZXcoKVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1jcm9wIG1lLTJcIj48L3NwYW4+SW1wb3N0YSByaXRhZ2xpb1xuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+IC0tPlxuXG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxkaXYgY2xhc3M9XCJiaWctbWFwXCIgaWQ9XCJtYWluX21hcFwiPlxuICAgPGRpdiBjbGFzcz1cImNyb3Atb3ZlcmxheVwiICpuZ0lmPVwiIXZpZXcuYmJveFwiPlxuICAgICA8c3Bhbj48c3BhbiBjbGFzcz1cImZhcyBmYS1hcnJvdy1sZWZ0IG1lLTJcIj48L3NwYW4+U2VsZXppb25hIHVuIHJpdGFnbGlvIHBlciBwcm9zZWd1aXJlPC9zcGFuPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19