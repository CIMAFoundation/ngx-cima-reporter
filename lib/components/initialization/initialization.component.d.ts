import { EventEmitter, OnInit } from '@angular/core';
import { TextEditorComponentConfig } from "@cima/commons";
import { Report } from '../../models/interfaces';
import { GeographicService } from '../../services/geographic.service';
import * as i0 from "@angular/core";
export declare class InitializationComponent implements OnInit {
    private geoService;
    report: Report;
    reportChange: EventEmitter<Report>;
    config: TextEditorComponentConfig;
    constructor(geoService: GeographicService);
    ngOnInit(): void;
    featuresSelected(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InitializationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InitializationComponent, "reporter-initialization", never, { "report": "report"; }, { "reportChange": "reportChange"; }, never, never>;
}
