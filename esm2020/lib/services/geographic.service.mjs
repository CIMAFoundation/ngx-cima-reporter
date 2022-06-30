import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
let GeographicService = class GeographicService {
    //TODOO AGGIUNGERE RITAGLIO GEOGRAFICO
    constructor() {
        this.selectedFeatures = new BehaviorSubject([]);
        this.currentViews = new BehaviorSubject(undefined);
    }
    setViews(view) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvZ3JhcGhpYy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL3NlcnZpY2VzL2dlb2dyYXBoaWMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBdUIsTUFBTSxNQUFNLENBQUM7O0lBUzdDLGlCQUFpQixTQUFqQixpQkFBaUI7SUFHNUIsc0NBQXNDO0lBQ3RDO1FBSFEscUJBQWdCLEdBQUcsSUFBSSxlQUFlLENBQVEsRUFBRSxDQUFDLENBQUM7UUFDbEQsaUJBQVksR0FBRSxJQUFJLGVBQWUsQ0FBTSxTQUFTLENBQUMsQ0FBQztJQUUzQyxDQUFDO0lBRVQsUUFBUSxDQUFDLElBQVM7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNNLFdBQVcsQ0FBQyxRQUFlO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLGdCQUFnQjtRQUNuQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBQ00sV0FBVztRQUNkLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0NBR0YsQ0FBQTsrR0FyQlksaUJBQWlCO21IQUFqQixpQkFBaUIsY0FGaEIsTUFBTTtBQUVQLGlCQUFpQjtJQUovQixZQUFZLEVBQUU7R0FJQSxpQkFBaUIsQ0FxQjdCO1NBckJZLGlCQUFpQjs0RkFBakIsaUJBQWlCO2tCQUgvQixVQUFVO21CQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVW50aWxEZXN0cm95IH0gZnJvbSBcIkBuZ25lYXQvdW50aWwtZGVzdHJveVwiO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcblxuXG5cblxuQFVudGlsRGVzdHJveSgpXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB9KVxuICBleHBvcnQgY2xhc3MgR2VvZ3JhcGhpY1NlcnZpY2Uge1xuICAgIHByaXZhdGUgc2VsZWN0ZWRGZWF0dXJlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KFtdKTtcbiAgICBwcml2YXRlIGN1cnJlbnRWaWV3cz0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHVuZGVmaW5lZCk7XG4gICAgLy9UT0RPTyBBR0dJVU5HRVJFIFJJVEFHTElPIEdFT0dSQUZJQ09cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgc2V0Vmlld3ModmlldzogYW55KXtcbiAgICAgICAgdGhpcy5jdXJyZW50Vmlld3MubmV4dCh2aWV3KTtcbiAgICB9XG4gICAgcHVibGljIHNldEZlYXR1cmVzKGZlYXR1cmVzOiBhbnlbXSl7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGZWF0dXJlcy5uZXh0KGZlYXR1cmVzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25GZWF0dXJlc0NoYW5nZSgpOiBPYnNlcnZhYmxlPGFueVtdPntcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRGZWF0dXJlcy5hc09ic2VydmFibGUoKTtcbiAgICB9XG4gICAgcHVibGljIG9uVmlld0NhbmdlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRWaWV3cy5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cblxuICB9Il19