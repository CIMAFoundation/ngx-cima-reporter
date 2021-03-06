import { EventEmitter, OnInit } from '@angular/core';
import { SnackbarService, TextEditorComponentConfig } from "@cima/commons";
import { BehaviorSubject, Subscription } from 'rxjs';
import { PrintLayout } from '../../models/classes';
import { CurrentReport } from '../../models/interfaces';
import { GeographicService } from '../../services/geographic.service';
import { ReporterService } from '../../services/reporter.service';
import * as i0 from "@angular/core";
export declare class CurrentSituationComponent implements OnInit {
    private reportService;
    private geoService;
    private snackBar;
    currentReport: CurrentReport;
    currentReportChange: EventEmitter<CurrentReport>;
    availableMaps: any[];
    sectionEnabled: boolean;
    dateFrom: any;
    dateTo: any;
    textCurrent: string;
    config: TextEditorComponentConfig;
    uploadedImageLayers: any[];
    warningIdroLayers: any[];
    warningPluvioLayers: any[];
    view: any;
    mapDisabled: BehaviorSubject<boolean>;
    viewSubscription: Subscription;
    constructor(reportService: ReporterService, geoService: GeographicService, snackBar: SnackbarService);
    enableReport(): void;
    ngOnInit(): void;
    private updateLayers;
    uploadedImageChange(event: any): void;
    warnIdroChange(event: any): void;
    warnPluvioChange(event: any): void;
    layoutChange(layout: PrintLayout): void;
    selectMaps(map: any, value: any): void;
    dateUpdate(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrentSituationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CurrentSituationComponent, "reporter-current-situation", never, { "currentReport": "currentReport"; }, { "currentReportChange": "currentReportChange"; }, never, never>;
}
