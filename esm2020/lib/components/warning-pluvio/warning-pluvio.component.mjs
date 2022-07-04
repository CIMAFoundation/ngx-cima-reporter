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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZy1wbHV2aW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL2NvbXBvbmVudHMvd2FybmluZy1wbHV2aW8vd2FybmluZy1wbHV2aW8uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL2NvbXBvbmVudHMvd2FybmluZy1wbHV2aW8vd2FybmluZy1wbHV2aW8uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXpHLE9BQU8sRUFBRSxlQUFlLEVBQXFDLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7OztBQVcxQyxNQUFNLE9BQU8sc0JBQXNCO0lBVWpDLFlBQW9CLGFBQThCLEVBQ2xDLFVBQTZCLEVBQzdCLFFBQXlCO1FBRnJCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUNsQyxlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQVhoQyxhQUFRLEdBQVUsS0FBSyxDQUFDO1FBRXZCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUU3QyxpQkFBWSxHQUNvQixJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDMUUsU0FBSSxHQUFNLFNBQVMsQ0FBQztRQUVyQixjQUFTLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7SUFHVCxDQUFDO0lBRzlDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhO1lBQ25GLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBRy9CLENBQUM7SUFHRCxRQUFRO0lBRVIsQ0FBQztJQUVPLG1CQUFtQjtRQUV6QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCO2dCQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNoRTthQUFLO1lBRUYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUMzRCxJQUFJLENBQUEsRUFBRTtnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDO2dCQUNmLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUMxQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUM3QixDQUFDLENBQ0YsQ0FBQztTQUNMO0lBRUwsQ0FBQztJQUNPLG1CQUFtQixDQUFDLFVBQWlCLEtBQUs7UUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBRSxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBS0Qsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDcEI7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osWUFBWSxFQUFDLEVBQUU7YUFDaEI7U0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFFLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxJQUFRO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLE1BQU0sS0FBSyxHQUFRLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ3hDLElBQUksSUFBSSxDQUFDLElBQUk7Z0JBQ1gsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVqQyxDQUFDO0lBR00saUJBQWlCLENBQUMsSUFBWSxFQUFFLE9BQVk7UUFFL0MsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztZQUM1QixXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXO1lBQ2pGLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3BFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1NBQ2pFLENBQUM7YUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3JELFNBQVMsQ0FDTixJQUFJLENBQUMsRUFBRTtZQUNMLE9BQU8sQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdCLENBQUMsRUFDRCxLQUFLLENBQUEsRUFBRTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsd0VBQXdFLEVBQUUsRUFBRSxFQUFFLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7UUFDckgsQ0FBQyxDQUNKLENBQUM7SUFDWixDQUFDOztvSEFuR1Usc0JBQXNCO3dHQUF0QixzQkFBc0IscUxDZG5DLHcvQkF3QkE7NEZEVmEsc0JBQXNCO2tCQUxsQyxTQUFTOytCQUNFLHlCQUF5QjtvS0FLMUIsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0ksYUFBYTtzQkFBdEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU25hY2tiYXJTZXJ2aWNlIH0gZnJvbSAnQGNpbWEvY29tbW9ucyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmluYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNaWRkbGVSZXBvcnQsIFdhcm5pbmdBZ2dyZWdhdGlvbiB9IGZyb20gJy4uLy4uL21vZGVscy9pbnRlcmZhY2VzJztcbmltcG9ydCB7RmFrZURhdGFTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmFrZS1kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdlb2dyYXBoaWNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ2VvZ3JhcGhpYy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcG9ydGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlcG9ydGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdyZXBvcnRlci13YXJuaW5nLXBsdXZpbycsXG4gIHRlbXBsYXRlVXJsOiAnLi93YXJuaW5nLXBsdXZpby5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dhcm5pbmctcGx1dmlvLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV2FybmluZ1BsdXZpb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW49ZmFsc2U7XG4gIEBJbnB1dCgpIHJlcG9ydDogTWlkZGxlUmVwb3J0OyAvL1RPRE8gQ0FNQklBUkUgQ09OIERBVEFcbiAgQE91dHB1dCgpIHdhcm5pbmdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG4gIHB1YmxpYyBhZ2dyV2FybmluZyQ6XG4gICAgICAgIE9ic2VydmFibGU8V2FybmluZ0FnZ3JlZ2F0aW9uW10+PXRoaXMucmVwb3J0U2VydmljZS5nZXRBdmFpbGFibGVzV2FybkFnZ3IoKTtcbiAgcHJpdmF0ZSB2aWV3OiBhbnk9dW5kZWZpbmVkO1xuICBwcml2YXRlIHZpZXdTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIGRpc2FibGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVwb3J0U2VydmljZTogUmVwb3J0ZXJTZXJ2aWNlLFxuICAgICAgICAgIHByaXZhdGUgZ2VvU2VydmljZTogR2VvZ3JhcGhpY1NlcnZpY2UsXG4gICAgICAgICAgcHJpdmF0ZSBzbmFja0JhcjogU25hY2tiYXJTZXJ2aWNlKSB7IH1cblxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZCAmJiBjaGFuZ2VzLmRpc2FibGVkLmN1cnJlbnRWYWx1ZSE9Y2hhbmdlcy5kaXNhYmxlZC5wcmV2aW91c1ZhbHVlKVxuICAgICAgdGhpcy5jaGFuZ2VDb250cm9sU3RhdHVzKCk7XG5cblxuICB9XG5cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VDb250cm9sU3RhdHVzKCl7XG5cbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgaWYgKHRoaXMudmlld1N1YnNjcmlwdGlvbikgdGhpcy52aWV3U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfSBlbHNle1xuXG4gICAgICAgIHRoaXMudmlld1N1YnNjcmlwdGlvbiA9IHRoaXMuZ2VvU2VydmljZS5vblZpZXdDYW5nZSgpLnN1YnNjcmliZShcbiAgICAgICAgICAgIGRhdGE9PntcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3dhcm5pbmcgcGx1dmlvICcsdGhpcy5kaXNhYmxlZCxkYXRhKTtcbiAgICAgICAgICAgICAgdGhpcy52aWV3PWRhdGE7XG4gICAgICAgICAgICAgIHRoaXMucmVzZXRXYXJuaW5nUGx1dmlvKCk7XG4gICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29udHJvbFN0YXR1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICB9XG5cbiAgfVxuICBwcml2YXRlIHVwZGF0ZUNvbnRyb2xTdGF0dXMoZGlzYWJsZTogYm9vbGVhbj1mYWxzZSkge1xuICAgIHRoaXMuZGlzYWJsZWQkLm5leHQodGhpcy52aWV3PT11bmRlZmluZWQgfHwgdGhpcy5kaXNhYmxlZCB8fCBkaXNhYmxlKTtcbiAgfVxuXG4gIC8qV0FSTklOR1BMVVZJTyovXG4gIHB1YmxpYyB3YXJuaW5nc1BsdXZpbzogYW55O1xuXG4gIHJlc2V0V2FybmluZ1BsdXZpbygpIHtcbiAgICB0aGlzLndhcm5pbmdzUGx1dmlvID0gW1xuICAgICAge1xuICAgICAgICBpZDowLFxuICAgICAgICBhZ2dyZWdhemlvbmU6JydcbiAgICAgIH1cbiAgICBdO1xuICAgIHRoaXMudXBkYXRlV2FybmluZ0xheWVycygpO1xuICB9XG5cbiAgYWRkV2FybmluZ1BsdXZpbygpe1xuICAgIHRoaXMud2FybmluZ3NQbHV2aW8gPSBbLi4udGhpcy53YXJuaW5nc1BsdXZpbywge2lkOjEsIGFnZ3JlZ2F6aW9uZTonJ31dXG4gIH1cbiAgZGVsV2FybmluZ1BsdXZpbyhpdGVtOmFueSkge1xuICAgIHRoaXMud2FybmluZ3NQbHV2aW8gPSB0aGlzLndhcm5pbmdzUGx1dmlvLmZpbHRlcigoeDogYW55KSA9PiB4ICE9IGl0ZW0pXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVdhcm5pbmdMYXllcnMoKXtcbiAgICBjb25zdCBsYXllcjogYW55W109W107XG4gICAgdGhpcy53YXJuaW5nc1BsdXZpby5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgIGlmIChpdGVtLmRhdGEpXG4gICAgICAgIGxheWVyLnB1c2goaXRlbS5kYXRhKTtcbiAgICB9KTtcbiAgICB0aGlzLndhcm5pbmdDaGFuZ2UuZW1pdChsYXllcik7XG5cbiAgfVxuXG5cbiAgcHVibGljIHNlbGVjdEFnZ3JlZ2F0aW9uKGFnZ3I6IHN0cmluZywgd2FybmluZzogYW55KSB7XG5cbiAgICAgIC8vdGhpcy5kaXNhYmxlZCQubmV4dCh0cnVlKTtcbiAgICAgIHRoaXMudXBkYXRlQ29udHJvbFN0YXR1cyh0cnVlKTtcbiAgICAgIHRoaXMucmVwb3J0U2VydmljZS5nZXRXYXJuaW5nKHtcbiAgICAgICAgYWdncmVnYXRpb246IGFnZ3IsIHR5cGU6ICduYXRpb25hbF9QTFVWSU9NRVRSTycsIGRhdGVfdG86IHRoaXMucmVwb3J0LnRvVVRDU2Vjb25kLFxuICAgICAgICBsb25fbWluOiB0aGlzLnZpZXcuYmJveC5nZXRXZXN0KCksIGxvbl9tYXg6IHRoaXMudmlldy5iYm94LmdldEVhc3QoKSxcbiAgICAgICAgbGF0X21pbjogdGhpcy52aWV3LmJib3guZ2V0U291dGgoKSwgbGF0X21heDogdGhpcy52aWV3LmJib3guZ2V0Tm9ydGgoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKGZpbmFsaXplKCgpID0+IHRoaXMudXBkYXRlQ29udHJvbFN0YXR1cyhmYWxzZSkpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgIHdhcm5pbmcuZGF0YT1kYXRhO1xuICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVXYXJuaW5nTGF5ZXJzKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcj0+e1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNuYWNrQmFyLmVycm9yKCdTaSDDqCB2ZXJpZmljYXRvIHVuIGVycm9yZSBkdXJhbnRlIGxhIGxldHR1cmEgZGVpIHdhcm5pbmcgcGx1dmlvbWV0cmljaScsICcnLCB7ZHVyYXRpb246MjAwMH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gIH1cblxufVxuIiwiPGgzPldhcm5pbmdzIFBsdXZpb21ldHJpY2k8L2gzPlxuXG48ZGl2IGNsYXNzPVwid2FybmluZ1BsdXZpb1wiICpuZ0Zvcj1cImxldCB3YXJuaW5nIG9mIHdhcm5pbmdzUGx1dmlvLCBsZXQgaSA9IGluZGV4XCI+XG5cbiAgPGRpdiBjbGFzcz1cIml0ZW0tbGlzdC1iaWctYnVsbCBiZy1zZWNvbmRhcnlcIj5cbiAgICA8c3Bhbj57e2krMX19PC9zcGFuPlxuICA8L2Rpdj5cblxuICA8bWF0LWZvcm0tZmllbGQgYXBwZWFyYW5jZT1cImZpbGxcIiBjbGFzcz1cInctMTAwXCI+XG4gICAgPG1hdC1sYWJlbD5BZ2dyZWdhemlvbmU8L21hdC1sYWJlbD5cbiAgICA8bWF0LXNlbGVjdCAgWyh2YWx1ZSldPVwid2FybmluZy5zZWxlY3RlZFwiICh2YWx1ZUNoYW5nZSk9XCJzZWxlY3RBZ2dyZWdhdGlvbigkZXZlbnQsd2FybmluZylcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWQkIHwgYXN5bmNcIj4gXG4gICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgYWdncmVnYXppb25lIG9mIGFnZ3JXYXJuaW5nJCB8IGFzeW5jXCIgW3ZhbHVlXT1cImFnZ3JlZ2F6aW9uZS52YWx1ZVwiPlxuICAgICAgICB7e2FnZ3JlZ2F6aW9uZS5kZXNjcn19XG4gICAgICA8L21hdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0PlxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gIDxkaXYgY2xhc3M9XCJkZWwtYnRuLXdyYXBwZXIgbXMtMlwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZGVsLWJ0biBmYXMgZmEtdHJhc2gtYWx0XCIgKm5nSWY9XCJpPjBcIiAgKGNsaWNrKT1cImRlbFdhcm5pbmdQbHV2aW8od2FybmluZylcIj48L3NwYW4+XG4gIDwvZGl2PlxuXG48L2Rpdj5cblxuPGJ1dHRvbiBtYXQtZmxhdC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgY2xhc3M9XCJiZy1zdWNjZXNzXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkJCB8IGFzeW5jXCIgKGNsaWNrKT1cImFkZFdhcm5pbmdQbHV2aW8oKVwiPjxzcGFuIGNsYXNzPVwiZmFzIGZhLXBsdXMgbWUtMVwiPjwvc3Bhbj5BZ2dpdW5naSBXYXJuaW5nIFBsdXZpbzwvYnV0dG9uPlxuIl19