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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL3JlcG9ydGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQztBQUVySCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFlNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMvRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM5RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQzs7QUF0QnhGLE1BQU0sTUFBTSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFL0IsTUFBTSxXQUFXLEdBQUc7SUFDbEIsNkJBQTZCO0lBQzdCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIseUJBQXlCO0lBQ3pCLDBCQUEwQjtJQUMxQixvQkFBb0I7SUFDcEIsb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUN0QixvQkFBb0I7Q0FBQyxDQUFDO0FBMkJ4QixNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBdENmLGFBQWEsRUFHM0IsNkJBQTZCO1FBQzdCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixvQkFBb0IsYUFnQmQsWUFBWTtRQUNaLGlCQUFpQjtRQUNqQixxQkFBcUI7UUFDckIsV0FBVyxhQTNCakIsNkJBQTZCO1FBQzdCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixvQkFBb0I7Z0hBMkJULGtCQUFrQixhQUxsQjtRQUNULGNBQWM7UUFDZCxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTtLQUNuRCxZQVZVO1lBQ0wsWUFBWTtZQUNaLGlCQUFpQjtZQUNqQixxQkFBcUI7WUFDckIsV0FBVztTQUNkOzJGQU9RLGtCQUFrQjtrQkFkOUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDO29CQUNqQyxPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixpQkFBaUI7d0JBQ2pCLHFCQUFxQjt3QkFDckIsV0FBVztxQkFDZDtvQkFDSCxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQ3RCLFNBQVMsRUFBRTt3QkFDVCxjQUFjO3dCQUNkLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFO3FCQUNuRDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgQVBQX0NPTkZJRywgQ2ltYUNvbW1vbnNNb2R1bGUsIFRpbWViYXJTZXJ2aWNlIH0gZnJvbSAnQGNpbWEvY29tbW9ucyc7XG5cbmltcG9ydCB7IFJlcG9ydGVyUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL3JlcG9ydGVyLXJvdXRpbmcubW9kdWxlXCI7XG5cbmltcG9ydCB7IFJlcG9ydGVyQXBwQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3JlcG9ydGVyLWFwcC1jb250YWluZXIvcmVwb3J0ZXItYXBwLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9ob21lLmNvbXBvbmVudFwiO1xuXG5jb25zdCBfUEFHRVMgPSBbSG9tZUNvbXBvbmVudF07XG5cbmNvbnN0IF9DT01QT05FTlRTID0gW1xuICBSZXBvcnRlckFwcENvbnRhaW5lckNvbXBvbmVudCxcbiAgSW5pdGlhbGl6YXRpb25Db21wb25lbnQsXG4gIFByZXZTaXR1YXRpb25Db21wb25lbnQsXG4gIEN1cnJlbnRTaXR1YXRpb25Db21wb25lbnQsXG4gIEV4cGVjdGVkU2l0dWF0aW9uQ29tcG9uZW50LFxuICBQcmludExheW91dENvbXBvbmVudCxcbiAgSW1nVXBsb2FkZXJDb21wb25lbnQsXG4gIFdhcm5pbmdQbHV2aW9Db21wb25lbnQsXG4gIFdhcm5pbmdJZHJvQ29tcG9uZW50XTtcblxuaW1wb3J0IHsgUkVQT1JURVJfQ09ORklHIH0gZnJvbSAnLi9yZXBvcnRlci5jb25maWcnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBJbml0aWFsaXphdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9pbml0aWFsaXphdGlvbi9pbml0aWFsaXphdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJldlNpdHVhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcmV2LXNpdHVhdGlvbi9wcmV2LXNpdHVhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VycmVudFNpdHVhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jdXJyZW50LXNpdHVhdGlvbi9jdXJyZW50LXNpdHVhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhwZWN0ZWRTaXR1YXRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZXhwZWN0ZWQtc2l0dWF0aW9uL2V4cGVjdGVkLXNpdHVhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJpbnRMYXlvdXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJpbnQtbGF5b3V0L3ByaW50LWxheW91dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1nVXBsb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaW1nLXVwbG9hZGVyL2ltZy11cGxvYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2FybmluZ1BsdXZpb0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93YXJuaW5nLXBsdXZpby93YXJuaW5nLXBsdXZpby5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2FybmluZ0lkcm9Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd2FybmluZy1pZHJvL3dhcm5pbmctaWRyby5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtfUEFHRVMsIF9DT01QT05FTlRTXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQ2ltYUNvbW1vbnNNb2R1bGUsXG4gICAgICAgIFJlcG9ydGVyUm91dGluZ01vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGVcbiAgICBdLFxuICBleHBvcnRzOiBbX0NPTVBPTkVOVFNdLFxuICBwcm92aWRlcnM6IFtcbiAgICBUaW1lYmFyU2VydmljZSxcbiAgICB7IHByb3ZpZGU6IEFQUF9DT05GSUcsIHVzZVZhbHVlOiBSRVBPUlRFUl9DT05GSUcgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2ltYVJlcG9ydGVyTW9kdWxlIHt9XG4iXX0=