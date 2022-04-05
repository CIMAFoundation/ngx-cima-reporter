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
                imgUrl: 'https://picsum.photos/300/200'
            }
        ];
        this.runs = ['2022/03/24 00UTC +006', '2022/03/24 00UTC +012', '2022/03/24 00UTC +018', '2022/03/24 00UTC +024', '2022/03/24 00UTC +030'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZS1kYXRhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jaW1hL3JlcG9ydGVyL3NyYy9saWIvc2VydmljZXMvZmFrZS1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLGVBQWU7SUEwRTFCO1FBeEVBLGFBQVEsR0FBQztZQUNQO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBRSxPQUFPO2FBQ2Y7WUFDRDtnQkFDRSxFQUFFLEVBQUMsQ0FBQztnQkFDSixLQUFLLEVBQUUsT0FBTzthQUNmO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLE9BQU87YUFDZjtZQUNEO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBRSxRQUFRO2FBQ2hCO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLFFBQVE7YUFDaEI7WUFDRDtnQkFDRSxFQUFFLEVBQUMsQ0FBQztnQkFDSixLQUFLLEVBQUUsUUFBUTthQUNoQjtZQUNEO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBRSxRQUFRO2FBQ2hCO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFFLFFBQVE7YUFDaEI7WUFDRDtnQkFDRSxFQUFFLEVBQUMsRUFBRTtnQkFDTCxLQUFLLEVBQUUsWUFBWTthQUNwQjtTQUNGLENBQUE7UUFFRCxlQUFVLEdBQUM7WUFDVDtnQkFDRSxFQUFFLEVBQUMsQ0FBQztnQkFDSixLQUFLLEVBQUMsU0FBUzthQUNoQjtZQUNEO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBQyxXQUFXO2FBQ2xCO1lBQ0Q7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFDLFFBQVE7YUFDZjtZQUNEO2dCQUNFLEVBQUUsRUFBQyxDQUFDO2dCQUNKLEtBQUssRUFBQyxRQUFRO2FBQ2Y7WUFDRDtnQkFDRSxFQUFFLEVBQUMsQ0FBQztnQkFDSixLQUFLLEVBQUMsY0FBYzthQUNyQjtTQUNGLENBQUE7UUFFRCxrQkFBYSxHQUFDO1lBQ1o7Z0JBQ0UsRUFBRSxFQUFDLENBQUM7Z0JBQ0osS0FBSyxFQUFDLG9CQUFvQjtnQkFDMUIsTUFBTSxFQUFFLCtCQUErQjthQUN4QztTQUNGLENBQUE7UUFFRCxTQUFJLEdBQUMsQ0FBQyx1QkFBdUIsRUFBQyx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFBO0lBRWpILENBQUM7OzRHQTFFTixlQUFlO2dIQUFmLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGYWtlRGF0YVNlcnZpY2Uge1xuXG4gIGN1bXVsYXRhPVtcbiAgICB7XG4gICAgICBpZDoxLFxuICAgICAgdmFsdWU6ICcxIE9yYSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOjIsXG4gICAgICB2YWx1ZTogJzMgT3JlJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6MyxcbiAgICAgIHZhbHVlOiAnNiBPcmUnXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDo0LFxuICAgICAgdmFsdWU6ICcxMiBPcmUnXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDo1LFxuICAgICAgdmFsdWU6ICcyNCBPcmUnXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDo2LFxuICAgICAgdmFsdWU6ICczNiBPcmUnXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDo3LFxuICAgICAgdmFsdWU6ICc0OCBPcmUnXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDo4LFxuICAgICAgdmFsdWU6ICc3MiBPcmUnXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDoxMCxcbiAgICAgIHZhbHVlOiAnVGltZSBSYW5nZSdcbiAgICB9XG4gIF1cblxuICBhZ2dXYXJuaW5nPVtcbiAgICB7XG4gICAgICBpZDoxLFxuICAgICAgdmFsdWU6J1JlZ2lvbmUnXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDoxLFxuICAgICAgdmFsdWU6J1Byb3ZpbmNpZSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOjEsXG4gICAgICB2YWx1ZTonQ29tdW5pJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6MSxcbiAgICAgIHZhbHVlOidCYWNpbmknXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDoxLFxuICAgICAgdmFsdWU6J0FsbGVydGFtZW50bydcbiAgICB9LFxuICBdXG5cbiAgdXBsb2FkZWRGaWxlcz1bXG4gICAge1xuICAgICAgaWQ6MCxcbiAgICAgIHRpdGxlOidOb21lIEZpbGUgQ2FyaWNhdG8nLFxuICAgICAgaW1nVXJsOiAnaHR0cHM6Ly9waWNzdW0ucGhvdG9zLzMwMC8yMDAnXG4gICAgfVxuICBdXG5cbiAgcnVucz1bJzIwMjIvMDMvMjQgMDBVVEMgKzAwNicsJzIwMjIvMDMvMjQgMDBVVEMgKzAxMicsICcyMDIyLzAzLzI0IDAwVVRDICswMTgnLCAnMjAyMi8wMy8yNCAwMFVUQyArMDI0JywgJzIwMjIvMDMvMjQgMDBVVEMgKzAzMCddXG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiJdfQ==