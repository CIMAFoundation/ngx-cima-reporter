import { Component, Inject } from '@angular/core';
import { APP_CONFIG } from '@cima/commons';
import * as i0 from "@angular/core";
import * as i1 from "@cima/commons";
import * as i2 from "@angular/material/button";
export class ReporterAppContainerComponent {
    constructor(config, faviconService, portalService) {
        this.config = config;
        this.faviconService = faviconService;
        this.portalService = portalService;
    }
    ngAfterViewInit() {
        this.faviconService.setAppFavicon(this.config.name);
        this.portalService.setTitle(this.config.description);
    }
}
ReporterAppContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterAppContainerComponent, deps: [{ token: APP_CONFIG }, { token: i1.FaviconService }, { token: i1.PortalService }], target: i0.ɵɵFactoryTarget.Component });
ReporterAppContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ReporterAppContainerComponent, selector: "reporter-app-container", ngImport: i0, template: "<cima-app-container mode=\"side\" [sidenavOpened]=\"false\"> <!--TODO ELIMINARE SIDENAV - ORA E' NASCOSTA-->\n<!--  <ng-container app-menu>\n    <a [routerLink]=\"['/', 'reporter']\">Home</a>\n  </ng-container>-->\n\n  <ng-container app-buttons>\n    <button mat-flat-button color=\"\" class=\"bg-warning\"><span class=\"fas fa-redo-alt me-2\"></span>Reset Report</button>\n    <button mat-flat-button color=\"primary\" class=\"bg-success\"><span class=\"fas fa-paper-plane me-2\"></span>Genera Report</button>\n  </ng-container>\n\n<!--  <app-sidenav-tab icon=\"list\" i18-label label=\"Tab Label\">\n    Contenuto Sidebar\n  </app-sidenav-tab>-->\n\n</cima-app-container>\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}:host{flex:1}:host ::ng-deep .mat-toolbar{border-bottom:solid 1px var(--border-color, #edeae9)}:host ::ng-deep .app-content{background-color:#fff!important;color:#1c1c1c!important}:host ::ng-deep .mat-tab-group.app-sidenav-tabber{background:white!important}:host ::ng-deep .mat-drawer-side.mat-drawer-end{border-color:var(--border-color, #edeae9)!important;box-shadow:5px 5px 15px 5px #0000001a}:host ::ng-deep .h-divider{border:0;border-bottom:1px solid var(--border-color, #edeae9);margin:5px 0}:host ::ng-deep .table{width:100%;margin-bottom:1rem;background-color:transparent;border-collapse:collapse}:host ::ng-deep .table td,:host ::ng-deep .table th{text-align:left;padding:.75rem;vertical-align:top;border-top:1px solid #dee2e6}:host ::ng-deep .table-striped tbody tr:nth-of-type(odd){background-color:#0000000d}\n"], components: [{ type: i1.AppContainerComponent, selector: "cima-app-container", inputs: ["mode", "hasBackdrop", "sidenavOpened", "sidenavWidth", "sidenavMinWidth"] }, { type: i2.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ReporterAppContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-app-container', template: "<cima-app-container mode=\"side\" [sidenavOpened]=\"false\"> <!--TODO ELIMINARE SIDENAV - ORA E' NASCOSTA-->\n<!--  <ng-container app-menu>\n    <a [routerLink]=\"['/', 'reporter']\">Home</a>\n  </ng-container>-->\n\n  <ng-container app-buttons>\n    <button mat-flat-button color=\"\" class=\"bg-warning\"><span class=\"fas fa-redo-alt me-2\"></span>Reset Report</button>\n    <button mat-flat-button color=\"primary\" class=\"bg-success\"><span class=\"fas fa-paper-plane me-2\"></span>Genera Report</button>\n  </ng-container>\n\n<!--  <app-sidenav-tab icon=\"list\" i18-label label=\"Tab Label\">\n    Contenuto Sidebar\n  </app-sidenav-tab>-->\n\n</cima-app-container>\n", styles: [":root{--bg-light-color: $bg-light-color;--bg-light-dark-color: $bg-light-dark-color;--bg-active-color: $bg-active-color;--border-color: $border-color}:host{flex:1}:host ::ng-deep .mat-toolbar{border-bottom:solid 1px var(--border-color, #edeae9)}:host ::ng-deep .app-content{background-color:#fff!important;color:#1c1c1c!important}:host ::ng-deep .mat-tab-group.app-sidenav-tabber{background:white!important}:host ::ng-deep .mat-drawer-side.mat-drawer-end{border-color:var(--border-color, #edeae9)!important;box-shadow:5px 5px 15px 5px #0000001a}:host ::ng-deep .h-divider{border:0;border-bottom:1px solid var(--border-color, #edeae9);margin:5px 0}:host ::ng-deep .table{width:100%;margin-bottom:1rem;background-color:transparent;border-collapse:collapse}:host ::ng-deep .table td,:host ::ng-deep .table th{text-align:left;padding:.75rem;vertical-align:top;border-top:1px solid #dee2e6}:host ::ng-deep .table-striped tbody tr:nth-of-type(odd){background-color:#0000000d}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_CONFIG]
                }] }, { type: i1.FaviconService }, { type: i1.PortalService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXItYXBwLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jaW1hL3JlcG9ydGVyL3NyYy9saWIvY29tcG9uZW50cy9yZXBvcnRlci1hcHAtY29udGFpbmVyL3JlcG9ydGVyLWFwcC1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL2NvbXBvbmVudHMvcmVwb3J0ZXItYXBwLWNvbnRhaW5lci9yZXBvcnRlci1hcHAtY29udGFpbmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRSxPQUFPLEVBQWEsVUFBVSxFQUFpQyxNQUFNLGVBQWUsQ0FBQzs7OztBQVFyRixNQUFNLE9BQU8sNkJBQTZCO0lBQ3hDLFlBQzhCLE1BQWlCLEVBQ3JDLGNBQThCLEVBQzlCLGFBQTRCO1FBRlIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNyQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDbkMsQ0FBQztJQUVKLGVBQWU7UUFDYixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7MkhBVlUsNkJBQTZCLGtCQUU5QixVQUFVOytHQUZULDZCQUE2Qiw4RENWMUMscXFCQWVBOzRGRExhLDZCQUE2QjtrQkFMekMsU0FBUzsrQkFDRSx3QkFBd0I7OzBCQU0vQixNQUFNOzJCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBcHBDb25maWcsIEFQUF9DT05GSUcsIEZhdmljb25TZXJ2aWNlLCBQb3J0YWxTZXJ2aWNlIH0gZnJvbSAnQGNpbWEvY29tbW9ucyc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncmVwb3J0ZXItYXBwLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZXBvcnRlci1hcHAtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVwb3J0ZXItYXBwLWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBSZXBvcnRlckFwcENvbnRhaW5lckNvbXBvbmVudCAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0e1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEFQUF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBBcHBDb25maWcsXG4gICAgcHJpdmF0ZSBmYXZpY29uU2VydmljZTogRmF2aWNvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwb3J0YWxTZXJ2aWNlOiBQb3J0YWxTZXJ2aWNlXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5mYXZpY29uU2VydmljZS5zZXRBcHBGYXZpY29uKHRoaXMuY29uZmlnLm5hbWUpO1xuICAgIHRoaXMucG9ydGFsU2VydmljZS5zZXRUaXRsZSh0aGlzLmNvbmZpZy5kZXNjcmlwdGlvbik7XG4gIH1cbn1cbiIsIjxjaW1hLWFwcC1jb250YWluZXIgbW9kZT1cInNpZGVcIiBbc2lkZW5hdk9wZW5lZF09XCJmYWxzZVwiPiA8IS0tVE9ETyBFTElNSU5BUkUgU0lERU5BViAtIE9SQSBFJyBOQVNDT1NUQS0tPlxuPCEtLSAgPG5nLWNvbnRhaW5lciBhcHAtbWVudT5cbiAgICA8YSBbcm91dGVyTGlua109XCJbJy8nLCAncmVwb3J0ZXInXVwiPkhvbWU8L2E+XG4gIDwvbmctY29udGFpbmVyPi0tPlxuXG4gIDxuZy1jb250YWluZXIgYXBwLWJ1dHRvbnM+XG4gICAgPGJ1dHRvbiBtYXQtZmxhdC1idXR0b24gY29sb3I9XCJcIiBjbGFzcz1cImJnLXdhcm5pbmdcIj48c3BhbiBjbGFzcz1cImZhcyBmYS1yZWRvLWFsdCBtZS0yXCI+PC9zcGFuPlJlc2V0IFJlcG9ydDwvYnV0dG9uPlxuICAgIDxidXR0b24gbWF0LWZsYXQtYnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIGNsYXNzPVwiYmctc3VjY2Vzc1wiPjxzcGFuIGNsYXNzPVwiZmFzIGZhLXBhcGVyLXBsYW5lIG1lLTJcIj48L3NwYW4+R2VuZXJhIFJlcG9ydDwvYnV0dG9uPlxuICA8L25nLWNvbnRhaW5lcj5cblxuPCEtLSAgPGFwcC1zaWRlbmF2LXRhYiBpY29uPVwibGlzdFwiIGkxOC1sYWJlbCBsYWJlbD1cIlRhYiBMYWJlbFwiPlxuICAgIENvbnRlbnV0byBTaWRlYmFyXG4gIDwvYXBwLXNpZGVuYXYtdGFiPi0tPlxuXG48L2NpbWEtYXBwLWNvbnRhaW5lcj5cbiJdfQ==