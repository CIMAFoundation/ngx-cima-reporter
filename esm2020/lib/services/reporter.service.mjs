import { Inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./geographic.service";
export class ReporterService {
    constructor(env, http, geoService) {
        this.env = env;
        this.http = http;
        this.geoService = geoService;
        this.bboxSet = false;
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
        this.geoService.lockView();
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
        this.geoService.lockView();
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
ReporterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterService, deps: [{ token: 'env' }, { token: i1.HttpClient }, { token: i2.GeographicService }], target: i0.ɵɵFactoryTarget.Injectable });
ReporterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['env']
                }] }, { type: i1.HttpClient }, { type: i2.GeographicService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NpbWEvcmVwb3J0ZXIvc3JjL2xpYi9zZXJ2aWNlcy9yZXBvcnRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25ELE9BQU8sRUFBYyxFQUFFLEVBQVcsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBT3JDLE1BQU0sT0FBTyxlQUFlO0lBQzFCLFlBQ3lCLEdBQW9CLEVBQ25DLElBQWdCLEVBQ2hCLFVBQTZCO1FBRmQsUUFBRyxHQUFILEdBQUcsQ0FBaUI7UUFDbkMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUd2QyxZQUFPLEdBQUcsS0FBSyxDQUFBO0lBRlosQ0FBQztJQUtJLFdBQVcsQ0FBQyxPQUFlO1FBQ2pDLHVFQUF1RTtRQUN2RSxPQUFPLHdFQUF3RSxPQUFPLEVBQUUsQ0FBQztRQUN6Riw2Q0FBNkM7UUFDN0MsMERBQTBEO0lBQzVELENBQUM7SUFFTyxXQUFXLENBQUMsR0FBVyxFQUFFLGFBQXVCLFNBQVM7UUFDL0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFHLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVPLFlBQVksQ0FBQyxHQUFXLEVBQUUsTUFBVztRQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUN2RCxHQUFHLENBQ0QsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNQLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUNELENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRU0sWUFBWSxDQUFDLE1BQWM7UUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsTUFBTSxFQUFDLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxVQUFVLENBQUMsV0FBd0I7UUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUNoRSxHQUFHLENBQ0QsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNQLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUNELENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksU0FBUyxDQUFDLE9BQWUsRUFBRSxPQUFlLEVBQUUsS0FBYSxFQUFFLElBQW9CO1FBQ3BGLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsT0FBTyxDQUFBLENBQUMsQ0FBQSxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLO1lBQ2pGLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEQsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtTQUM3QyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksUUFBUSxDQUFDLE9BQWUsRUFBRSxPQUFlLEVBQUUsSUFBb0I7UUFDcEUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxPQUFPLENBQUEsQ0FBQyxDQUFBLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPO1lBQzNELE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEQsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBR0Q7Ozs7T0FJRztJQUNJLFFBQVEsQ0FBQyxhQUEyQjtRQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFFLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLDRCQUE0QixDQUFDLFVBQWtCLEVBQUUsSUFBWSxFQUFFLEVBQVU7UUFDOUUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLDZCQUE2QixFQUFDLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFFTSxlQUFlLENBQUMsVUFBa0IsRUFBRSxHQUFRO1FBQ2pELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBQyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFHTSxpQkFBaUI7UUFDdEIsbUNBQW1DO1FBQ25DLE1BQU0sUUFBUSxHQUFDO1lBQ2I7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLE9BQU87YUFDZjtZQUNEO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxPQUFPO2FBQ2Y7WUFDRDtnQkFDRSxFQUFFLEVBQUMsQ0FBQztnQkFDSixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsT0FBTzthQUNmO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFFBQVE7YUFDaEI7WUFDRDtnQkFDRSxFQUFFLEVBQUMsQ0FBQztnQkFDSixLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsUUFBUTthQUNoQjtZQUNEO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxRQUFRO2FBQ2hCO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFFBQVE7YUFDaEI7WUFDRDtnQkFDRSxFQUFFLEVBQUMsQ0FBQztnQkFDSixLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsUUFBUTthQUNoQjtZQUNEO2dCQUNFLEVBQUUsRUFBQyxFQUFFO2dCQUNMLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxZQUFZO2FBQ3BCO1NBQ0YsQ0FBQTtRQUNELE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxxQkFBcUI7UUFDMUIsbUNBQW1DO1FBQ25DLE1BQU0sVUFBVSxHQUFDO1lBQ2Y7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLEtBQUssRUFBQyxZQUFZO2FBQ25CO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLEtBQUssRUFBQyxjQUFjO2FBQ3JCO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsS0FBSyxFQUFDLG1CQUFtQjthQUMxQjtZQUNEO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBRSxRQUFRO2dCQUNmLEtBQUssRUFBQyxlQUFlO2FBQ3RCO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLHNCQUFzQjtnQkFDN0IsS0FBSyxFQUFDLGlCQUFpQjthQUN4QjtTQUNGLENBQUE7UUFDRCxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRU0sZ0JBQWdCO1FBQ3JCLE1BQU0sSUFBSSxHQUFDO1lBQ1QsRUFBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFDO1lBQ3hELEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBQztZQUN6RSxFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUM7WUFDcEQsRUFBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFDO1lBQ2xFLEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUM7U0FDMUQsQ0FBQTtRQUNELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCx5REFBeUQ7SUFFbEQsV0FBVyxDQUFDLElBQVMsRUFBRSxLQUFhO1FBQ3pDLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDaEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBR00saUJBQWlCLENBQUMsT0FBZTtRQUNyQyw2RUFBNkU7UUFDN0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxzR0FBc0c7SUFDekcsQ0FBQzs7NkdBM05VLGVBQWUsa0JBRWhCLEtBQUs7aUhBRkosZUFBZSxjQUZkLE1BQU07NEZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUdJLE1BQU07MkJBQUMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2ltYUVudmlyb25tZW50IH0gZnJvbSAnQGNpbWEvY29tbW9ucyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWdncmVnYXRpb24sIEN1bXVsLCBMYXllciwgTWFwUGFyYW1ldGVyLCBSZXBvcnQsIFN0YXRpb24sIFdhcm5pbmdBZ2dyZWdhdGlvbiB9IGZyb20gJy4uL21vZGVscy9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEdlb2dyYXBoaWNTZXJ2aWNlIH0gZnJvbSAnLi9nZW9ncmFwaGljLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVwb3J0ZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnZW52JykgcHJpdmF0ZSBlbnY6IENpbWFFbnZpcm9ubWVudCxcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBnZW9TZXJ2aWNlOiBHZW9ncmFwaGljU2VydmljZVxuICApIHt9XG5cbiAgYmJveFNldCA9IGZhbHNlXG5cblxuICBwcml2YXRlIGJhY2tlbmRfdXJsKHJlbFBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy9odHRwczovL2Fjcm93ZWIzLXBvcnRhbC1iYWNrZW5kLXRlc3QuY2ltYWZvdW5kYXRpb24ub3JnL3JlcG9ydGVyL2FwaS9cbiAgICByZXR1cm4gYGh0dHBzOi8vYWNyb3dlYjMtcG9ydGFsLWJhY2tlbmQtdGVzdC5jaW1hZm91bmRhdGlvbi5vcmcvcmVwb3J0ZXIvYXBpLyR7cmVsUGF0aH1gO1xuICAgIC8vIHJldHVybiBgaHR0cDovL2xvY2FsaG9zdDo4MDAwLyR7cmVsUGF0aH1gO1xuICAgIC8vcmV0dXJuIGAke3RoaXMuZW52LnNlcnZlci5iYXNlVXJsfS9yZXBvcnRlci8ke3JlbFBhdGh9YDtcbiAgfVxuXG4gIHByaXZhdGUgZXhlY3V0ZV9nZXQodXJsOiBzdHJpbmcsIGh0dHBQYXJhbXM6IEh0dHBQYXJhbXM9dW5kZWZpbmVkKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhY2tlbmRfdXJsKHVybCksICB7IHBhcmFtczogaHR0cFBhcmFtcyB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZXhlY3V0ZV9wb3N0KHVybDogc3RyaW5nLCBvYmplY3Q6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFja2VuZF91cmwodXJsKSwgb2JqZWN0KS5waXBlKFxuICAgICAgbWFwKFxuICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVSZXBvcnQocmVwb3J0OiBSZXBvcnQpOiBPYnNlcnZhYmxlPEJsb2I+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYWNrZW5kX3VybCgnY3JlYXRlX3JlcG9ydC8nKSwgcmVwb3J0LHtyZXNwb25zZVR5cGU6ICdibG9iJ30pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhZ2dyZWdhdGlvbnMgbGF5ZXJzXG4gICAqIEBwYXJhbSBhZ2dyZWdhdGlvblxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIGdldFdhcm5pbmcoYWdncmVnYXRpb246IEFnZ3JlZ2F0aW9uKTogT2JzZXJ2YWJsZTxMYXllcj4ge1xuICAgIHRoaXMuZ2VvU2VydmljZS5sb2NrVmlldygpO1xuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVfcG9zdCgnYWdncmVnYXRpb25fd2FybmluZy8nLCBhZ2dyZWdhdGlvbikucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHBsdXZpb3NcbiAgICogQHBhcmFtIHJlZ2lvbnM6ICBsaXN0IG9mIHJlZ2lvbnMgc2VwYXJhdGVkIGJ5IGNvbW1hXG4gICAqIEBwYXJhbSBkYXRlX3RvOiB1dGMgZGF0ZSBpbiBzZWNvbmRzXG4gICAqIEBwYXJhbSBjdW11bFxuICAgKiBAcmV0dXJucyBhcnJheSBvZiBzdGF0aW9uc1xuICAgKi9cbiAgcHVibGljIGdldFBsdXZpbyhyZWdpb25zOiBzdHJpbmcsIGRhdGVfdG86IG51bWJlciwgY3VtdWw6IG51bWJlciwgYmJveDogTC5MYXRMbmdCb3VuZHMpOiBPYnNlcnZhYmxlPFN0YXRpb25bXT4ge1xuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVfcG9zdCgnbGlzdF9wbHV2aW8vJywge3JlZ2lvbnM6IChyZWdpb25zLmxlbmd0aD4wP3JlZ2lvbnM6dW5kZWZpbmVkKSwgZGF0ZV90bzogZGF0ZV90bywgY3VtdWw6IGN1bXVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0X21pbjogYmJveC5nZXRTb3V0aCgpLCBsYXRfbWF4OiBiYm94LmdldE5vcnRoKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25fbWluOiBiYm94LmdldFdlc3QoKSwgbG9uX21heDogYmJveC5nZXRFYXN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIEh5ZHJvc1xuICAgKiBAcGFyYW0gcmVnaW9uczogbGlzdCBvZiByZWdpb25zIHNlcGFyYXRlZCBieSBjb21tYVxuICAgKiBAcGFyYW0gZGF0ZV90bzogdXRjIGRhdGUgaW4gc2Vjb25kc1xuICAgKiBAcmV0dXJucyBhcnJheSBvZiBzdGF0aW9uc1xuICAgKi9cbiAgcHVibGljIGdldEh5ZHJvKHJlZ2lvbnM6IHN0cmluZywgZGF0ZV90bzogbnVtYmVyLCBiYm94OiBMLkxhdExuZ0JvdW5kcyk6IE9ic2VydmFibGU8U3RhdGlvbltdPiB7XG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZV9wb3N0KCdsaXN0X2h5ZHJvLycse3JlZ2lvbnM6IChyZWdpb25zLmxlbmd0aD4wP3JlZ2lvbnM6dW5kZWZpbmVkKSwgZGF0ZV90bzogZGF0ZV90byxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdF9taW46IGJib3guZ2V0U291dGgoKSwgbGF0X21heDogYmJveC5nZXROb3J0aCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uX21pbjogYmJveC5nZXRXZXN0KCksIGxvbl9tYXg6IGJib3guZ2V0RWFzdCgpfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDcmVhdGUgbWFwcyBmb3IgcHJldmlvdXMgc3RhdGUsIFNSSSwgU1JJIEFkaiwgVk1JLCBIZWF2eSBSYWluIHdhcm5pbmcsIFNub3cgSHVudGVyIGFuZCBjdXJyZW50IHN0YXRlXG4gICAqIEBwYXJhbSBtYXBQYXJhbWV0ZXJzXG4gICAqIEByZXR1cm5zIExheWVyIChqc29uKVxuICAgKi9cbiAgcHVibGljIHByaW50TWFwKG1hcFBhcmFtZXRlcnM6IE1hcFBhcmFtZXRlcik6IE9ic2VydmFibGU8TGF5ZXI+IHtcbiAgICB0aGlzLmdlb1NlcnZpY2UubG9ja1ZpZXcoKTtcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlX3Bvc3QoJ3ByaW50X21hcC8nLCBtYXBQYXJhbWV0ZXJzICk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGRhdGFUeXBlSWQgLy9lbnVtP1xuICAgKiBAcGFyYW0gZnJvbVxuICAgKiBAcGFyYW0gdG9cbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBnZXRGb3JlY2FzdERhdGFzQXZhaWxhYmlsaXR5KGRhdGFUeXBlSWQ6IHN0cmluZywgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlX3Bvc3QoJ2ZvcmVjYXN0X2RhdGFfYXZhaWxhYmlsaXR5Lycse2RhdGFUeXBlSWQ6IGRhdGFUeXBlSWQsIGZyb206IGZyb20sIHRvOiB0b30pO1xuICB9XG5cbiAgcHVibGljIGdldEZvcmVjYXN0RGF0YShkYXRhVHlwZUlkOiBzdHJpbmcsIHJ1bjogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlX3Bvc3QoJ2dldF9mb3JlY2FzdF9kYXRhLycse2RhdGFUeXBlSWQ6IGRhdGFUeXBlSWQsIGRlc2NyOiBydW4uZGVzY3IsIHBhdGg6IHJ1bi5wYXRofSk7XG4gIH1cblxuXG4gIHB1YmxpYyBnZXRBdmFpbGFibGVDdW11bCgpOiBPYnNlcnZhYmxlPEN1bXVsW10+IHtcbiAgICAvL1RPRE8gTEVHR0VSRSBEQSBCQUNLRU5EIElOIEZVVFVST1xuICAgIGNvbnN0IGN1bXVsYXRhPVtcbiAgICAgIHtcbiAgICAgICAgaWQ6MSxcbiAgICAgICAgdmFsdWU6IDEsXG4gICAgICAgIGRlc2NyOiAnMSBPcmEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDoyLFxuICAgICAgICB2YWx1ZTogMyxcbiAgICAgICAgZGVzY3I6ICczIE9yZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOjMsXG4gICAgICAgIHZhbHVlOiA2LFxuICAgICAgICBkZXNjcjogJzYgT3JlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6NCxcbiAgICAgICAgdmFsdWU6IDEyLFxuICAgICAgICBkZXNjcjogJzEyIE9yZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOjUsXG4gICAgICAgIHZhbHVlOiAyNCxcbiAgICAgICAgZGVzY3I6ICcyNCBPcmUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDo2LFxuICAgICAgICB2YWx1ZTogMzYsXG4gICAgICAgIGRlc2NyOiAnMzYgT3JlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6NyxcbiAgICAgICAgdmFsdWU6IDQ4LFxuICAgICAgICBkZXNjcjogJzQ4IE9yZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOjgsXG4gICAgICAgIHZhbHVlOiA3MixcbiAgICAgICAgZGVzY3I6ICc3MiBPcmUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDoxMCxcbiAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgIGRlc2NyOiAnVGltZSBSYW5nZSdcbiAgICAgIH1cbiAgICBdXG4gICAgcmV0dXJuIG9mKGN1bXVsYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdmFpbGFibGVzV2FybkFnZ3IoKTogT2JzZXJ2YWJsZTxXYXJuaW5nQWdncmVnYXRpb25bXT4ge1xuICAgIC8vVE9ETyBMRUdHRVJFIERBIEJBQ0tFTkQgSU4gRlVUVVJPXG4gICAgY29uc3QgYWdnV2FybmluZz1bXG4gICAgICB7XG4gICAgICAgIGlkOjEsXG4gICAgICAgIGRlc2NyOiAnUmVnaW9uZScsXG4gICAgICAgIHZhbHVlOidyZWdpb25zX2l0J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6MixcbiAgICAgICAgZGVzY3I6ICdQcm92aW5jaWUnLFxuICAgICAgICB2YWx1ZTonZGlzdHJpY3RzX2l0J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6MyxcbiAgICAgICAgZGVzY3I6ICdDb211bmknLFxuICAgICAgICB2YWx1ZTonbXVuaWNpcGFsaXRpZXNfaXQnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDo0LFxuICAgICAgICBkZXNjcjogJ0JhY2luaScsXG4gICAgICAgIHZhbHVlOidjYXRjaG1lbnRzX2l0J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6NSxcbiAgICAgICAgZGVzY3I6ICdab25lIGRpIEFsbGVydGFtZW50bycsXG4gICAgICAgIHZhbHVlOid3YXJuaW5nYXJlYXNfaXQnXG4gICAgICB9LFxuICAgIF1cbiAgICByZXR1cm4gb2YoYWdnV2FybmluZyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXZhaWxhYmxlTWFwcygpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgY29uc3QgbWFwcz1bXG4gICAgICB7aWQ6IDEsIHZhbHVlOiAnUkFEQVJfRFBDX0hERjVfU1JJJywgZGVzY3JpcHRpb246ICdTUkknfSxcbiAgICAgIHtpZDogMiwgdmFsdWU6ICdSQURBUl9EUENfSERGNV9TUklBREpfVEVTVCcsIGRlc2NyaXB0aW9uOiAnU1JJIEFkanVzdGVkJ30sXG4gICAgICB7aWQ6IDMsIHZhbHVlOiAnUkFEQVJfSERGNV9WTUknLCBkZXNjcmlwdGlvbjogJ1ZNSSd9LFxuICAgICAge2lkOiA0LCB2YWx1ZTogJ1JBREFSX0RQQ19IUlcnLCBkZXNjcmlwdGlvbjogJ0hlYXZ5IFJhaW4gV2FybmluZyd9LFxuICAgICAge2lkOiA1LCB2YWx1ZTogJ1NOT1dfSFVOVEVSJywgZGVzY3JpcHRpb246ICdTbm93IEh1bnRlcid9LFxuICAgIF1cbiAgICByZXR1cm4gb2YobWFwcyk7XG4gIH1cblxuICAvL1NSSSwgU1JJIEFkanVzdGVkLCBWTUksIEhlYXZ5IFJhaW4gV2FybmluZywgU25vdyBIdW50ZXJcblxuICBwdWJsaWMgdXBsb2FkSW1hZ2UoZmlsZTogYW55LCB0aXRsZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMYXllcj4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG4gICAgZm9ybURhdGEuYXBwZW5kKCd0aXRsZScsIHRpdGxlKTtcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlX3Bvc3QoJ3VwbG9hZF9pbWcvJywgZm9ybURhdGEpO1xuICB9XG5cblxuICBwdWJsaWMgZ2V0QW5jaWxsYXJ5TGF5ZXIoaWRsYXllcjogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgLy8gaHR0cHM6Ly9kZHMuY2ltYWZvdW5kYXRpb24ub3JnL3NlbnRpbmVsL3NlbnRpbmVsYXBpL2FnZ3IvbGF5ZXIvcmVnaW9uc19pdC9cbiAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZV9nZXQoaWRsYXllcisnX2dlb21ldHJ5LycpO1xuICAgICAvL3JldHVybiB0aGlzLmh0dHAuZ2V0KCdodHRwczovL2Rkcy5jaW1hZm91bmRhdGlvbi5vcmcvc2VudGluZWwvc2VudGluZWxhcGkvYWdnci9sYXllci8nK2lkbGF5ZXIrJy8nKTtcbiAgfVxufVxuXG5cbiJdfQ==