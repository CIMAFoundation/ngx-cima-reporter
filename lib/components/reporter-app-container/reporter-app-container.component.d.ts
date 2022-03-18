import { AfterViewInit } from '@angular/core';
import { AppConfig, FaviconService, PortalService } from '@cima/commons';
import * as i0 from "@angular/core";
export declare class ReporterAppContainerComponent implements AfterViewInit {
    private config;
    private faviconService;
    private portalService;
    constructor(config: AppConfig, faviconService: FaviconService, portalService: PortalService);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReporterAppContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReporterAppContainerComponent, "reporter-app-container", never, {}, {}, never, never>;
}
