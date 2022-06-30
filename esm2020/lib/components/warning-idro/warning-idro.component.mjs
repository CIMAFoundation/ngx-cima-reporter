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
export class WarningIdroComponent {
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
        this.reportService.getWarning({
            aggregation: aggr,
            type: 'national_IDROMETRO',
            date_to: this.report.toUTCSecond,
            lon: this.view.lon, lat: this.view.lat, zoom: this.view.zoom
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
WarningIdroComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WarningIdroComponent, deps: [{ token: i1.ReporterService }, { token: i2.GeographicService }, { token: i3.SnackbarService }], target: i0.ɵɵFactoryTarget.Component });
WarningIdroComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: WarningIdroComponent, selector: "reporter-warning-idro", inputs: { disabled: "disabled", report: "report" }, outputs: { warningChange: "warningChange" }, usesOnChanges: true, ngImport: i0, template: "<h3>Warnings Idrometrici</h3>\n\n<div class=\"warningIdro\" *ngFor=\"let warning of warningsIdro, let i = index\">\n\n  <div class=\"item-list-big-bull bg-info\">\n    <span>{{i+1}}</span>\n  </div>\n\n  <mat-form-field appearance=\"fill\" class=\"w-100\">\n    <mat-label>Aggregazione</mat-label>\n    <mat-select [(value)]=\"warning.selected\" (valueChange)=\"selectAggregation($event,warning)\" [disabled]=\"disabled$ | async\">\n      <mat-option *ngFor=\"let aggregazione of aggrWarning$ | async\" [value]=\"aggregazione.value\">\n        {{aggregazione.descr}}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n\n  <div class=\"del-btn-wrapper ms-2\">\n    <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delWarningIdro(warning)\"></span>\n  </div>\n\n</div>\n\n<button mat-flat-button color=\"primary\" class=\"bg-success\" [disabled]=\"disabled$ | async\" (click)=\"addWarningIdro()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Warning Idro</button>\n", styles: [".warningIdro{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i7.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WarningIdroComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-warning-idro', template: "<h3>Warnings Idrometrici</h3>\n\n<div class=\"warningIdro\" *ngFor=\"let warning of warningsIdro, let i = index\">\n\n  <div class=\"item-list-big-bull bg-info\">\n    <span>{{i+1}}</span>\n  </div>\n\n  <mat-form-field appearance=\"fill\" class=\"w-100\">\n    <mat-label>Aggregazione</mat-label>\n    <mat-select [(value)]=\"warning.selected\" (valueChange)=\"selectAggregation($event,warning)\" [disabled]=\"disabled$ | async\">\n      <mat-option *ngFor=\"let aggregazione of aggrWarning$ | async\" [value]=\"aggregazione.value\">\n        {{aggregazione.descr}}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n\n  <div class=\"del-btn-wrapper ms-2\">\n    <span class=\"del-btn fas fa-trash-alt\" *ngIf=\"i>0\" (click)=\"delWarningIdro(warning)\"></span>\n  </div>\n\n</div>\n\n<button mat-flat-button color=\"primary\" class=\"bg-success\" [disabled]=\"disabled$ | async\" (click)=\"addWarningIdro()\"><span class=\"fas fa-plus me-1\"></span>Aggiungi Warning Idro</button>\n", styles: [".warningIdro{display:flex}.item-list-big-bull{min-width:25px;min-height:25px;max-width:25px;max-height:25px;border-radius:50%;background-color:#0266cc;color:#fff;display:flex;justify-content:center;align-items:center;font-size:1.2em;font-weight:600;margin-right:8px;margin-top:14px}.del-btn-wrapper{padding-top:16px;width:25px}.del-btn-wrapper .del-btn{cursor:pointer;color:gray}.del-btn-wrapper .del-btn:hover{color:#2f4f4f}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ReporterService }, { type: i2.GeographicService }, { type: i3.SnackbarService }]; }, propDecorators: { disabled: [{
                type: Input
            }], report: [{
                type: Input
            }], warningChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZy1pZHJvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NpbWEvcmVwb3J0ZXIvc3JjL2xpYi9jb21wb25lbnRzL3dhcm5pbmctaWRyby93YXJuaW5nLWlkcm8uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL2NvbXBvbmVudHMvd2FybmluZy1pZHJvL3dhcm5pbmctaWRyby5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFekcsT0FBTyxFQUFFLGVBQWUsRUFBNEIsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7O0FBVzFDLE1BQU0sT0FBTyxvQkFBb0I7SUFZL0IsWUFBb0IsYUFBOEIsRUFBVSxVQUE2QixFQUMzRSxRQUF5QjtRQURuQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUMzRSxhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQVg5QixhQUFRLEdBQVUsS0FBSyxDQUFDO1FBRXZCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUM3QyxpQkFBWSxHQUNvQixJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDMUUsU0FBSSxHQUFNLFNBQVMsQ0FBQztRQUVyQixjQUFTLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7SUFJWCxDQUFDO0lBRzVDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLElB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LFNBQVMsQ0FDVixJQUFJLENBQUMsRUFBRTtZQUNMLE9BQU8sQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdCLENBQUMsRUFDRCxLQUFLLENBQUEsRUFBRTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsc0VBQXNFLEVBQUUsRUFBRSxFQUFFLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7UUFDbkgsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDOztrSEEvRlUsb0JBQW9CO3NHQUFwQixvQkFBb0IsbUxDZGpDLG8rQkF3QkE7NEZEVmEsb0JBQW9CO2tCQUxoQyxTQUFTOytCQUNFLHVCQUF1QjtvS0FNeEIsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0ksYUFBYTtzQkFBdEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU25hY2tiYXJTZXJ2aWNlIH0gZnJvbSAnQGNpbWEvY29tbW9ucyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmluYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNaWRkbGVSZXBvcnQsIFdhcm5pbmdBZ2dyZWdhdGlvbiB9IGZyb20gJy4uLy4uL21vZGVscy9pbnRlcmZhY2VzJztcbmltcG9ydCB7RmFrZURhdGFTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmFrZS1kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdlb2dyYXBoaWNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ2VvZ3JhcGhpYy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcG9ydGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlcG9ydGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdyZXBvcnRlci13YXJuaW5nLWlkcm8nLFxuICB0ZW1wbGF0ZVVybDogJy4vd2FybmluZy1pZHJvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd2FybmluZy1pZHJvLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV2FybmluZ0lkcm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW49ZmFsc2U7XG4gIEBJbnB1dCgpIHJlcG9ydDogTWlkZGxlUmVwb3J0O1xuICBAT3V0cHV0KCkgd2FybmluZ0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG4gIHB1YmxpYyBhZ2dyV2FybmluZyQ6XG4gICAgICAgIE9ic2VydmFibGU8V2FybmluZ0FnZ3JlZ2F0aW9uW10+PXRoaXMucmVwb3J0U2VydmljZS5nZXRBdmFpbGFibGVzV2FybkFnZ3IoKTtcbiAgcHJpdmF0ZSB2aWV3OiBhbnk9dW5kZWZpbmVkO1xuXG4gIHB1YmxpYyBkaXNhYmxlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBwcml2YXRlIHZpZXdTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlcG9ydFNlcnZpY2U6IFJlcG9ydGVyU2VydmljZSwgcHJpdmF0ZSBnZW9TZXJ2aWNlOiBHZW9ncmFwaGljU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBzbmFja0JhcjogU25hY2tiYXJTZXJ2aWNlKSB7IH1cblxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZCAmJiBjaGFuZ2VzLmRpc2FibGVkLmN1cnJlbnRWYWx1ZSE9Y2hhbmdlcy5kaXNhYmxlZC5wcmV2aW91c1ZhbHVlKVxuICAgICAgdGhpcy5jaGFuZ2VDb250cm9sU3RhdHVzKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICB9XG4gIHByaXZhdGUgY2hhbmdlQ29udHJvbFN0YXR1cygpe1xuXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGlmICh0aGlzLnZpZXdTdWJzY3JpcHRpb24pIHRoaXMudmlld1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH0gZWxzZXtcblxuICAgICAgICB0aGlzLnZpZXdTdWJzY3JpcHRpb24gPSB0aGlzLmdlb1NlcnZpY2Uub25WaWV3Q2FuZ2UoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICBkYXRhPT57XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3YXJuaW5nIHBsdXZpbyAnLHRoaXMuZGlzYWJsZWQsZGF0YSk7XG4gICAgICAgICAgICAgIHRoaXMudmlldz1kYXRhO1xuICAgICAgICAgICAgICB0aGlzLnJlc2V0V2FybmluZ0lkcm8oKTtcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb250cm9sU3RhdHVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDb250cm9sU3RhdHVzKGRpc2FibGU6IGJvb2xlYW49ZmFsc2UpIHtcbiAgICB0aGlzLmRpc2FibGVkJC5uZXh0KHRoaXMudmlldz09dW5kZWZpbmVkIHx8IHRoaXMuZGlzYWJsZWQgfHwgZGlzYWJsZSk7XG4gIH1cbiAgLypXQVJOSU5HSURSTyovXG4gIHB1YmxpYyB3YXJuaW5nc0lkcm86IGFueTtcblxuICByZXNldFdhcm5pbmdJZHJvKCkge1xuICAgIHRoaXMud2FybmluZ3NJZHJvID0gW1xuICAgICAge1xuICAgICAgICBpZDowLFxuICAgICAgICBhZ2dyZWdhemlvbmU6JydcbiAgICAgIH1cbiAgICBdO1xuICAgIHRoaXMudXBkYXRlV2FybmluZ0xheWVycygpO1xuICB9XG5cbiAgYWRkV2FybmluZ0lkcm8oKXtcbiAgICB0aGlzLndhcm5pbmdzSWRybyA9IFsuLi50aGlzLndhcm5pbmdzSWRybywge2lkOjEsIGFnZ3JlZ2F6aW9uZTonJ31dXG4gIH1cbiAgZGVsV2FybmluZ0lkcm8oaXRlbTphbnkpIHtcbiAgICB0aGlzLndhcm5pbmdzSWRybyA9IHRoaXMud2FybmluZ3NJZHJvLmZpbHRlcigoeDogYW55KSA9PiB4ICE9IGl0ZW0pXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVdhcm5pbmdMYXllcnMoKXtcbiAgICBjb25zdCBsYXllcjogYW55W109W107XG4gICAgdGhpcy53YXJuaW5nc0lkcm8uZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhpdGVtKTtcbiAgICAgIGlmIChpdGVtLmRhdGEpXG4gICAgICAgIGxheWVyLnB1c2goaXRlbS5kYXRhKTtcbiAgICB9KTtcbiAgICB0aGlzLndhcm5pbmdDaGFuZ2UuZW1pdChsYXllcik7XG5cbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RBZ2dyZWdhdGlvbihhZ2dyOiBzdHJpbmcsIHdhcm5pbmc6IGFueSkge1xuICAgIHRoaXMuZGlzYWJsZWQkLm5leHQodHJ1ZSk7XG4gICAgdGhpcy5yZXBvcnRTZXJ2aWNlLmdldFdhcm5pbmcoe1xuICAgICAgICBhZ2dyZWdhdGlvbjogYWdncixcbiAgICAgICAgdHlwZTogJ25hdGlvbmFsX0lEUk9NRVRSTycsXG4gICAgICAgIGRhdGVfdG86IHRoaXMucmVwb3J0LnRvVVRDU2Vjb25kLFxuICAgICAgICBsb246IHRoaXMudmlldy5sb24sIGxhdDogdGhpcy52aWV3LmxhdCwgem9vbTogdGhpcy52aWV3Lnpvb21cbiAgICAgIH0pXG4gICAgICAucGlwZShmaW5hbGl6ZSgoKSA9PiB0aGlzLmRpc2FibGVkJC5uZXh0KGZhbHNlKSkpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgZGF0YSA9PiB7XG4gICAgICAgIHdhcm5pbmcuZGF0YT1kYXRhO1xuICAgICAgICB0aGlzLnVwZGF0ZVdhcm5pbmdMYXllcnMoKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcj0+e1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgdGhpcy5zbmFja0Jhci5lcnJvcignU2kgw6ggdmVyaWZpY2F0byB1biBlcnJvcmUgZHVyYW50ZSBsYSBsZXR0dXJhIGRlaSB3YXJuaW5nIGlkcm9tZXRyaWNpJywgJycsIHtkdXJhdGlvbjoyMDAwfSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG59XG4iLCI8aDM+V2FybmluZ3MgSWRyb21ldHJpY2k8L2gzPlxuXG48ZGl2IGNsYXNzPVwid2FybmluZ0lkcm9cIiAqbmdGb3I9XCJsZXQgd2FybmluZyBvZiB3YXJuaW5nc0lkcm8sIGxldCBpID0gaW5kZXhcIj5cblxuICA8ZGl2IGNsYXNzPVwiaXRlbS1saXN0LWJpZy1idWxsIGJnLWluZm9cIj5cbiAgICA8c3Bhbj57e2krMX19PC9zcGFuPlxuICA8L2Rpdj5cblxuICA8bWF0LWZvcm0tZmllbGQgYXBwZWFyYW5jZT1cImZpbGxcIiBjbGFzcz1cInctMTAwXCI+XG4gICAgPG1hdC1sYWJlbD5BZ2dyZWdhemlvbmU8L21hdC1sYWJlbD5cbiAgICA8bWF0LXNlbGVjdCBbKHZhbHVlKV09XCJ3YXJuaW5nLnNlbGVjdGVkXCIgKHZhbHVlQ2hhbmdlKT1cInNlbGVjdEFnZ3JlZ2F0aW9uKCRldmVudCx3YXJuaW5nKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZCQgfCBhc3luY1wiPlxuICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGFnZ3JlZ2F6aW9uZSBvZiBhZ2dyV2FybmluZyQgfCBhc3luY1wiIFt2YWx1ZV09XCJhZ2dyZWdhemlvbmUudmFsdWVcIj5cbiAgICAgICAge3thZ2dyZWdhemlvbmUuZGVzY3J9fVxuICAgICAgPC9tYXQtb3B0aW9uPlxuICAgIDwvbWF0LXNlbGVjdD5cbiAgPC9tYXQtZm9ybS1maWVsZD5cblxuICA8ZGl2IGNsYXNzPVwiZGVsLWJ0bi13cmFwcGVyIG1zLTJcIj5cbiAgICA8c3BhbiBjbGFzcz1cImRlbC1idG4gZmFzIGZhLXRyYXNoLWFsdFwiICpuZ0lmPVwiaT4wXCIgKGNsaWNrKT1cImRlbFdhcm5pbmdJZHJvKHdhcm5pbmcpXCI+PC9zcGFuPlxuICA8L2Rpdj5cblxuPC9kaXY+XG5cbjxidXR0b24gbWF0LWZsYXQtYnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIGNsYXNzPVwiYmctc3VjY2Vzc1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZCQgfCBhc3luY1wiIChjbGljayk9XCJhZGRXYXJuaW5nSWRybygpXCI+PHNwYW4gY2xhc3M9XCJmYXMgZmEtcGx1cyBtZS0xXCI+PC9zcGFuPkFnZ2l1bmdpIFdhcm5pbmcgSWRybzwvYnV0dG9uPlxuIl19