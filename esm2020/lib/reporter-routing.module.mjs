import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_CONFIG } from '@cima/commons';
import { REPORTER_CONFIG } from './reporter.config';
import { ReporterAppContainerComponent } from './components/reporter-app-container/reporter-app-container.component';
import { HomeComponent } from './pages/home/home.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    { path: '', redirectTo: 'home' },
    {
        path: '',
        component: ReporterAppContainerComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
        ],
    },
];
export class ReporterRoutingModule {
}
ReporterRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ReporterRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReporterRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ReporterRoutingModule, imports: [i1.RouterModule], exports: [RouterModule] });
ReporterRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ReporterRoutingModule, providers: [{ provide: APP_CONFIG, useValue: REPORTER_CONFIG }], imports: [[RouterModule.forChild(routes)], RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: ReporterRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule],
                    providers: [{ provide: APP_CONFIG, useValue: REPORTER_CONFIG }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXItcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jaW1hL3JlcG9ydGVyL3NyYy9saWIvcmVwb3J0ZXItcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFcEQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFFckgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFFNUQsTUFBTSxNQUFNLEdBQVc7SUFDckIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7SUFDaEM7UUFDRSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSw2QkFBNkI7UUFDeEMsUUFBUSxFQUFFO1lBQ1I7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osU0FBUyxFQUFFLGFBQWE7YUFDekI7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQU9GLE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQix3Q0FIdEIsWUFBWTttSEFHWCxxQkFBcUIsYUFGckIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDLFlBRnRELENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUM5QixZQUFZOzJGQUdYLHFCQUFxQjtrQkFMakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLENBQUM7aUJBQ2hFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgQVBQX0NPTkZJRyB9IGZyb20gJ0BjaW1hL2NvbW1vbnMnO1xyXG5cclxuaW1wb3J0IHsgUkVQT1JURVJfQ09ORklHIH0gZnJvbSAnLi9yZXBvcnRlci5jb25maWcnO1xyXG5cclxuaW1wb3J0IHsgUmVwb3J0ZXJBcHBDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVwb3J0ZXItYXBwLWNvbnRhaW5lci9yZXBvcnRlci1hcHAtY29udGFpbmVyLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy9ob21lL2hvbWUuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHsgcGF0aDogJycsIHJlZGlyZWN0VG86ICdob21lJyB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBSZXBvcnRlckFwcENvbnRhaW5lckNvbXBvbmVudCxcclxuICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBwYXRoOiAnaG9tZScsXHJcbiAgICAgICAgY29tcG9uZW50OiBIb21lQ29tcG9uZW50LFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxyXG4gIGV4cG9ydHM6IFtSb3V0ZXJNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQVBQX0NPTkZJRywgdXNlVmFsdWU6IFJFUE9SVEVSX0NPTkZJRyB9XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFJlcG9ydGVyUm91dGluZ01vZHVsZSB7fVxyXG4iXX0=