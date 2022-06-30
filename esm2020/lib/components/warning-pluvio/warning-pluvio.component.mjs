import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../services/reporter.service";
import * as i2 from "../../services/geographic.service";
import * as i3 from "@cima/commons";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/select";
import * as i6 from "@angular/material/core";
import * as i7 from "@angular/material/button";
import * as i8 from "@angular/common";
export class WarningPluvioComponent {
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
            lon: this.view.lon, lat: this.view.lat, zoom: this.view.zoom
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
WarningPluvioComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WarningPluvioComponent, deps: [{ token: i1.ReporterService }, { token: i2.GeographicService }, { token: i3.SnackbarService }], target: i0.ɵɵFactoryTarget.Component });
WarningPluvioComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: WarningPluvioComponent, selector: "reporter-warning-pluvio", inputs: { disabled: "disabled", report: "report" }, outputs: { warningChange: "warningChange" }, usesOnChanges: true, ngImport: i0, template: "<h3>Warnings Pluviometrici</h3>\n\n<div class=\"warningPluvio\" *ngFor=\"let warning of warningsPluvio, let i = index\">\n\n  <div class=\"item-list-big-bull bg-secondary\">\n    <span>{{i+1}}</span>\n  </div>\n\n  <mat-form-field appearance=\"fill\" class=\"w-100\">\n    <mat-label>Aggregazione</mat-label>\n    <mat-select  [(value)]=\"warning.selected\" (valueChange)=\"selectAggregation($event,warning)\" [disabled]=\"disabled$ | async\"> \n      <mat-option *ngFor=\"let aggregazione of aggrWarning$ | async\" [value]=\"aggregazione.value\">\n        {{aggregazione.descr}}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n\n  <div class=\"del-btn-wrapper ms-2\">\n    <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\"  (click)=\"delWarningPluvio(warning)\"></span>\n  </div>\n\n</div>\n\n<button mat-flat-button color=\"primary\" class=\"bg-success\" [disabled]=\"disabled$ | async\" (click)=\"addWarningPluvio()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Warning Pluvio</button>\n", styles: [".warningPluvio{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i7.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WarningPluvioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-warning-pluvio', template: "<h3>Warnings Pluviometrici</h3>\n\n<div class=\"warningPluvio\" *ngFor=\"let warning of warningsPluvio, let i = index\">\n\n  <div class=\"item-list-big-bull bg-secondary\">\n    <span>{{i+1}}</span>\n  </div>\n\n  <mat-form-field appearance=\"fill\" class=\"w-100\">\n    <mat-label>Aggregazione</mat-label>\n    <mat-select  [(value)]=\"warning.selected\" (valueChange)=\"selectAggregation($event,warning)\" [disabled]=\"disabled$ | async\"> \n      <mat-option *ngFor=\"let aggregazione of aggrWarning$ | async\" [value]=\"aggregazione.value\">\n        {{aggregazione.descr}}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n\n  <div class=\"del-btn-wrapper ms-2\">\n    <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\"  (click)=\"delWarningPluvio(warning)\"></span>\n  </div>\n\n</div>\n\n<button mat-flat-button color=\"primary\" class=\"bg-success\" [disabled]=\"disabled$ | async\" (click)=\"addWarningPluvio()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Warning Pluvio</button>\n", styles: [".warningPluvio{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ReporterService }, { type: i2.GeographicService }, { type: i3.SnackbarService }]; }, propDecorators: { disabled: [{
                type: Input
            }], report: [{
                type: Input
            }], warningChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZy1wbHV2aW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL2NvbXBvbmVudHMvd2FybmluZy1wbHV2aW8vd2FybmluZy1wbHV2aW8uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL2NvbXBvbmVudHMvd2FybmluZy1wbHV2aW8vd2FybmluZy1wbHV2aW8uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXpHLE9BQU8sRUFBRSxlQUFlLEVBQXFDLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7OztBQVcxQyxNQUFNLE9BQU8sc0JBQXNCO0lBVWpDLFlBQW9CLGFBQThCLEVBQ2xDLFVBQTZCLEVBQzdCLFFBQXlCO1FBRnJCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUNsQyxlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQVhoQyxhQUFRLEdBQVUsS0FBSyxDQUFDO1FBRXZCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUU3QyxpQkFBWSxHQUNvQixJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDMUUsU0FBSSxHQUFNLFNBQVMsQ0FBQztRQUVyQixjQUFTLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7SUFHVCxDQUFDO0lBRzlDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEs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TCxPQUFPLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUM3QixDQUFDLEVBQ0QsS0FBSyxDQUFBLEVBQUU7WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLHdFQUF3RSxFQUFFLEVBQUUsRUFBRSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3JILENBQUMsQ0FDSixDQUFDO0lBQ1osQ0FBQzs7b0hBbEdVLHNCQUFzQjt3R0FBdEIsc0JBQXNCLHFMQ2RuQyx3L0JBd0JBOzRGRFZhLHNCQUFzQjtrQkFMbEMsU0FBUzsrQkFDRSx5QkFBeUI7b0tBSzFCLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNJLGFBQWE7c0JBQXRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNuYWNrYmFyU2VydmljZSB9IGZyb20gJ0BjaW1hL2NvbW1vbnMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbmFsaXplIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWlkZGxlUmVwb3J0LCBXYXJuaW5nQWdncmVnYXRpb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvaW50ZXJmYWNlcyc7XG5pbXBvcnQge0Zha2VEYXRhU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Zha2UtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHZW9ncmFwaGljU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dlb2dyYXBoaWMuc2VydmljZSc7XG5pbXBvcnQgeyBSZXBvcnRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZXBvcnRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncmVwb3J0ZXItd2FybmluZy1wbHV2aW8nLFxuICB0ZW1wbGF0ZVVybDogJy4vd2FybmluZy1wbHV2aW8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93YXJuaW5nLXBsdXZpby5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdhcm5pbmdQbHV2aW9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuPWZhbHNlO1xuICBASW5wdXQoKSByZXBvcnQ6IE1pZGRsZVJlcG9ydDsgLy9UT0RPIENBTUJJQVJFIENPTiBEQVRBXG4gIEBPdXRwdXQoKSB3YXJuaW5nQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICBwdWJsaWMgYWdncldhcm5pbmckOlxuICAgICAgICBPYnNlcnZhYmxlPFdhcm5pbmdBZ2dyZWdhdGlvbltdPj10aGlzLnJlcG9ydFNlcnZpY2UuZ2V0QXZhaWxhYmxlc1dhcm5BZ2dyKCk7XG4gIHByaXZhdGUgdmlldzogYW55PXVuZGVmaW5lZDtcbiAgcHJpdmF0ZSB2aWV3U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBkaXNhYmxlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlcG9ydFNlcnZpY2U6IFJlcG9ydGVyU2VydmljZSxcbiAgICAgICAgICBwcml2YXRlIGdlb1NlcnZpY2U6IEdlb2dyYXBoaWNTZXJ2aWNlLFxuICAgICAgICAgIHByaXZhdGUgc25hY2tCYXI6IFNuYWNrYmFyU2VydmljZSkgeyB9XG5cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQgJiYgY2hhbmdlcy5kaXNhYmxlZC5jdXJyZW50VmFsdWUhPWNoYW5nZXMuZGlzYWJsZWQucHJldmlvdXNWYWx1ZSlcbiAgICAgIHRoaXMuY2hhbmdlQ29udHJvbFN0YXR1cygpO1xuXG5cbiAgfVxuXG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlQ29udHJvbFN0YXR1cygpe1xuXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGlmICh0aGlzLnZpZXdTdWJzY3JpcHRpb24pIHRoaXMudmlld1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH0gZWxzZXtcblxuICAgICAgICB0aGlzLnZpZXdTdWJzY3JpcHRpb24gPSB0aGlzLmdlb1NlcnZpY2Uub25WaWV3Q2FuZ2UoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICBkYXRhPT57XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3YXJuaW5nIHBsdXZpbyAnLHRoaXMuZGlzYWJsZWQsZGF0YSk7XG4gICAgICAgICAgICAgIHRoaXMudmlldz1kYXRhO1xuICAgICAgICAgICAgICB0aGlzLnJlc2V0V2FybmluZ1BsdXZpbygpO1xuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xTdGF0dXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfVxuXG4gIH1cbiAgcHJpdmF0ZSB1cGRhdGVDb250cm9sU3RhdHVzKGRpc2FibGU6IGJvb2xlYW49ZmFsc2UpIHtcbiAgICB0aGlzLmRpc2FibGVkJC5uZXh0KHRoaXMudmlldz09dW5kZWZpbmVkIHx8IHRoaXMuZGlzYWJsZWQgfHwgZGlzYWJsZSk7XG4gIH1cblxuICAvKldBUk5JTkdQTFVWSU8qL1xuICBwdWJsaWMgd2FybmluZ3NQbHV2aW86IGFueTtcblxuICByZXNldFdhcm5pbmdQbHV2aW8oKSB7XG4gICAgdGhpcy53YXJuaW5nc1BsdXZpbyA9IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6MCxcbiAgICAgICAgYWdncmVnYXppb25lOicnXG4gICAgICB9XG4gICAgXTtcbiAgICB0aGlzLnVwZGF0ZVdhcm5pbmdMYXllcnMoKTtcbiAgfVxuXG4gIGFkZFdhcm5pbmdQbHV2aW8oKXtcbiAgICB0aGlzLndhcm5pbmdzUGx1dmlvID0gWy4uLnRoaXMud2FybmluZ3NQbHV2aW8sIHtpZDoxLCBhZ2dyZWdhemlvbmU6Jyd9XVxuICB9XG4gIGRlbFdhcm5pbmdQbHV2aW8oaXRlbTphbnkpIHtcbiAgICB0aGlzLndhcm5pbmdzUGx1dmlvID0gdGhpcy53YXJuaW5nc1BsdXZpby5maWx0ZXIoKHg6IGFueSkgPT4geCAhPSBpdGVtKVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVXYXJuaW5nTGF5ZXJzKCl7XG4gICAgY29uc3QgbGF5ZXI6IGFueVtdPVtdO1xuICAgIHRoaXMud2FybmluZ3NQbHV2aW8uZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICBpZiAoaXRlbS5kYXRhKVxuICAgICAgICBsYXllci5wdXNoKGl0ZW0uZGF0YSk7XG4gICAgfSk7XG4gICAgdGhpcy53YXJuaW5nQ2hhbmdlLmVtaXQobGF5ZXIpO1xuXG4gIH1cblxuXG4gIHB1YmxpYyBzZWxlY3RBZ2dyZWdhdGlvbihhZ2dyOiBzdHJpbmcsIHdhcm5pbmc6IGFueSkge1xuXG4gICAgICAvL3RoaXMuZGlzYWJsZWQkLm5leHQodHJ1ZSk7XG4gICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xTdGF0dXModHJ1ZSk7XG4gICAgICB0aGlzLnJlcG9ydFNlcnZpY2UuZ2V0V2FybmluZyh7XG4gICAgICAgIGFnZ3JlZ2F0aW9uOiBhZ2dyLCB0eXBlOiAnbmF0aW9uYWxfUExVVklPTUVUUk8nLCBkYXRlX3RvOiB0aGlzLnJlcG9ydC50b1VUQ1NlY29uZCxcbiAgICAgICAgbG9uOiB0aGlzLnZpZXcubG9uLCBsYXQ6IHRoaXMudmlldy5sYXQsIHpvb206IHRoaXMudmlldy56b29tXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoZmluYWxpemUoKCkgPT4gdGhpcy51cGRhdGVDb250cm9sU3RhdHVzKGZhbHNlKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgd2FybmluZy5kYXRhPWRhdGE7XG4gICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVdhcm5pbmdMYXllcnMoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yPT57XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc25hY2tCYXIuZXJyb3IoJ1NpIMOoIHZlcmlmaWNhdG8gdW4gZXJyb3JlIGR1cmFudGUgbGEgbGV0dHVyYSBkZWkgd2FybmluZyBwbHV2aW9tZXRyaWNpJywgJycsIHtkdXJhdGlvbjoyMDAwfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgfVxuXG59XG4iLCI8aDM+V2FybmluZ3MgUGx1dmlvbWV0cmljaTwvaDM+XG5cbjxkaXYgY2xhc3M9XCJ3YXJuaW5nUGx1dmlvXCIgKm5nRm9yPVwibGV0IHdhcm5pbmcgb2Ygd2FybmluZ3NQbHV2aW8sIGxldCBpID0gaW5kZXhcIj5cblxuICA8ZGl2IGNsYXNzPVwiaXRlbS1saXN0LWJpZy1idWxsIGJnLXNlY29uZGFyeVwiPlxuICAgIDxzcGFuPnt7aSsxfX08L3NwYW4+XG4gIDwvZGl2PlxuXG4gIDxtYXQtZm9ybS1maWVsZCBhcHBlYXJhbmNlPVwiZmlsbFwiIGNsYXNzPVwidy0xMDBcIj5cbiAgICA8bWF0LWxhYmVsPkFnZ3JlZ2F6aW9uZTwvbWF0LWxhYmVsPlxuICAgIDxtYXQtc2VsZWN0ICBbKHZhbHVlKV09XCJ3YXJuaW5nLnNlbGVjdGVkXCIgKHZhbHVlQ2hhbmdlKT1cInNlbGVjdEFnZ3JlZ2F0aW9uKCRldmVudCx3YXJuaW5nKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZCQgfCBhc3luY1wiPiBcbiAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBhZ2dyZWdhemlvbmUgb2YgYWdncldhcm5pbmckIHwgYXN5bmNcIiBbdmFsdWVdPVwiYWdncmVnYXppb25lLnZhbHVlXCI+XG4gICAgICAgIHt7YWdncmVnYXppb25lLmRlc2NyfX1cbiAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICA8L21hdC1zZWxlY3Q+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgPGRpdiBjbGFzcz1cImRlbC1idG4td3JhcHBlciBtcy0yXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJkZWwtYnRuIGZhcyBmYS10cmFzaC1hbHRcIiAqbmdJZj1cImk+MFwiICAoY2xpY2spPVwiZGVsV2FybmluZ1BsdXZpbyh3YXJuaW5nKVwiPjwvc3Bhbj5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuXG48YnV0dG9uIG1hdC1mbGF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBjbGFzcz1cImJnLXN1Y2Nlc3NcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWQkIHwgYXN5bmNcIiAoY2xpY2spPVwiYWRkV2FybmluZ1BsdXZpbygpXCI+PHNwYW4gY2xhc3M9XCJmYXMgZmEtcGx1cyBtZS0xXCI+PC9zcGFuPkFnZ2l1bmdpIFdhcm5pbmcgUGx1dmlvPC9idXR0b24+XG4iXX0=