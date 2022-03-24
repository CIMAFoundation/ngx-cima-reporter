import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { APP_CONFIG, CimaCommonsModule, TimebarService } from '@cima/commons';
import { ReporterRoutingModule } from "./reporter-routing.module";
import { ReporterAppContainerComponent } from './components/reporter-app-container/reporter-app-container.component';
import { HomeComponent } from "./pages/home/home.component";
import { REPORTER_CONFIG } from './reporter.config';
import { FormsModule } from "@angular/forms";
import { InitializationComponent } from './components/initialization/initialization.component';
import { PrevSituationComponent } from './components/prev-situation/prev-situation.component';
import { CurrentSituationComponent } from './components/current-situation/current-situation.component';
import { ExpectedSituationComponent } from './components/expected-situation/expected-situation.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { ImgUploaderComponent } from './components/img-uploader/img-uploader.component';
import { WarningPluvioComponent } from './components/warning-pluvio/warning-pluvio.component';
import { WarningIdroComponent } from './components/warning-idro/warning-idro.component';
import * as i0 from "@angular/core";
const _PAGES = [HomeComponent];
const _COMPONENTS = [
    ReporterAppContainerComponent,
    InitializationComponent,
    PrevSituationComponent,
    CurrentSituationComponent,
    ExpectedSituationComponent,
    PrintLayoutComponent,
    ImgUploaderComponent,
    WarningPluvioComponent,
    WarningIdroComponent
];
export class CimaReporterModule {
}
CimaReporterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CimaReporterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CimaReporterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CimaReporterModule, declarations: [HomeComponent, ReporterAppContainerComponent,
        InitializationComponent,
        PrevSituationComponent,
        CurrentSituationComponent,
        ExpectedSituationComponent,
        PrintLayoutComponent,
        ImgUploaderComponent,
        WarningPluvioComponent,
        WarningIdroComponent], imports: [CommonModule,
        CimaCommonsModule,
        ReporterRoutingModule,
        FormsModule], exports: [ReporterAppContainerComponent,
        InitializationComponent,
        PrevSituationComponent,
        CurrentSituationComponent,
        ExpectedSituationComponent,
        PrintLayoutComponent,
        ImgUploaderComponent,
        WarningPluvioComponent,
        WarningIdroComponent] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL3JlcG9ydGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQztBQUVySCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFlNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMvRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM5RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQzs7QUF0QnhGLE1BQU0sTUFBTSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFL0IsTUFBTSxXQUFXLEdBQUc7SUFDbEIsNkJBQTZCO0lBQzdCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIseUJBQXlCO0lBQ3pCLDBCQUEwQjtJQUMxQixvQkFBb0I7SUFDcEIsb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUN0QixvQkFBb0I7Q0FBQyxDQUFDO0FBMkJ4QixNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBdENmLGFBQWEsRUFHM0IsNkJBQTZCO1FBQzdCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixvQkFBb0IsYUFnQmQsWUFBWTtRQUNaLGlCQUFpQjtRQUNqQixxQkFBcUI7UUFDckIsV0FBVyxhQTNCakIsNkJBQTZCO1FBQzdCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixvQkFBb0I7Z0hBMkJULGtCQUFrQixhQUxsQjtRQUNULGNBQWM7UUFDZCxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTtLQUNuRCxZQVZVO1lBQ0wsWUFBWTtZQUNaLGlCQUFpQjtZQUNqQixxQkFBcUI7WUFDckIsV0FBVztTQUNkOzJGQU9RLGtCQUFrQjtrQkFkOUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDO29CQUNqQyxPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixpQkFBaUI7d0JBQ2pCLHFCQUFxQjt3QkFDckIsV0FBVztxQkFDZDtvQkFDSCxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQ3RCLFNBQVMsRUFBRTt3QkFDVCxjQUFjO3dCQUNkLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFO3FCQUNuRDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuaW1wb3J0IHsgQVBQX0NPTkZJRywgQ2ltYUNvbW1vbnNNb2R1bGUsIFRpbWViYXJTZXJ2aWNlIH0gZnJvbSAnQGNpbWEvY29tbW9ucyc7XHJcblxyXG5pbXBvcnQgeyBSZXBvcnRlclJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9yZXBvcnRlci1yb3V0aW5nLm1vZHVsZVwiO1xyXG5cclxuaW1wb3J0IHsgUmVwb3J0ZXJBcHBDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVwb3J0ZXItYXBwLWNvbnRhaW5lci9yZXBvcnRlci1hcHAtY29udGFpbmVyLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9ob21lLmNvbXBvbmVudFwiO1xyXG5cclxuY29uc3QgX1BBR0VTID0gW0hvbWVDb21wb25lbnRdO1xyXG5cclxuY29uc3QgX0NPTVBPTkVOVFMgPSBbXHJcbiAgUmVwb3J0ZXJBcHBDb250YWluZXJDb21wb25lbnQsXHJcbiAgSW5pdGlhbGl6YXRpb25Db21wb25lbnQsXHJcbiAgUHJldlNpdHVhdGlvbkNvbXBvbmVudCxcclxuICBDdXJyZW50U2l0dWF0aW9uQ29tcG9uZW50LFxyXG4gIEV4cGVjdGVkU2l0dWF0aW9uQ29tcG9uZW50LFxyXG4gIFByaW50TGF5b3V0Q29tcG9uZW50LFxyXG4gIEltZ1VwbG9hZGVyQ29tcG9uZW50LFxyXG4gIFdhcm5pbmdQbHV2aW9Db21wb25lbnQsXHJcbiAgV2FybmluZ0lkcm9Db21wb25lbnRdO1xyXG5cclxuaW1wb3J0IHsgUkVQT1JURVJfQ09ORklHIH0gZnJvbSAnLi9yZXBvcnRlci5jb25maWcnO1xyXG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgSW5pdGlhbGl6YXRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaW5pdGlhbGl6YXRpb24vaW5pdGlhbGl6YXRpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgUHJldlNpdHVhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcmV2LXNpdHVhdGlvbi9wcmV2LXNpdHVhdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDdXJyZW50U2l0dWF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2N1cnJlbnQtc2l0dWF0aW9uL2N1cnJlbnQtc2l0dWF0aW9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEV4cGVjdGVkU2l0dWF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2V4cGVjdGVkLXNpdHVhdGlvbi9leHBlY3RlZC1zaXR1YXRpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgUHJpbnRMYXlvdXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJpbnQtbGF5b3V0L3ByaW50LWxheW91dC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJbWdVcGxvYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9pbWctdXBsb2FkZXIvaW1nLXVwbG9hZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFdhcm5pbmdQbHV2aW9Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2FybmluZy1wbHV2aW8vd2FybmluZy1wbHV2aW8uY29tcG9uZW50JztcclxuaW1wb3J0IHsgV2FybmluZ0lkcm9Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2FybmluZy1pZHJvL3dhcm5pbmctaWRyby5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtfUEFHRVMsIF9DT01QT05FTlRTXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgQ2ltYUNvbW1vbnNNb2R1bGUsXHJcbiAgICAgICAgUmVwb3J0ZXJSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlXHJcbiAgICBdLFxyXG4gIGV4cG9ydHM6IFtfQ09NUE9ORU5UU10sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBUaW1lYmFyU2VydmljZSxcclxuICAgIHsgcHJvdmlkZTogQVBQX0NPTkZJRywgdXNlVmFsdWU6IFJFUE9SVEVSX0NPTkZJRyB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaW1hUmVwb3J0ZXJNb2R1bGUge31cclxuIl19