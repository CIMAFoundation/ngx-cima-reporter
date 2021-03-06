import { EventEmitter, OnInit } from '@angular/core';
import { SnackbarService, TextEditorComponentConfig } from "@cima/commons";
import { BehaviorSubject, Subscription } from 'rxjs';
import { PrintLayout } from '../../models/classes';
import { PreviousReport, Station } from '../../models/interfaces';
import { GeographicService } from '../../services/geographic.service';
import { ReporterService } from '../../services/reporter.service';
import * as i0 from "@angular/core";
export declare class PrevSituationComponent implements OnInit {
    private reporterService;
    private geoService;
    private snackBar;
    previousReport: PreviousReport;
    previousReportChange: EventEmitter<PreviousReport>;
    sectionEnabled: boolean;
    pluviometriTableEnabled: boolean;
    idrometriTableEnabled: boolean;
    textPrev: string;
    config: TextEditorComponentConfig;
    dateFrom: any;
    dateTo: any;
    cumuls: any[];
    uploadedImageLayers: any[];
    warningIdroLayers: any[];
    warningPluvioLayers: any[];
    pluvioCum: number;
    hydroStations: any[];
    pluvioStations: any[];
    private selectedFeatures;
    private view;
    rainMaps: any[];
    mapDisabled: BehaviorSubject<boolean>;
    featureSubscription: Subscription;
    viewSubscription: Subscription;
    constructor(reporterService: ReporterService, geoService: GeographicService, snackBar: SnackbarService);
    resetRainMaps(): void;
    addRainMaps(): void;
    delRainMaps(item: any): void;
    private updateLayers;
    uploadedImageChange(event: any): void;
    warnIdroChange(event: any): void;
    warnPluvioChange(event: any): void;
    selectMap(cumValue: number, map: any): void;
    selectPluvioCum(value: number): void;
    dateUpdate(): void;
    layoutChange(layout: PrintLayout): void;
    toggleStationAll(stationlist: Station[], listitem: any[], event: any): void;
    toggleStation(stationlist: Station[], listitem: any[], item: any, event: any): void;
    private loadStations;
    enableReport(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrevSituationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrevSituationComponent, "reporter-prev-situation", never, { "previousReport": "previousReport"; }, { "previousReportChange": "previousReportChange"; }, never, never>;
}
