import { Inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ReporterService {
    constructor(env, http) {
        this.env = env;
        this.http = http;
    }
    backend_url(relPath) {
        //https://acroweb3-portal-backend-test.cimafoundation.org/reporter/api/
        return `https://acroweb3-portal-backend-test.cimafoundation.org/reporter/api/${relPath}`;
        // return `http://localhost:8000/${relPath}`;
        //return `${this.env.server.baseUrl}/reporter/${relPath}`;
    }
    execute_get(url, httpParams = undefined) {
        return this.http.get(this.backend_url(url), { params: httpParams });
    }
    execute_post(url, object) {
        return this.http.post(this.backend_url(url), object).pipe(map((data) => {
            return data;
        }, (error) => {
            console.error(error);
        }));
    }
    createReport(report) {
        return this.http.post(this.backend_url('create_report/'), report, { responseType: 'blob' });
    }
    /**
     * Return aggregations layers
     * @param aggregation
     * @returns
     */
    getWarning(aggregation) {
        return this.execute_post('aggregation_warning/', aggregation).pipe(map((data) => {
            return data;
        }, (error) => {
            console.error(error);
        }));
    }
    /**
     * Return pluvios
     * @param regions:  list of regions separated by comma
     * @param date_to: utc date in seconds
     * @param cumul
     * @returns array of stations
     */
    getPluvio(regions, date_to, cumul, bbox) {
        return this.execute_post('list_pluvio/', { regions: (regions.length > 0 ? regions : undefined), date_to: date_to, cumul: cumul,
            lat_min: bbox.getSouth(), lat_max: bbox.getNorth(),
            lon_min: bbox.getWest(), lon_max: bbox.getEast()
        });
    }
    /**
     * Return Hydros
     * @param regions: list of regions separated by comma
     * @param date_to: utc date in seconds
     * @returns array of stations
     */
    getHydro(regions, date_to, bbox) {
        return this.execute_post('list_hydro/', { regions: (regions.length > 0 ? regions : undefined), date_to: date_to,
            lat_min: bbox.getSouth(), lat_max: bbox.getNorth(),
            lon_min: bbox.getWest(), lon_max: bbox.getEast() });
    }
    /**
     * Create maps for previous state, SRI, SRI Adj, VMI, Heavy Rain warning, Snow Hunter and current state
     * @param mapParameters
     * @returns Layer (json)
     */
    printMap(mapParameters) {
        return this.execute_post('print_map/', mapParameters);
    }
    /**
     *
     * @param dataTypeId //enum?
     * @param from
     * @param to
     * @returns
     */
    getForecastDatasAvailability(dataTypeId, from, to) {
        return this.execute_post('forecast_data_availability/', { dataTypeId: dataTypeId, from: from, to: to });
    }
    getForecastData(dataTypeId, run) {
        return this.execute_post('get_forecast_data/', { dataTypeId: dataTypeId, descr: run.descr, path: run.path });
    }
    getAvailableCumul() {
        //TODO LEGGERE DA BACKEND IN FUTURO
        const cumulata = [
            {
                id: 1,
                value: 1,
                descr: '1 Ora'
            },
            {
                id: 2,
                value: 3,
                descr: '3 Ore'
            },
            {
                id: 3,
                value: 6,
                descr: '6 Ore'
            },
            {
                id: 4,
                value: 12,
                descr: '12 Ore'
            },
            {
                id: 5,
                value: 24,
                descr: '24 Ore'
            },
            {
                id: 6,
                value: 36,
                descr: '36 Ore'
            },
            {
                id: 7,
                value: 48,
                descr: '48 Ore'
            },
            {
                id: 8,
                value: 72,
                descr: '72 Ore'
            },
            {
                id: 10,
                value: 0,
                descr: 'Time Range'
            }
        ];
        return of(cumulata);
    }
    getAvailablesWarnAggr() {
        //TODO LEGGERE DA BACKEND IN FUTURO
        const aggWarning = [
            {
                id: 1,
                descr: 'Regione',
                value: 'regions_it'
            },
            {
                id: 2,
                descr: 'Provincie',
                value: 'districts_it'
            },
            {
                id: 3,
                descr: 'Comuni',
                value: 'municipalities_it'
            },
            {
                id: 4,
                descr: 'Bacini',
                value: 'catchments_it'
            },
            {
                id: 5,
                descr: 'Zone di Allertamento',
                value: 'warningareas_it'
            },
        ];
        return of(aggWarning);
    }
    getAvailableMaps() {
        const maps = [
            { id: 1, value: 'RADAR_DPC_HDF5_SRI', description: 'SRI' },
            { id: 2, value: 'RADAR_DPC_HDF5_SRIADJ_TEST', description: 'SRI Adjusted' },
            { id: 3, value: 'RADAR_HDF5_VMI', description: 'VMI' },
            { id: 4, value: 'RADAR_DPC_HRW', description: 'Heavy Rain Warning' },
            { id: 5, value: 'SNOW_HUNTER', description: 'Snow Hunter' },
        ];
        return of(maps);
    }
    //SRI, SRI Adjusted, VMI, Heavy Rain Warning, Snow Hunter
    uploadImage(file, title) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        return this.execute_post('upload_img/', formData);
    }
    getAncillaryLayer(idlayer) {
        // https://dds.cimafoundation.org/sentinel/sentinelapi/aggr/layer/regions_it/
        return this.execute_get(idlayer + '_geometry/');
        //return this.http.get('https://dds.cimafoundation.org/sentinel/sentinelapi/aggr/layer/'+idlayer+'/');
    }
}
ReporterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterService, deps: [{ token: 'env' }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
ReporterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['env']
                }] }, { type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NpbWEvcmVwb3J0ZXIvc3JjL2xpYi9zZXJ2aWNlcy9yZXBvcnRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25ELE9BQU8sRUFBYyxFQUFFLEVBQVcsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFNckMsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFDeUIsR0FBb0IsRUFDbkMsSUFBZ0I7UUFERCxRQUFHLEdBQUgsR0FBRyxDQUFpQjtRQUNuQyxTQUFJLEdBQUosSUFBSSxDQUFZO0lBQ3ZCLENBQUM7SUFHSSxXQUFXLENBQUMsT0FBZTtRQUNqQyx1RUFBdUU7UUFDdkUsT0FBTyx3RUFBd0UsT0FBTyxFQUFFLENBQUM7UUFDekYsNkNBQTZDO1FBQzdDLDBEQUEwRDtJQUM1RCxDQUFDO0lBRU8sV0FBVyxDQUFDLEdBQVcsRUFBRSxhQUF1QixTQUFTO1FBQy9ELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFTyxZQUFZLENBQUMsR0FBVyxFQUFFLE1BQVc7UUFDM0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDdkQsR0FBRyxDQUNELENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDUCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsRUFDRCxDQUFDLEtBQVUsRUFBRSxFQUFF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QyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBR00saUJBQWlCLENBQUMsT0FBZTtRQUNyQyw2RUFBNkU7UUFDN0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxzR0FBc0c7SUFDekcsQ0FBQzs7NkdBdE5VLGVBQWUsa0JBRWhCLEtBQUs7aUhBRkosZUFBZSxjQUZkLE1BQU07NEZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUdJLE1BQU07MkJBQUMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2ltYUVudmlyb25tZW50IH0gZnJvbSAnQGNpbWEvY29tbW9ucyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWdncmVnYXRpb24sIEN1bXVsLCBMYXllciwgTWFwUGFyYW1ldGVyLCBSZXBvcnQsIFN0YXRpb24sIFdhcm5pbmdBZ2dyZWdhdGlvbiB9IGZyb20gJy4uL21vZGVscy9pbnRlcmZhY2VzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlcG9ydGVyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2VudicpIHByaXZhdGUgZW52OiBDaW1hRW52aXJvbm1lbnQsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50XG4gICkge31cblxuXG4gIHByaXZhdGUgYmFja2VuZF91cmwocmVsUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvL2h0dHBzOi8vYWNyb3dlYjMtcG9ydGFsLWJhY2tlbmQtdGVzdC5jaW1hZm91bmRhdGlvbi5vcmcvcmVwb3J0ZXIvYXBpL1xuICAgIHJldHVybiBgaHR0cHM6Ly9hY3Jvd2ViMy1wb3J0YWwtYmFja2VuZC10ZXN0LmNpbWFmb3VuZGF0aW9uLm9yZy9yZXBvcnRlci9hcGkvJHtyZWxQYXRofWA7XG4gICAgLy8gcmV0dXJuIGBodHRwOi8vbG9jYWxob3N0OjgwMDAvJHtyZWxQYXRofWA7XG4gICAgLy9yZXR1cm4gYCR7dGhpcy5lbnYuc2VydmVyLmJhc2VVcmx9L3JlcG9ydGVyLyR7cmVsUGF0aH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBleGVjdXRlX2dldCh1cmw6IHN0cmluZywgaHR0cFBhcmFtczogSHR0cFBhcmFtcz11bmRlZmluZWQpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFja2VuZF91cmwodXJsKSwgIHsgcGFyYW1zOiBodHRwUGFyYW1zIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBleGVjdXRlX3Bvc3QodXJsOiBzdHJpbmcsIG9iamVjdDogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYWNrZW5kX3VybCh1cmwpLCBvYmplY3QpLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZVJlcG9ydChyZXBvcnQ6IFJlcG9ydCk6IE9ic2VydmFibGU8QmxvYj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhY2tlbmRfdXJsKCdjcmVhdGVfcmVwb3J0LycpLCByZXBvcnQse3Jlc3BvbnNlVHlwZTogJ2Jsb2InfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFnZ3JlZ2F0aW9ucyBsYXllcnNcbiAgICogQHBhcmFtIGFnZ3JlZ2F0aW9uXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwdWJsaWMgZ2V0V2FybmluZyhhZ2dyZWdhdGlvbjogQWdncmVnYXRpb24pOiBPYnNlcnZhYmxlPExheWVyPiB7XG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZV9wb3N0KCdhZ2dyZWdhdGlvbl93YXJuaW5nLycsIGFnZ3JlZ2F0aW9uKS5waXBlKFxuICAgICAgbWFwKFxuICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gcGx1dmlvc1xuICAgKiBAcGFyYW0gcmVnaW9uczogIGxpc3Qgb2YgcmVnaW9ucyBzZXBhcmF0ZWQgYnkgY29tbWFcbiAgICogQHBhcmFtIGRhdGVfdG86IHV0YyBkYXRlIGluIHNlY29uZHNcbiAgICogQHBhcmFtIGN1bXVsXG4gICAqIEByZXR1cm5zIGFycmF5IG9mIHN0YXRpb25zXG4gICAqL1xuICBwdWJsaWMgZ2V0UGx1dmlvKHJlZ2lvbnM6IHN0cmluZywgZGF0ZV90bzogbnVtYmVyLCBjdW11bDogbnVtYmVyLCBiYm94OiBMLkxhdExuZ0JvdW5kcyk6IE9ic2VydmFibGU8U3RhdGlvbltdPiB7XG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZV9wb3N0KCdsaXN0X3BsdXZpby8nLCB7cmVnaW9uczogKHJlZ2lvbnMubGVuZ3RoPjA/cmVnaW9uczp1bmRlZmluZWQpLCBkYXRlX3RvOiBkYXRlX3RvLCBjdW11bDogY3VtdWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXRfbWluOiBiYm94LmdldFNvdXRoKCksIGxhdF9tYXg6IGJib3guZ2V0Tm9ydGgoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvbl9taW46IGJib3guZ2V0V2VzdCgpLCBsb25fbWF4OiBiYm94LmdldEVhc3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gSHlkcm9zXG4gICAqIEBwYXJhbSByZWdpb25zOiBsaXN0IG9mIHJlZ2lvbnMgc2VwYXJhdGVkIGJ5IGNvbW1hXG4gICAqIEBwYXJhbSBkYXRlX3RvOiB1dGMgZGF0ZSBpbiBzZWNvbmRzXG4gICAqIEByZXR1cm5zIGFycmF5IG9mIHN0YXRpb25zXG4gICAqL1xuICBwdWJsaWMgZ2V0SHlkcm8ocmVnaW9uczogc3RyaW5nLCBkYXRlX3RvOiBudW1iZXIsIGJib3g6IEwuTGF0TG5nQm91bmRzKTogT2JzZXJ2YWJsZTxTdGF0aW9uW10+IHtcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlX3Bvc3QoJ2xpc3RfaHlkcm8vJyx7cmVnaW9uczogKHJlZ2lvbnMubGVuZ3RoPjA/cmVnaW9uczp1bmRlZmluZWQpLCBkYXRlX3RvOiBkYXRlX3RvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0X21pbjogYmJveC5nZXRTb3V0aCgpLCBsYXRfbWF4OiBiYm94LmdldE5vcnRoKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25fbWluOiBiYm94LmdldFdlc3QoKSwgbG9uX21heDogYmJveC5nZXRFYXN0KCl9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBtYXBzIGZvciBwcmV2aW91cyBzdGF0ZSwgU1JJLCBTUkkgQWRqLCBWTUksIEhlYXZ5IFJhaW4gd2FybmluZywgU25vdyBIdW50ZXIgYW5kIGN1cnJlbnQgc3RhdGVcbiAgICogQHBhcmFtIG1hcFBhcmFtZXRlcnNcbiAgICogQHJldHVybnMgTGF5ZXIgKGpzb24pXG4gICAqL1xuICBwdWJsaWMgcHJpbnRNYXAobWFwUGFyYW1ldGVyczogTWFwUGFyYW1ldGVyKTogT2JzZXJ2YWJsZTxMYXllcj4ge1xuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVfcG9zdCgncHJpbnRfbWFwLycsIG1hcFBhcmFtZXRlcnMgKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YVR5cGVJZCAvL2VudW0/XG4gICAqIEBwYXJhbSBmcm9tXG4gICAqIEBwYXJhbSB0b1xuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIGdldEZvcmVjYXN0RGF0YXNBdmFpbGFiaWxpdHkoZGF0YVR5cGVJZDogc3RyaW5nLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVfcG9zdCgnZm9yZWNhc3RfZGF0YV9hdmFpbGFiaWxpdHkvJyx7ZGF0YVR5cGVJZDogZGF0YVR5cGVJZCwgZnJvbTogZnJvbSwgdG86IHRvfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Rm9yZWNhc3REYXRhKGRhdGFUeXBlSWQ6IHN0cmluZywgcnVuOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVfcG9zdCgnZ2V0X2ZvcmVjYXN0X2RhdGEvJyx7ZGF0YVR5cGVJZDogZGF0YVR5cGVJZCwgZGVzY3I6IHJ1bi5kZXNjciwgcGF0aDogcnVuLnBhdGh9KTtcbiAgfVxuXG5cbiAgcHVibGljIGdldEF2YWlsYWJsZUN1bXVsKCk6IE9ic2VydmFibGU8Q3VtdWxbXT4ge1xuICAgIC8vVE9ETyBMRUdHRVJFIERBIEJBQ0tFTkQgSU4gRlVUVVJPXG4gICAgY29uc3QgY3VtdWxhdGE9W1xuICAgICAge1xuICAgICAgICBpZDoxLFxuICAgICAgICB2YWx1ZTogMSxcbiAgICAgICAgZGVzY3I6ICcxIE9yYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOjIsXG4gICAgICAgIHZhbHVlOiAzLFxuICAgICAgICBkZXNjcjogJzMgT3JlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6MyxcbiAgICAgICAgdmFsdWU6IDYsXG4gICAgICAgIGRlc2NyOiAnNiBPcmUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDo0LFxuICAgICAgICB2YWx1ZTogMTIsXG4gICAgICAgIGRlc2NyOiAnMTIgT3JlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6NSxcbiAgICAgICAgdmFsdWU6IDI0LFxuICAgICAgICBkZXNjcjogJzI0IE9yZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOjYsXG4gICAgICAgIHZhbHVlOiAzNixcbiAgICAgICAgZGVzY3I6ICczNiBPcmUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDo3LFxuICAgICAgICB2YWx1ZTogNDgsXG4gICAgICAgIGRlc2NyOiAnNDggT3JlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6OCxcbiAgICAgICAgdmFsdWU6IDcyLFxuICAgICAgICBkZXNjcjogJzcyIE9yZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOjEwLFxuICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgZGVzY3I6ICdUaW1lIFJhbmdlJ1xuICAgICAgfVxuICAgIF1cbiAgICByZXR1cm4gb2YoY3VtdWxhdGEpO1xuICB9XG5cbiAgcHVibGljIGdldEF2YWlsYWJsZXNXYXJuQWdncigpOiBPYnNlcnZhYmxlPFdhcm5pbmdBZ2dyZWdhdGlvbltdPiB7XG4gICAgLy9UT0RPIExFR0dFUkUgREEgQkFDS0VORCBJTiBGVVRVUk9cbiAgICBjb25zdCBhZ2dXYXJuaW5nPVtcbiAgICAgIHtcbiAgICAgICAgaWQ6MSxcbiAgICAgICAgZGVzY3I6ICdSZWdpb25lJyxcbiAgICAgICAgdmFsdWU6J3JlZ2lvbnNfaXQnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDoyLFxuICAgICAgICBkZXNjcjogJ1Byb3ZpbmNpZScsXG4gICAgICAgIHZhbHVlOidkaXN0cmljdHNfaXQnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDozLFxuICAgICAgICBkZXNjcjogJ0NvbXVuaScsXG4gICAgICAgIHZhbHVlOidtdW5pY2lwYWxpdGllc19pdCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOjQsXG4gICAgICAgIGRlc2NyOiAnQmFjaW5pJyxcbiAgICAgICAgdmFsdWU6J2NhdGNobWVudHNfaXQnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDo1LFxuICAgICAgICBkZXNjcjogJ1pvbmUgZGkgQWxsZXJ0YW1lbnRvJyxcbiAgICAgICAgdmFsdWU6J3dhcm5pbmdhcmVhc19pdCdcbiAgICAgIH0sXG4gICAgXVxuICAgIHJldHVybiBvZihhZ2dXYXJuaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdmFpbGFibGVNYXBzKCk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICBjb25zdCBtYXBzPVtcbiAgICAgIHtpZDogMSwgdmFsdWU6ICdSQURBUl9EUENfSERGNV9TUkknLCBkZXNjcmlwdGlvbjogJ1NSSSd9LFxuICAgICAge2lkOiAyLCB2YWx1ZTogJ1JBREFSX0RQQ19IREY1X1NSSUFESl9URVNUJywgZGVzY3JpcHRpb246ICdTUkkgQWRqdXN0ZWQnfSxcbiAgICAgIHtpZDogMywgdmFsdWU6ICdSQURBUl9IREY1X1ZNSScsIGRlc2NyaXB0aW9uOiAnVk1JJ30sXG4gICAgICB7aWQ6IDQsIHZhbHVlOiAnUkFEQVJfRFBDX0hSVycsIGRlc2NyaXB0aW9uOiAnSGVhdnkgUmFpbiBXYXJuaW5nJ30sXG4gICAgICB7aWQ6IDUsIHZhbHVlOiAnU05PV19IVU5URVInLCBkZXNjcmlwdGlvbjogJ1Nub3cgSHVudGVyJ30sXG4gICAgXVxuICAgIHJldHVybiBvZihtYXBzKTtcbiAgfVxuXG4gIC8vU1JJLCBTUkkgQWRqdXN0ZWQsIFZNSSwgSGVhdnkgUmFpbiBXYXJuaW5nLCBTbm93IEh1bnRlclxuXG4gIHB1YmxpYyB1cGxvYWRJbWFnZShmaWxlOiBhbnksIHRpdGxlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExheWVyPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3RpdGxlJywgdGl0bGUpO1xuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVfcG9zdCgndXBsb2FkX2ltZy8nLCBmb3JtRGF0YSk7XG4gIH1cblxuXG4gIHB1YmxpYyBnZXRBbmNpbGxhcnlMYXllcihpZGxheWVyOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAvLyBodHRwczovL2Rkcy5jaW1hZm91bmRhdGlvbi5vcmcvc2VudGluZWwvc2VudGluZWxhcGkvYWdnci9sYXllci9yZWdpb25zX2l0L1xuICAgICByZXR1cm4gdGhpcy5leGVjdXRlX2dldChpZGxheWVyKydfZ2VvbWV0cnkvJyk7XG4gICAgIC8vcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ2h0dHBzOi8vZGRzLmNpbWFmb3VuZGF0aW9uLm9yZy9zZW50aW5lbC9zZW50aW5lbGFwaS9hZ2dyL2xheWVyLycraWRsYXllcisnLycpO1xuICB9IFxufVxuXG5cbiJdfQ==