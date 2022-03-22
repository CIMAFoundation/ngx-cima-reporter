import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FakeDataService {
    constructor() {
        this.cumulata = [
            {
                id: 1,
                value: '1 Ora'
            },
            {
                id: 2,
                value: '3 Ore'
            },
            {
                id: 3,
                value: '6 Ore'
            },
            {
                id: 4,
                value: '12 Ore'
            },
            {
                id: 5,
                value: '24 Ore'
            },
            {
                id: 6,
                value: '36 Ore'
            },
            {
                id: 7,
                value: '48 Ore'
            },
            {
                id: 8,
                value: '72 Ore'
            },
            {
                id: 10,
                value: 'Time Range'
            }
        ];
        this.aggWarning = [
            {
                id: 1,
                value: 'Regione'
            },
            {
                id: 1,
                value: 'Provincie'
            },
            {
                id: 1,
                value: 'Comuni'
            },
            {
                id: 1,
                value: 'Bacini'
            },
            {
                id: 1,
                value: 'Allertamento'
            },
        ];
        this.uploadedFiles = [
            {
                id: 0,
                title: 'Nome File Caricato',
                imgUrl: 'https://picsum.photos/200/300'
            }
        ];
    }
}
FakeDataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: FakeDataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FakeDataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: FakeDataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: FakeDataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZS1kYXRhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jaW1hL3JlcG9ydGVyL3NyYy9saWIvc2VydmljZXMvZmFrZS1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLGVBQWU7SUF3RTFCO1FBdEVBLGFBQVEsR0FBQztZQUNQO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBRSxPQUFPO2FBQ2Y7WUFDRDtnQkFDRSxFQUFFLEVBQUMsQ0FBQztnQkFDSixLQUFLLEVBQUUsT0FBTzthQUNmO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLE9BQU87YUFDZjtZQUNEO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBRSxRQUFRO2FBQ2hCO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLFFBQVE7YUFDaEI7WUFDRDtnQkFDRSxFQUFFLEVBQUMsQ0FBQztnQkFDSixLQUFLLEVBQUUsUUFBUTthQUNoQjtZQUNEO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBRSxRQUFRO2FBQ2hCO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLFFBQVE7YUFDaEI7WUFDRDtnQkFDRSxFQUFFLEVBQUMsRUFBRTtnQkFDTCxLQUFLLEVBQUUsWUFBWTthQUNwQjtTQUNGLENBQUE7UUFFRCxlQUFVLEdBQUM7WUFDVDtnQkFDRSxFQUFFLEVBQUMsQ0FBQztnQkFDSixLQUFLLEVBQUMsU0FBUzthQUNoQjtZQUNEO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBQyxXQUFXO2FBQ2xCO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFDLFFBQVE7YUFDZjtZQUNEO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBQyxRQUFRO2FBQ2Y7WUFDRDtnQkFDRSxFQUFFLEVBQUMsQ0FBQztnQkFDSixLQUFLLEVBQUMsY0FBYzthQUNyQjtTQUNGLENBQUE7UUFFRCxrQkFBYSxHQUFDO1lBQ1o7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFDLG9CQUFvQjtnQkFDMUIsTUFBTSxFQUFFLCtCQUErQjthQUN4QztTQUNGLENBQUE7SUFFZSxDQUFDOzs0R0F4RU4sZUFBZTtnSEFBZixlQUFlLGNBRmQsTUFBTTsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRmFrZURhdGFTZXJ2aWNlIHtcblxuICBjdW11bGF0YT1bXG4gICAge1xuICAgICAgaWQ6MSxcbiAgICAgIHZhbHVlOiAnMSBPcmEnXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDoyLFxuICAgICAgdmFsdWU6ICczIE9yZSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOjMsXG4gICAgICB2YWx1ZTogJzYgT3JlJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6NCxcbiAgICAgIHZhbHVlOiAnMTIgT3JlJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6NSxcbiAgICAgIHZhbHVlOiAnMjQgT3JlJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6NixcbiAgICAgIHZhbHVlOiAnMzYgT3JlJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6NyxcbiAgICAgIHZhbHVlOiAnNDggT3JlJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6OCxcbiAgICAgIHZhbHVlOiAnNzIgT3JlJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6MTAsXG4gICAgICB2YWx1ZTogJ1RpbWUgUmFuZ2UnXG4gICAgfVxuICBdXG5cbiAgYWdnV2FybmluZz1bXG4gICAge1xuICAgICAgaWQ6MSxcbiAgICAgIHZhbHVlOidSZWdpb25lJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6MSxcbiAgICAgIHZhbHVlOidQcm92aW5jaWUnXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDoxLFxuICAgICAgdmFsdWU6J0NvbXVuaSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOjEsXG4gICAgICB2YWx1ZTonQmFjaW5pJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6MSxcbiAgICAgIHZhbHVlOidBbGxlcnRhbWVudG8nXG4gICAgfSxcbiAgXVxuXG4gIHVwbG9hZGVkRmlsZXM9W1xuICAgIHtcbiAgICAgIGlkOjAsXG4gICAgICB0aXRsZTonTm9tZSBGaWxlIENhcmljYXRvJyxcbiAgICAgIGltZ1VybDogJ2h0dHBzOi8vcGljc3VtLnBob3Rvcy8yMDAvMzAwJ1xuICAgIH1cbiAgXVxuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iXX0=