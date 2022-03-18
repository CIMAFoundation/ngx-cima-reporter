import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { APP_CONFIG, CimaCommonsModule, TimebarService } from '@cima/commons';
import { ReporterRoutingModule } from "./reporter-routing.module";
import { ReporterAppContainerComponent } from './components/reporter-app-container/reporter-app-container.component';
import { HomeComponent } from "./pages/home/home.component";
import { REPORTER_CONFIG } from './reporter.config';
import { FormsModule } from "@angular/forms";
import * as i0 from "@angular/core";
const _PAGES = [HomeComponent];
const _COMPONENTS = [ReporterAppContainerComponent];
export class CimaReporterModule {
}
CimaReporterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CimaReporterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CimaReporterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CimaReporterModule, declarations: [HomeComponent, ReporterAppContainerComponent], imports: [CommonModule,
        CimaCommonsModule,
        ReporterRoutingModule,
        FormsModule], exports: [ReporterAppContainerComponent] });
CimaReporterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CimaReporterModule, providers: [
        TimebarService,
        { provide: APP_CONFIG, useValue: REPORTER_CONFIG },
    ], imports: [[
            CommonModule,
            CimaCommonsModule,
            ReporterRoutingModule,
            FormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CimaReporterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [_PAGES, _COMPONENTS],
                    imports: [
                        CommonModule,
                        CimaCommonsModule,
                        ReporterRoutingModule,
                        FormsModule
                    ],
                    exports: [_COMPONENTS],
                    providers: [
                        TimebarService,
                        { provide: APP_CONFIG, useValue: REPORTER_CONFIG },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL3JlcG9ydGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQztBQUVySCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFNNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFMM0MsTUFBTSxNQUFNLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUUvQixNQUFNLFdBQVcsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFtQnBELE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFyQmYsYUFBYSxFQUVSLDZCQUE2QixhQVExQyxZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLHFCQUFxQjtRQUNyQixXQUFXLGFBWEUsNkJBQTZCO2dIQW1CckMsa0JBQWtCLGFBTGxCO1FBQ1QsY0FBYztRQUNkLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFO0tBQ25ELFlBVlU7WUFDTCxZQUFZO1lBQ1osaUJBQWlCO1lBQ2pCLHFCQUFxQjtZQUNyQixXQUFXO1NBQ2Q7MkZBT1Esa0JBQWtCO2tCQWQ5QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUM7b0JBQ2pDLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGlCQUFpQjt3QkFDakIscUJBQXFCO3dCQUNyQixXQUFXO3FCQUNkO29CQUNILE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztvQkFDdEIsU0FBUyxFQUFFO3dCQUNULGNBQWM7d0JBQ2QsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7cUJBQ25EO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5pbXBvcnQgeyBBUFBfQ09ORklHLCBDaW1hQ29tbW9uc01vZHVsZSwgVGltZWJhclNlcnZpY2UgfSBmcm9tICdAY2ltYS9jb21tb25zJztcclxuXHJcbmltcG9ydCB7IFJlcG9ydGVyUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL3JlcG9ydGVyLXJvdXRpbmcubW9kdWxlXCI7XHJcblxyXG5pbXBvcnQgeyBSZXBvcnRlckFwcENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yZXBvcnRlci1hcHAtY29udGFpbmVyL3JlcG9ydGVyLWFwcC1jb250YWluZXIuY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL2hvbWUuY29tcG9uZW50XCI7XHJcblxyXG5jb25zdCBfUEFHRVMgPSBbSG9tZUNvbXBvbmVudF07XHJcblxyXG5jb25zdCBfQ09NUE9ORU5UUyA9IFtSZXBvcnRlckFwcENvbnRhaW5lckNvbXBvbmVudF07XHJcblxyXG5pbXBvcnQgeyBSRVBPUlRFUl9DT05GSUcgfSBmcm9tICcuL3JlcG9ydGVyLmNvbmZpZyc7XHJcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtfUEFHRVMsIF9DT01QT05FTlRTXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgQ2ltYUNvbW1vbnNNb2R1bGUsXHJcbiAgICAgICAgUmVwb3J0ZXJSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlXHJcbiAgICBdLFxyXG4gIGV4cG9ydHM6IFtfQ09NUE9ORU5UU10sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBUaW1lYmFyU2VydmljZSxcclxuICAgIHsgcHJvdmlkZTogQVBQX0NPTkZJRywgdXNlVmFsdWU6IFJFUE9SVEVSX0NPTkZJRyB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaW1hUmVwb3J0ZXJNb2R1bGUge31cclxuIl19