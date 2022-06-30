import { Observable } from "rxjs";
import * as i0 from "@angular/core";
export declare class GeographicService {
    private selectedFeatures;
    private currentViews;
    constructor();
    setViews(view: any): void;
    setFeatures(features: any[]): void;
    onFeaturesChange(): Observable<any[]>;
    onViewCange(): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GeographicService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GeographicService>;
}
