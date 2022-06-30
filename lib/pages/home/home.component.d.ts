import { Report } from '../../models/interfaces';
import { GeographicService } from '../../services/geographic.service';
import { ReporterService } from '../../services/reporter.service';
import * as i0 from "@angular/core";
export declare class HomeComponent {
    private reporterService;
    private geoService;
    report: Report;
    loadingReport: boolean;
    constructor(reporterService: ReporterService, geoService: GeographicService);
    ngOnInit(): void;
    createReport(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HomeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HomeComponent, "cima-home", never, {}, {}, never, never>;
}
