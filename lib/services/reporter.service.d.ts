import { HttpClient } from '@angular/common/http';
import { CimaEnvironment } from '@cima/commons';
import { Observable } from 'rxjs';
import { Aggregation, Cumul, Layer, MapParameter, Report, Station, WarningAggregation } from '../models/interfaces';
import { GeographicService } from './geographic.service';
import * as i0 from "@angular/core";
export declare class ReporterService {
    private env;
    private http;
    private geoService;
    constructor(env: CimaEnvironment, http: HttpClient, geoService: GeographicService);
    bboxSet: boolean;
    private backend_url;
    private execute_get;
    private execute_post;
    createReport(report: Report): Observable<Blob>;
    /**
     * Return aggregations layers
     * @param aggregation
     * @returns
     */
    getWarning(aggregation: Aggregation): Observable<Layer>;
    /**
     * Return pluvios
     * @param regions:  list of regions separated by comma
     * @param date_to: utc date in seconds
     * @param cumul
     * @returns array of stations
     */
    getPluvio(regions: string, date_to: number, cumul: number, bbox: L.LatLngBounds): Observable<Station[]>;
    /**
     * Return Hydros
     * @param regions: list of regions separated by comma
     * @param date_to: utc date in seconds
     * @returns array of stations
     */
    getHydro(regions: string, date_to: number, bbox: L.LatLngBounds): Observable<Station[]>;
    /**
     * Create maps for previous state, SRI, SRI Adj, VMI, Heavy Rain warning, Snow Hunter and current state
     * @param mapParameters
     * @returns Layer (json)
     */
    printMap(mapParameters: MapParameter): Observable<Layer>;
    /**
     *
     * @param dataTypeId //enum?
     * @param from
     * @param to
     * @returns
     */
    getForecastDatasAvailability(dataTypeId: string, from: number, to: number): Observable<any>;
    getForecastData(dataTypeId: string, run: any): Observable<any>;
    getAvailableCumul(): Observable<Cumul[]>;
    getAvailablesWarnAggr(): Observable<WarningAggregation[]>;
    getAvailableMaps(): Observable<any[]>;
    uploadImage(file: any, title: string): Observable<Layer>;
    getAncillaryLayer(idlayer: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReporterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReporterService>;
}
