import { Component, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { ConfirmDialogComponent, ConfirmDialogModel } from "@cima/commons";
import * as i0 from "@angular/core";
import * as i1 from "../../services/reporter.service";
import * as i2 from "../../services/geographic.service";
import * as i3 from "@angular/material/dialog";
import * as i4 from "@angular/material/button";
export class MapComponentComponent {
    constructor(reportService, geoService, dialog) {
        this.reportService = reportService;
        this.geoService = geoService;
        this.dialog = dialog;
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
        this.view = undefined;
    }
    initDrawTool() {
        var drawnItems = new L.FeatureGroup();
        this.map.addLayer(drawnItems);
        var drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems
            }
        });
        this.map.addControl(drawControl);
    }
    initMap() {
        this.mapLoading = true;
        this.map = L.map('main_map').setView([0, 0], 1);
        ;
        //6.7499552751, 36.619987291, 18.4802470232, 47.1153931748
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.map.fitBounds([[36.619987291, 6.7499552751], [47.1153931748, 18.4802470232]]);
        //this.initDrawTool();
        this.map.invalidateSize(true);
        this._setView();
    }
    ngAfterViewInit() {
        this.initMap();
    }
    resetView() {
        this.map.flyTo([this.view.lat, this.view.lon], this.view.zoom);
    }
    _setView() {
        this.view = {
            lon: this.map.getCenter().lng,
            lat: this.map.getCenter().lat,
            zoom: this.map.getZoom(),
            bbox: this.map.getBounds()
        };
        console.log(this.view.bbox.toBBoxString());
        this.geoService.setViews(this.view);
    }
    setView() {
        /*    if (this.view !== undefined && !confirm('Procedendo alcuni parametri basati sul ritaglio verrano resettati. Vuoi procedere?')){
              this.resetView();
            } else this._setView();*/
        const dialogData = new ConfirmDialogModel($localize `Conferma operazione`, $localize `Procedendo alcuni parametri basati sul ritaglio verrano resettati. Vuoi procedere?`);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: dialogData,
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
            if (dialogResult) {
                this._setView();
            }
            else {
                this.resetView();
            }
        });
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
        this.reportService.getAncillaryLayer('regions_it').subscribe(data => {
            console.log(data);
            this.loadFeautures(data);
        });
    }
}
MapComponentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MapComponentComponent, deps: [{ token: i1.ReporterService }, { token: i2.GeographicService }, { token: i3.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
MapComponentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: MapComponentComponent, selector: "app-map-component", outputs: { selected: "selected" }, ngImport: i0, template: "<ng-container >\n  <div class=\"d-flex justify-content-between align-items-center mb-2\">\n    <h2 class=\"m-0\">Area Geografica di analisi</h2>\n    <div class=\"d-flex\">\n      <button mat-flat-button color=\"\" [disabled]=\"!view\" (click)=\"resetView()\"class=\"bg-warning me-2\">\n        <span class=\"fas fa-redo-alt me-2\"></span>Ripristina\n      </button>\n      <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"setView()\">\n        <span class=\"fas fa-crop me-2\"></span>Imposta ritaglio\n      </button>\n    </div>\n\n  </div>\n</ng-container>\n<div class=\"big-map\" id=\"main_map\"></div>\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}.big-map{width:100%;height:calc(100vh - 409px);z-index:1;min-height:400px}\n"], components: [{ type: i4.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MapComponentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-map-component', template: "<ng-container >\n  <div class=\"d-flex justify-content-between align-items-center mb-2\">\n    <h2 class=\"m-0\">Area Geografica di analisi</h2>\n    <div class=\"d-flex\">\n      <button mat-flat-button color=\"\" [disabled]=\"!view\" (click)=\"resetView()\"class=\"bg-warning me-2\">\n        <span class=\"fas fa-redo-alt me-2\"></span>Ripristina\n      </button>\n      <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"setView()\">\n        <span class=\"fas fa-crop me-2\"></span>Imposta ritaglio\n      </button>\n    </div>\n\n  </div>\n</ng-container>\n<div class=\"big-map\" id=\"main_map\"></div>\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}.big-map{width:100%;height:calc(100vh - 409px);z-index:1;min-height:400px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ReporterService }, { type: i2.GeographicService }, { type: i3.MatDialog }]; }, propDecorators: { selected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWNvbXBvbmVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jaW1hL3JlcG9ydGVyL3NyYy9saWIvY29tcG9uZW50cy9tYXAtY29tcG9uZW50L21hcC1jb21wb25lbnQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL2NvbXBvbmVudHMvbWFwLWNvbXBvbmVudC9tYXAtY29tcG9uZW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFDN0IsT0FBTyxjQUFjLENBQUM7QUFPdEIsT0FBTyxFQUFDLHNCQUFzQixFQUFFLGtCQUFrQixFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFPekUsTUFBTSxPQUFPLHFCQUFxQjtJQThCaEMsWUFBb0IsYUFBOEIsRUFDeEMsVUFBNkIsRUFBVSxNQUFpQjtRQUQ5QyxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDeEMsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBOUJ4RCxhQUFRLEdBQUMsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUU3QyxlQUFVLEdBQVUsS0FBSyxDQUFDO1FBQzFCLHNCQUFpQixHQUFRLEVBQUUsQ0FBQztRQUNwQixrQkFBYSxHQUFHO1lBQ3RCLGFBQWEsRUFBRTtnQkFDWCxNQUFNLEVBQUUsSUFBSTtnQkFDWixLQUFLLEVBQUUsU0FBUztnQkFDaEIsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsT0FBTyxFQUFFLENBQUM7Z0JBRVYsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFdBQVcs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cUJBQXFCO2tCQUxqQyxTQUFTOytCQUNFLG1CQUFtQjs4SkFLbkIsUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCAnbGVhZmxldC1kcmF3JztcbmltcG9ydCB7IEdlb2dyYXBoaWNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ2VvZ3JhcGhpYy5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIE1hdERpYWxvZyxcbiAgTUFUX0RJQUxPR19ERUZBVUxUX09QVElPTlMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBSZXBvcnRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZXBvcnRlci5zZXJ2aWNlJztcbmltcG9ydCB7Q29uZmlybURpYWxvZ0NvbXBvbmVudCwgQ29uZmlybURpYWxvZ01vZGVsfSBmcm9tIFwiQGNpbWEvY29tbW9uc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWFwLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXAtY29tcG9uZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWFwLWNvbXBvbmVudC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1hcENvbXBvbmVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZD1uZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuICBtYXA6IEwuTWFwO1xuICBtYXBMb2FkaW5nOiBib29sZWFuPWZhbHNlO1xuICBzZWxlY3RlZEZlYXV0dXJlczogYW55W109W107XG4gIHByaXZhdGUgZmVhdHVyZXNTdHlsZSA9IHtcbiAgICBkZWZhdWx0X3N0eWxlOiB7XG4gICAgICAgIHN0cm9rZTogdHJ1ZSxcbiAgICAgICAgY29sb3I6ICcjYTVhNTllJyxcbiAgICAgICAgd2VpZ2h0OiAyLFxuICAgICAgICBvcGFjaXR5OiAxLFxuXG4gICAgICAgIGZpbGw6IHRydWUsXG4gICAgICAgIGZpbGxDb2xvcjogJyNhNWE1OWUnLFxuICAgICAgICBmaWxsT3BhY2l0eTogMFxuICAgIH0sXG4gICAgc2VsZWN0ZWRfc3R5bGU6IHtcbiAgICAgICAgc3Ryb2tlOiBmYWxzZSxcbiAgICAgICAgY29sb3I6ICcjZDIzZTNlJyxcbiAgICAgICAgd2VpZ2h0OiAyLFxuICAgICAgICBvcGFjaXR5OiAxLFxuXG4gICAgICAgIGZpbGw6IHRydWUsXG4gICAgICAgIGZpbGxDb2xvcjogJyNkMjNlM2UnLFxuICAgICAgICBmaWxsT3BhY2l0eTogMC40XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHZpZXc6IGFueT11bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXBvcnRTZXJ2aWNlOiBSZXBvcnRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnZW9TZXJ2aWNlOiBHZW9ncmFwaGljU2VydmljZSwgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZykgeyB9XG5cblxuICBwcml2YXRlIGluaXREcmF3VG9vbCgpIHtcblxuXG4gICAgdmFyIGRyYXduSXRlbXMgPSBuZXcgTC5GZWF0dXJlR3JvdXAoKTtcbiAgICB0aGlzLm1hcC5hZGRMYXllcihkcmF3bkl0ZW1zKTtcbiAgICB2YXIgZHJhd0NvbnRyb2wgPSBuZXcgTC5Db250cm9sLkRyYXcoe1xuICAgICAgICBlZGl0OiB7XG4gICAgICAgICAgICBmZWF0dXJlR3JvdXA6IGRyYXduSXRlbXNcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubWFwLmFkZENvbnRyb2woZHJhd0NvbnRyb2wpO1xuICB9XG5cblxuXG4gIHByaXZhdGUgaW5pdE1hcCgpIHtcbiAgICB0aGlzLm1hcExvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMubWFwID0gTC5tYXAoJ21haW5fbWFwJykuc2V0VmlldyhbMCwgMF0sIDEpOztcbiAgICAvLzYuNzQ5OTU1Mjc1MSwgMzYuNjE5OTg3MjkxLCAxOC40ODAyNDcwMjMyLCA0Ny4xMTUzOTMxNzQ4XG4gICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICAgICAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xuICAgIH0pLmFkZFRvKHRoaXMubWFwKTtcblxuICAgIHRoaXMubWFwLmZpdEJvdW5kcyhbWzM2LjYxOTk4NzI5MSw2Ljc0OTk1NTI3NTEgXSxbNDcuMTE1MzkzMTc0OCwxOC40ODAyNDcwMjMyXV0pXG5cbiAgICAvL3RoaXMuaW5pdERyYXdUb29sKCk7XG4gICAgdGhpcy5tYXAuaW52YWxpZGF0ZVNpemUodHJ1ZSk7XG4gICAgdGhpcy5fc2V0VmlldygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdE1hcCgpO1xuXG4gIH1cblxuICBwdWJsaWMgcmVzZXRWaWV3KCkge1xuICAgIHRoaXMubWFwLmZseVRvKFt0aGlzLnZpZXcubGF0LCB0aGlzLnZpZXcubG9uXSx0aGlzLnZpZXcuem9vbSk7XG4gIH1cbiAgcHJpdmF0ZSBfc2V0VmlldygpIHtcbiAgICB0aGlzLnZpZXc9e1xuICAgICAgbG9uOiB0aGlzLm1hcC5nZXRDZW50ZXIoKS5sbmcsXG4gICAgICBsYXQ6IHRoaXMubWFwLmdldENlbnRlcigpLmxhdCxcbiAgICAgIHpvb206IHRoaXMubWFwLmdldFpvb20oKSxcbiAgICAgIGJib3g6IHRoaXMubWFwLmdldEJvdW5kcygpXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRoaXMudmlldy5iYm94LnRvQkJveFN0cmluZygpKTtcbiAgICB0aGlzLmdlb1NlcnZpY2Uuc2V0Vmlld3ModGhpcy52aWV3KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRWaWV3KCl7XG4vKiAgICBpZiAodGhpcy52aWV3ICE9PSB1bmRlZmluZWQgJiYgIWNvbmZpcm0oJ1Byb2NlZGVuZG8gYWxjdW5pIHBhcmFtZXRyaSBiYXNhdGkgc3VsIHJpdGFnbGlvIHZlcnJhbm8gcmVzZXR0YXRpLiBWdW9pIHByb2NlZGVyZT8nKSl7XG4gICAgICB0aGlzLnJlc2V0VmlldygpO1xuICAgIH0gZWxzZSB0aGlzLl9zZXRWaWV3KCk7Ki9cbiAgICBjb25zdCBkaWFsb2dEYXRhID0gbmV3IENvbmZpcm1EaWFsb2dNb2RlbChcbiAgICAgICRsb2NhbGl6ZWBDb25mZXJtYSBvcGVyYXppb25lYCxcbiAgICAgICRsb2NhbGl6ZWBQcm9jZWRlbmRvIGFsY3VuaSBwYXJhbWV0cmkgYmFzYXRpIHN1bCByaXRhZ2xpbyB2ZXJyYW5vIHJlc2V0dGF0aS4gVnVvaSBwcm9jZWRlcmU/YFxuICAgICk7XG4gICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDb25maXJtRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICBkYXRhOiBkaWFsb2dEYXRhLFxuICAgIH0pO1xuXG4gICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChkaWFsb2dSZXN1bHQ6YW55KSA9PiB7XG4gICAgICBpZiAoZGlhbG9nUmVzdWx0KSB7XG4gICAgICAgIHRoaXMuX3NldFZpZXcoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cblxuXG5cblxuXG4gIHByaXZhdGUgdXBkYXRlU2VsZWN0ZWQoKSB7XG4gICAgdmFyIHNlbHM6IGFueVtdPVtdO1xuICAgIHRoaXMuc2VsZWN0ZWRGZWF1dHVyZXMuZm9yRWFjaChcbiAgICAgIGl0bSA9PiBzZWxzLnB1c2goaXRtLnByb3BlcnRpZXMubm9tZV9yZWcpXG4gICAgKTtcbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQoc2Vscyk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRGZWF1dHVyZXMoZGF0YTogYW55KXtcbiAgICBMLmdlb0pTT04oZGF0YSx7XG4gICAgICBzdHlsZTogKGZlYXR1cmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmVhdHVyZXNTdHlsZS5kZWZhdWx0X3N0eWxlO1xuICAgICAgfSxcbiAgICAgIG9uRWFjaEZlYXR1cmU6IChmZWF0dXJlOiBhbnksIG1sYXllcjogYW55KSA9PiB7XG4gICAgICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXMuaWQgPSBmZWF0dXJlLmlkO1xuICAgICAgICAgIC8vIGlmICh0aGlzLnN0eWxlUHJvcGVydGllcyAmJiB0aGlzLnN0eWxlUHJvcGVydGllcy50b29sdGlwKSB7XG4gICAgICAgICAgLy8gICBtbGF5ZXIuYmluZFRvb2x0aXAodGhpcy5zdHlsZVByb3BlcnRpZXMudG9vbHRpcChmZWF0dXJlLnByb3BlcnRpZXMpKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgLy8gbWxheWVyLmJpbmRUb29sdGlwKGZlYXR1cmUucHJvcGVydGllcy5jb2RfYXJlYSArICc8YnI+JyArIGZlYXR1cmUucHJvcGVydGllcy5ub21lX2FyZWEpO1xuICAgICAgICB9XG4gICAgICAgIG1sYXllci5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBpZiAodGhpcy5zZWxlY3Rpb25FbmFibGVkKSB7XG4gICAgICAgICAgICAgIGZlYXR1cmUuc2VsZWN0ZWQgPSAhZmVhdHVyZS5zZWxlY3RlZDtcbiAgICAgICAgICAgICAgaWYgKGZlYXR1cmUuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBtbGF5ZXIuc2V0U3R5bGUodGhpcy5mZWF0dXJlc1N0eWxlLnNlbGVjdGVkX3N0eWxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRmVhdXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEZlYXV0dXJlcyA9IHRoaXMuc2VsZWN0ZWRGZWF1dHVyZXMuZmlsdGVyKCBpdG0gPT4gaXRtLnByb3BlcnRpZXMuZ2lkICE9PSBmZWF0dXJlLnByb3BlcnRpZXMuZ2lkKTtcbiAgICAgICAgICAgICAgICBtbGF5ZXIuc2V0U3R5bGUodGhpcy5mZWF0dXJlc1N0eWxlLmRlZmF1bHRfc3R5bGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWQoKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWxlY3RlZEZlYXV0dXJlcyk7XG4gICAgICAgICAgICAgIC8vdGhpcy5zZWxlY3RlZGxheWVyc0NoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRsYXllcnMpO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgdGhpcy5qc29ubGF5ZXIucmVzZXRTdHlsZSgpO1xuICAgICAgICAgICAgLy8gICBtbGF5ZXIuc2V0U3R5bGUodGhpcy5hdmFpbGFibGVTdHlsZXMuc2VsZWN0ZWRfc3R5bGUpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy90aGlzLmxheWVyY2xpY2suZW1pdChmZWF0dXJlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgICAgKS5hZGRUbyh0aGlzLm1hcCk7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZXBvcnRTZXJ2aWNlLmdldEFuY2lsbGFyeUxheWVyKCdyZWdpb25zX2l0Jykuc3Vic2NyaWJlKFxuICAgICAgZGF0YSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB0aGlzLmxvYWRGZWF1dHVyZXMoZGF0YSk7XG4gICAgICB9XG4gICAgKVxuICB9XG5cbn1cbiIsIjxuZy1jb250YWluZXIgPlxuICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgPGgyIGNsYXNzPVwibS0wXCI+QXJlYSBHZW9ncmFmaWNhIGRpIGFuYWxpc2k8L2gyPlxuICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj5cbiAgICAgIDxidXR0b24gbWF0LWZsYXQtYnV0dG9uIGNvbG9yPVwiXCIgW2Rpc2FibGVkXT1cIiF2aWV3XCIgKGNsaWNrKT1cInJlc2V0VmlldygpXCJjbGFzcz1cImJnLXdhcm5pbmcgbWUtMlwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1yZWRvLWFsdCBtZS0yXCI+PC9zcGFuPlJpcHJpc3RpbmFcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtZmxhdC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgY2xhc3M9XCJiZy1zdWNjZXNzXCIgKGNsaWNrKT1cInNldFZpZXcoKVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1jcm9wIG1lLTJcIj48L3NwYW4+SW1wb3N0YSByaXRhZ2xpb1xuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbjxkaXYgY2xhc3M9XCJiaWctbWFwXCIgaWQ9XCJtYWluX21hcFwiPjwvZGl2PlxuIl19