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
import { MapComponentComponent } from "./components/map-component/map-component.component";
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
    WarningIdroComponent,
    MapComponentComponent
];
export class CimaReporterModule {
}
CimaReporterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CimaReporterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CimaReporterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CimaReporterModule, declarations: [HomeComponent, ReporterAppContainerComponent,
        InitializationComponent,
        PrevSituationComponent,
        CurrentSituationComponent,
        ExpectedSituationComponent,
        PrintLayoutComponent,
        ImgUploaderComponent,
        WarningPluvioComponent,
        WarningIdroComponent,
        MapComponentComponent], imports: [CommonModule,
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
        WarningIdroComponent,
        MapComponentComponent] });
CimaReporterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CimaReporterModule, providers: [
        TimebarService,
        { provide: APP_CONFIG, useValue: REPORTER_CONFIG },
    ], imports: [[
            CommonModule,
            CimaCommonsModule,
            ReporterRoutingModule,
            FormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CimaReporterModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL3JlcG9ydGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQztBQUVySCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFpQjVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDL0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDdkcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDMUcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7O0FBekIzRixNQUFNLE1BQU0sR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRS9CLE1BQU0sV0FBVyxHQUFHO0lBQ2xCLDZCQUE2QjtJQUM3Qix1QkFBdUI7SUFDdkIsc0JBQXNCO0lBQ3RCLHlCQUF5QjtJQUN6QiwwQkFBMEI7SUFDMUIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQixzQkFBc0I7SUFDdEIsb0JBQW9CO0lBQ3BCLHFCQUFxQjtDQUN0QixDQUFDO0FBNEJGLE1BQU0sT0FBTyxrQkFBa0I7O2dIQUFsQixrQkFBa0I7aUhBQWxCLGtCQUFrQixpQkF6Q2YsYUFBYSxFQUczQiw2QkFBNkI7UUFDN0IsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0Qix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsc0JBQXNCO1FBQ3RCLG9CQUFvQjtRQUNwQixxQkFBcUIsYUFrQmYsWUFBWTtRQUNaLGlCQUFpQjtRQUNqQixxQkFBcUI7UUFDckIsV0FBVyxhQTlCakIsNkJBQTZCO1FBQzdCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixvQkFBb0I7UUFDcEIscUJBQXFCO2lIQTZCVixrQkFBa0IsYUFMbEI7UUFDVCxjQUFjO1FBQ2QsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7S0FDbkQsWUFWVTtZQUNMLFlBQVk7WUFDWixpQkFBaUI7WUFDakIscUJBQXFCO1lBQ3JCLFdBQVc7U0FDZDs0RkFPUSxrQkFBa0I7a0JBZDlCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztvQkFDakMsT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osaUJBQWlCO3dCQUNqQixxQkFBcUI7d0JBQ3JCLFdBQVc7cUJBQ2Q7b0JBQ0gsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUN0QixTQUFTLEVBQUU7d0JBQ1QsY0FBYzt3QkFDZCxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTtxQkFDbkQ7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbmltcG9ydCB7IEFQUF9DT05GSUcsIENpbWFDb21tb25zTW9kdWxlLCBUaW1lYmFyU2VydmljZSB9IGZyb20gJ0BjaW1hL2NvbW1vbnMnO1xuXG5pbXBvcnQgeyBSZXBvcnRlclJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9yZXBvcnRlci1yb3V0aW5nLm1vZHVsZVwiO1xuXG5pbXBvcnQgeyBSZXBvcnRlckFwcENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yZXBvcnRlci1hcHAtY29udGFpbmVyL3JlcG9ydGVyLWFwcC1jb250YWluZXIuY29tcG9uZW50JztcblxuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvaG9tZS5jb21wb25lbnRcIjtcblxuY29uc3QgX1BBR0VTID0gW0hvbWVDb21wb25lbnRdO1xuXG5jb25zdCBfQ09NUE9ORU5UUyA9IFtcbiAgUmVwb3J0ZXJBcHBDb250YWluZXJDb21wb25lbnQsXG4gIEluaXRpYWxpemF0aW9uQ29tcG9uZW50LFxuICBQcmV2U2l0dWF0aW9uQ29tcG9uZW50LFxuICBDdXJyZW50U2l0dWF0aW9uQ29tcG9uZW50LFxuICBFeHBlY3RlZFNpdHVhdGlvbkNvbXBvbmVudCxcbiAgUHJpbnRMYXlvdXRDb21wb25lbnQsXG4gIEltZ1VwbG9hZGVyQ29tcG9uZW50LFxuICBXYXJuaW5nUGx1dmlvQ29tcG9uZW50LFxuICBXYXJuaW5nSWRyb0NvbXBvbmVudCxcbiAgTWFwQ29tcG9uZW50Q29tcG9uZW50XG5dO1xuXG5pbXBvcnQgeyBSRVBPUlRFUl9DT05GSUcgfSBmcm9tICcuL3JlcG9ydGVyLmNvbmZpZyc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEluaXRpYWxpemF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2luaXRpYWxpemF0aW9uL2luaXRpYWxpemF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcmV2U2l0dWF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3ByZXYtc2l0dWF0aW9uL3ByZXYtc2l0dWF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDdXJyZW50U2l0dWF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2N1cnJlbnQtc2l0dWF0aW9uL2N1cnJlbnQtc2l0dWF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeHBlY3RlZFNpdHVhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9leHBlY3RlZC1zaXR1YXRpb24vZXhwZWN0ZWQtc2l0dWF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcmludExheW91dENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcmludC1sYXlvdXQvcHJpbnQtbGF5b3V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWdVcGxvYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9pbWctdXBsb2FkZXIvaW1nLXVwbG9hZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXYXJuaW5nUGx1dmlvQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dhcm5pbmctcGx1dmlvL3dhcm5pbmctcGx1dmlvLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXYXJuaW5nSWRyb0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93YXJuaW5nLWlkcm8vd2FybmluZy1pZHJvLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBDb21wb25lbnRDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL21hcC1jb21wb25lbnQvbWFwLWNvbXBvbmVudC5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbX1BBR0VTLCBfQ09NUE9ORU5UU10sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIENpbWFDb21tb25zTW9kdWxlLFxuICAgICAgICBSZXBvcnRlclJvdXRpbmdNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgZXhwb3J0czogW19DT01QT05FTlRTXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgVGltZWJhclNlcnZpY2UsXG4gICAgeyBwcm92aWRlOiBBUFBfQ09ORklHLCB1c2VWYWx1ZTogUkVQT1JURVJfQ09ORklHIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENpbWFSZXBvcnRlck1vZHVsZSB7fVxuIl19