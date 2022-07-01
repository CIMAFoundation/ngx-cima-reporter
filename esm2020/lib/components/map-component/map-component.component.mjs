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
        setTimeout(() => {
            this.map.invalidateSize(true);
        }, 200);
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
            bbox: this.map.getBounds().pad(-0.1),
        };
        this.geoService.setViews(this.view);
    }
    setView() {
        const dialogData = new ConfirmDialogModel($localize `Conferma operazione`, $localize `Procedendo alcuni parametri basati sul ritaglio verrano resettati. Vuoi procedere?`);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: dialogData,
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
            if (dialogResult) {
                this._setView();
                console.log('setview', this.view);
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
        this.reportService.getAncillaryLayer('regions').subscribe(data => {
            console.log(data);
            this.loadFeautures(data);
        });
    }
}
MapComponentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MapComponentComponent, deps: [{ token: i1.ReporterService }, { token: i2.GeographicService }, { token: i3.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
MapComponentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: MapComponentComponent, selector: "app-map-component", outputs: { selected: "selected" }, ngImport: i0, template: "<ng-container >\n  <div class=\"d-flex justify-content-between align-items-center mb-2\">\n    <h2 class=\"m-0\">Area Geografica di analisi</h2>\n    <div class=\"d-flex\">\n      <button mat-flat-button color=\"\" [disabled]=\"!view\" (click)=\"resetView()\"class=\"bg-warning me-2\">\n        <span class=\"fas fa-redo-alt me-2\"></span>Ripristina\n      </button>\n      <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"setView()\">\n        <span class=\"fas fa-crop me-2\"></span>Imposta ritaglio\n      </button>\n    </div>\n\n  </div>\n</ng-container>\n<div class=\"big-map\" id=\"main_map\">\n  <div class=\"crop-overlay\">\n    <div class=\"text-map-overlay\">AREA SELEZIONATA</div>\n  </div>\n</div>\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}.big-map{width:100%;height:calc(100vh - 409px);z-index:1;min-height:400px;position:relative}.crop-overlay{position:absolute;left:10%;top:10%;right:10%;bottom:10%;border:2px solid red;z-index:410;color:#fff;border-radius:4px}.crop-overlay .text-map-overlay{background-color:red;border-radius:4px 4px 0 0;transform:translateY(-100%);width:-moz-fit-content;width:fit-content;padding:5px}\n"], components: [{ type: i4.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MapComponentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-map-component', template: "<ng-container >\n  <div class=\"d-flex justify-content-between align-items-center mb-2\">\n    <h2 class=\"m-0\">Area Geografica di analisi</h2>\n    <div class=\"d-flex\">\n      <button mat-flat-button color=\"\" [disabled]=\"!view\" (click)=\"resetView()\"class=\"bg-warning me-2\">\n        <span class=\"fas fa-redo-alt me-2\"></span>Ripristina\n      </button>\n      <button mat-flat-button color=\"primary\" class=\"bg-success\" (click)=\"setView()\">\n        <span class=\"fas fa-crop me-2\"></span>Imposta ritaglio\n      </button>\n    </div>\n\n  </div>\n</ng-container>\n<div class=\"big-map\" id=\"main_map\">\n  <div class=\"crop-overlay\">\n    <div class=\"text-map-overlay\">AREA SELEZIONATA</div>\n  </div>\n</div>\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}.big-map{width:100%;height:calc(100vh - 409px);z-index:1;min-height:400px;position:relative}.crop-overlay{position:absolute;left:10%;top:10%;right:10%;bottom:10%;border:2px solid red;z-index:410;color:#fff;border-radius:4px}.crop-overlay .text-map-overlay{background-color:red;border-radius:4px 4px 0 0;transform:translateY(-100%);width:-moz-fit-content;width:fit-content;padding:5px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ReporterService }, { type: i2.GeographicService }, { type: i3.MatDialog }]; }, propDecorators: { selected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWNvbXBvbmVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jaW1hL3JlcG9ydGVyL3NyYy9saWIvY29tcG9uZW50cy9tYXAtY29tcG9uZW50L21hcC1jb21wb25lbnQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL2NvbXBvbmVudHMvbWFwLWNvbXBvbmVudC9tYXAtY29tcG9uZW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFDN0IsT0FBTyxjQUFjLENBQUM7QUFPdEIsT0FBTyxFQUFDLHNCQUFzQixFQUFFLGtCQUFrQixFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFPekUsTUFBTSxPQUFPLHFCQUFxQjtJQThCaEMsWUFBb0IsYUFBOEIsRUFDeEMsVUFBNkIsRUFBVSxNQUFpQjtRQUQ5QyxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDeEMsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBOUJ4RCxhQUFRLEdBQUMsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUU3QyxlQUFVLEdBQVUsS0FBSyxDQUFDO1FBQzFCLHNCQUFpQixHQUFRLEVBQUUsQ0FBQztRQUNwQixrQkFBYSxHQUFHO1lBQ3RCLGFBQWEsRUFBRTtnQkFDWCxNQUFNLEVBQUUsSUFBSTtnQkFDWixLQUFLLEVBQUUsU0FBUztnQkFDaEIsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsT0FBTyxFQUFFLENBQUM7Z0JBRVYsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFdBQVcs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Q0FBQzs7bUhBaktVLHFCQUFxQjt1R0FBckIscUJBQXFCLDRGQ2hCbEMsa3VCQW1CQTs0RkRIYSxxQkFBcUI7a0JBTGpDLFNBQVM7K0JBQ0UsbUJBQW1COzhKQUtuQixRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0ICdsZWFmbGV0LWRyYXcnO1xuaW1wb3J0IHsgR2VvZ3JhcGhpY1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nZW9ncmFwaGljLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgTWF0RGlhbG9nLFxuICBNQVRfRElBTE9HX0RFRkFVTFRfT1BUSU9OUyxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFJlcG9ydGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlcG9ydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHtDb25maXJtRGlhbG9nQ29tcG9uZW50LCBDb25maXJtRGlhbG9nTW9kZWx9IGZyb20gXCJAY2ltYS9jb21tb25zXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tYXAtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hcC1jb21wb25lbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXAtY29tcG9uZW50LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWFwQ29tcG9uZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQE91dHB1dCgpIHNlbGVjdGVkPW5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG4gIG1hcDogTC5NYXA7XG4gIG1hcExvYWRpbmc6IGJvb2xlYW49ZmFsc2U7XG4gIHNlbGVjdGVkRmVhdXR1cmVzOiBhbnlbXT1bXTtcbiAgcHJpdmF0ZSBmZWF0dXJlc1N0eWxlID0ge1xuICAgIGRlZmF1bHRfc3R5bGU6IHtcbiAgICAgICAgc3Ryb2tlOiB0cnVlLFxuICAgICAgICBjb2xvcjogJyNhNWE1OWUnLFxuICAgICAgICB3ZWlnaHQ6IDIsXG4gICAgICAgIG9wYWNpdHk6IDEsXG5cbiAgICAgICAgZmlsbDogdHJ1ZSxcbiAgICAgICAgZmlsbENvbG9yOiAnI2E1YTU5ZScsXG4gICAgICAgIGZpbGxPcGFjaXR5OiAwXG4gICAgfSxcbiAgICBzZWxlY3RlZF9zdHlsZToge1xuICAgICAgICBzdHJva2U6IGZhbHNlLFxuICAgICAgICBjb2xvcjogJyNkMjNlM2UnLFxuICAgICAgICB3ZWlnaHQ6IDIsXG4gICAgICAgIG9wYWNpdHk6IDEsXG5cbiAgICAgICAgZmlsbDogdHJ1ZSxcbiAgICAgICAgZmlsbENvbG9yOiAnI2QyM2UzZScsXG4gICAgICAgIGZpbGxPcGFjaXR5OiAwLjRcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdmlldzogYW55PXVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlcG9ydFNlcnZpY2U6IFJlcG9ydGVyU2VydmljZSxcbiAgICBwcml2YXRlIGdlb1NlcnZpY2U6IEdlb2dyYXBoaWNTZXJ2aWNlLCBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nKSB7IH1cblxuXG4gIHByaXZhdGUgaW5pdERyYXdUb29sKCkge1xuXG5cbiAgICB2YXIgZHJhd25JdGVtcyA9IG5ldyBMLkZlYXR1cmVHcm91cCgpO1xuICAgIHRoaXMubWFwLmFkZExheWVyKGRyYXduSXRlbXMpO1xuICAgIHZhciBkcmF3Q29udHJvbCA9IG5ldyBMLkNvbnRyb2wuRHJhdyh7XG4gICAgICAgIGVkaXQ6IHtcbiAgICAgICAgICAgIGZlYXR1cmVHcm91cDogZHJhd25JdGVtc1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tYXAuYWRkQ29udHJvbChkcmF3Q29udHJvbCk7XG4gIH1cblxuXG5cbiAgcHJpdmF0ZSBpbml0TWFwKCkge1xuICAgIHRoaXMubWFwTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5tYXAgPSBMLm1hcCgnbWFpbl9tYXAnKS5zZXRWaWV3KFswLCAwXSwgMSk7O1xuICAgIC8vNi43NDk5NTUyNzUxLCAzNi42MTk5ODcyOTEsIDE4LjQ4MDI0NzAyMzIsIDQ3LjExNTM5MzE3NDhcbiAgICBMLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XG4gICAgICAgIGF0dHJpYnV0aW9uOiAnJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXG4gICAgfSkuYWRkVG8odGhpcy5tYXApO1xuXG4gICAgdGhpcy5tYXAuZml0Qm91bmRzKFtbMzYuNjE5OTg3MjkxLDYuNzQ5OTU1Mjc1MSBdLFs0Ny4xMTUzOTMxNzQ4LDE4LjQ4MDI0NzAyMzJdXSlcblxuICAgIC8vdGhpcy5pbml0RHJhd1Rvb2woKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+e1xuICAgICAgdGhpcy5tYXAuaW52YWxpZGF0ZVNpemUodHJ1ZSk7XG4gICAgfSwyMDApO1xuXG4gICAgdGhpcy5fc2V0VmlldygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdE1hcCgpO1xuXG4gIH1cblxuICBwdWJsaWMgcmVzZXRWaWV3KCkge1xuICAgIHRoaXMubWFwLmZseVRvKFt0aGlzLnZpZXcubGF0LCB0aGlzLnZpZXcubG9uXSx0aGlzLnZpZXcuem9vbSk7XG4gIH1cbiAgcHJpdmF0ZSBfc2V0VmlldygpIHtcbiAgICB0aGlzLnZpZXc9e1xuICAgICAgbG9uOiB0aGlzLm1hcC5nZXRDZW50ZXIoKS5sbmcsXG4gICAgICBsYXQ6IHRoaXMubWFwLmdldENlbnRlcigpLmxhdCxcbiAgICAgIHpvb206IHRoaXMubWFwLmdldFpvb20oKSxcbiAgICAgIGJib3g6IHRoaXMubWFwLmdldEJvdW5kcygpLnBhZCgtMC4xKSxcbiAgICB9XG4gICAgdGhpcy5nZW9TZXJ2aWNlLnNldFZpZXdzKHRoaXMudmlldyk7XG4gIH1cblxuICBwdWJsaWMgc2V0Vmlldygpe1xuICAgIGNvbnN0IGRpYWxvZ0RhdGEgPSBuZXcgQ29uZmlybURpYWxvZ01vZGVsKFxuICAgICAgJGxvY2FsaXplYENvbmZlcm1hIG9wZXJhemlvbmVgLFxuICAgICAgJGxvY2FsaXplYFByb2NlZGVuZG8gYWxjdW5pIHBhcmFtZXRyaSBiYXNhdGkgc3VsIHJpdGFnbGlvIHZlcnJhbm8gcmVzZXR0YXRpLiBWdW9pIHByb2NlZGVyZT9gXG4gICAgKTtcbiAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1EaWFsb2dDb21wb25lbnQsIHtcbiAgICAgIGRhdGE6IGRpYWxvZ0RhdGEsXG4gICAgfSk7XG5cbiAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGRpYWxvZ1Jlc3VsdDphbnkpID0+IHtcbiAgICAgIGlmIChkaWFsb2dSZXN1bHQpIHtcbiAgICAgICAgdGhpcy5fc2V0VmlldygpXG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXR2aWV3Jyx0aGlzLnZpZXcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cblxuXG5cblxuXG4gIHByaXZhdGUgdXBkYXRlU2VsZWN0ZWQoKSB7XG4gICAgdmFyIHNlbHM6IGFueVtdPVtdO1xuICAgIHRoaXMuc2VsZWN0ZWRGZWF1dHVyZXMuZm9yRWFjaChcbiAgICAgIGl0bSA9PiBzZWxzLnB1c2goaXRtLnByb3BlcnRpZXMubm9tZV9yZWcpXG4gICAgKTtcbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQoc2Vscyk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRGZWF1dHVyZXMoZGF0YTogYW55KXtcbiAgICBMLmdlb0pTT04oZGF0YSx7XG4gICAgICBzdHlsZTogKGZlYXR1cmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmVhdHVyZXNTdHlsZS5kZWZhdWx0X3N0eWxlO1xuICAgICAgfSxcbiAgICAgIG9uRWFjaEZlYXR1cmU6IChmZWF0dXJlOiBhbnksIG1sYXllcjogYW55KSA9PiB7XG4gICAgICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXMuaWQgPSBmZWF0dXJlLmlkO1xuICAgICAgICAgIC8vIGlmICh0aGlzLnN0eWxlUHJvcGVydGllcyAmJiB0aGlzLnN0eWxlUHJvcGVydGllcy50b29sdGlwKSB7XG4gICAgICAgICAgLy8gICBtbGF5ZXIuYmluZFRvb2x0aXAodGhpcy5zdHlsZVByb3BlcnRpZXMudG9vbHRpcChmZWF0dXJlLnByb3BlcnRpZXMpKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgLy8gbWxheWVyLmJpbmRUb29sdGlwKGZlYXR1cmUucHJvcGVydGllcy5jb2RfYXJlYSArICc8YnI+JyArIGZlYXR1cmUucHJvcGVydGllcy5ub21lX2FyZWEpO1xuICAgICAgICB9XG4gICAgICAgIG1sYXllci5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBpZiAodGhpcy5zZWxlY3Rpb25FbmFibGVkKSB7XG4gICAgICAgICAgICAgIGZlYXR1cmUuc2VsZWN0ZWQgPSAhZmVhdHVyZS5zZWxlY3RlZDtcbiAgICAgICAgICAgICAgaWYgKGZlYXR1cmUuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBtbGF5ZXIuc2V0U3R5bGUodGhpcy5mZWF0dXJlc1N0eWxlLnNlbGVjdGVkX3N0eWxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRmVhdXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEZlYXV0dXJlcyA9IHRoaXMuc2VsZWN0ZWRGZWF1dHVyZXMuZmlsdGVyKCBpdG0gPT4gaXRtLnByb3BlcnRpZXMuZ2lkICE9PSBmZWF0dXJlLnByb3BlcnRpZXMuZ2lkKTtcbiAgICAgICAgICAgICAgICBtbGF5ZXIuc2V0U3R5bGUodGhpcy5mZWF0dXJlc1N0eWxlLmRlZmF1bHRfc3R5bGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWQoKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWxlY3RlZEZlYXV0dXJlcyk7XG4gICAgICAgICAgICAgIC8vdGhpcy5zZWxlY3RlZGxheWVyc0NoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRsYXllcnMpO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgdGhpcy5qc29ubGF5ZXIucmVzZXRTdHlsZSgpO1xuICAgICAgICAgICAgLy8gICBtbGF5ZXIuc2V0U3R5bGUodGhpcy5hdmFpbGFibGVTdHlsZXMuc2VsZWN0ZWRfc3R5bGUpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy90aGlzLmxheWVyY2xpY2suZW1pdChmZWF0dXJlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgICAgKS5hZGRUbyh0aGlzLm1hcCk7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZXBvcnRTZXJ2aWNlLmdldEFuY2lsbGFyeUxheWVyKCdyZWdpb25zJykuc3Vic2NyaWJlKFxuICAgICAgZGF0YSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB0aGlzLmxvYWRGZWF1dHVyZXMoZGF0YSk7XG4gICAgICB9XG4gICAgKVxuICB9XG5cbn1cbiIsIjxuZy1jb250YWluZXIgPlxuICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgPGgyIGNsYXNzPVwibS0wXCI+QXJlYSBHZW9ncmFmaWNhIGRpIGFuYWxpc2k8L2gyPlxuICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj5cbiAgICAgIDxidXR0b24gbWF0LWZsYXQtYnV0dG9uIGNvbG9yPVwiXCIgW2Rpc2FibGVkXT1cIiF2aWV3XCIgKGNsaWNrKT1cInJlc2V0VmlldygpXCJjbGFzcz1cImJnLXdhcm5pbmcgbWUtMlwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1yZWRvLWFsdCBtZS0yXCI+PC9zcGFuPlJpcHJpc3RpbmFcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtZmxhdC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgY2xhc3M9XCJiZy1zdWNjZXNzXCIgKGNsaWNrKT1cInNldFZpZXcoKVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1jcm9wIG1lLTJcIj48L3NwYW4+SW1wb3N0YSByaXRhZ2xpb1xuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbjxkaXYgY2xhc3M9XCJiaWctbWFwXCIgaWQ9XCJtYWluX21hcFwiPlxuICA8ZGl2IGNsYXNzPVwiY3JvcC1vdmVybGF5XCI+XG4gICAgPGRpdiBjbGFzcz1cInRleHQtbWFwLW92ZXJsYXlcIj5BUkVBIFNFTEVaSU9OQVRBPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=