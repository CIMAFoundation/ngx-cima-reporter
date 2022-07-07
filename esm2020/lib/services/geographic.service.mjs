import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
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
export { GeographicService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GeographicService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvZ3JhcGhpYy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL3NlcnZpY2VzL2dlb2dyYXBoaWMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBdUIsTUFBTSxNQUFNLENBQUM7O0lBUzdDLGlCQUFpQixTQUFqQixpQkFBaUI7SUFJNUIsc0NBQXNDO0lBQ3RDO1FBSlEsU0FBSSxHQUFVLEtBQUssQ0FBQztRQUNwQixxQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBUSxFQUFFLENBQUMsQ0FBQztRQUNsRCxpQkFBWSxHQUFFLElBQUksZUFBZSxDQUFNLFNBQVMsQ0FBQyxDQUFDO0lBRTNDLENBQUM7SUFFVCxRQUFRO1FBQ1gsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUNNLFVBQVU7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRU0sUUFBUSxDQUFDLElBQVM7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUM7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNNLFdBQVcsQ0FBQyxRQUFlO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLGdCQUFnQjtRQUNuQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBQ00sV0FBVztRQUNkLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBQ00sUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0NBRUYsQ0FBQTsrR0FoQ1ksaUJBQWlCO21IQUFqQixpQkFBaUIsY0FGaEIsTUFBTTtBQUVQLGlCQUFpQjtJQUovQixZQUFZLEVBQUU7R0FJQSxpQkFBaUIsQ0FnQzdCO1NBaENZLGlCQUFpQjs0RkFBakIsaUJBQWlCO2tCQUgvQixVQUFVO21CQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVW50aWxEZXN0cm95IH0gZnJvbSBcIkBuZ25lYXQvdW50aWwtZGVzdHJveVwiO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcblxuXG5cblxuQFVudGlsRGVzdHJveSgpXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB9KVxuICBleHBvcnQgY2xhc3MgR2VvZ3JhcGhpY1NlcnZpY2Uge1xuICAgIHByaXZhdGUgbG9jazogYm9vbGVhbj1mYWxzZTtcbiAgICBwcml2YXRlIHNlbGVjdGVkRmVhdHVyZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueVtdPihbXSk7XG4gICAgcHJpdmF0ZSBjdXJyZW50Vmlld3M9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55Pih1bmRlZmluZWQpO1xuICAgIC8vVE9ET08gQUdHSVVOR0VSRSBSSVRBR0xJTyBHRU9HUkFGSUNPXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIGxvY2tWaWV3KCl7XG4gICAgICAgIHRoaXMubG9jaz10cnVlO1xuICAgIH1cbiAgICBwdWJsaWMgdW5sb2NrVmlldygpIHtcbiAgICAgICAgdGhpcy5sb2NrPWZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRWaWV3cyh2aWV3OiBhbnkpe1xuICAgICAgICB0aGlzLmxvY2s9ZmFsc2U7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXdzLm5leHQodmlldyk7XG4gICAgfVxuICAgIHB1YmxpYyBzZXRGZWF0dXJlcyhmZWF0dXJlczogYW55W10pe1xuICAgICAgICB0aGlzLnNlbGVjdGVkRmVhdHVyZXMubmV4dChmZWF0dXJlcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRmVhdHVyZXNDaGFuZ2UoKTogT2JzZXJ2YWJsZTxhbnlbXT57XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRmVhdHVyZXMuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuICAgIHB1YmxpYyBvblZpZXdDYW5nZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50Vmlld3MuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuICAgIHB1YmxpYyBpc0xvY2tlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jaztcbiAgICB9XG5cbiAgfSJdfQ==