import { OnInit } from '@angular/core';
import { TextEditorComponentConfig } from "@cima/commons";
import { FakeDataService } from "../../services/fake-data.service";
import * as i0 from "@angular/core";
export declare class PrevSituationComponent implements OnInit {
    fakeData: FakeDataService;
    sectionEnabled: boolean;
    textPrev: string;
    config: TextEditorComponentConfig;
    rainMaps: any;
    addRainMaps(): void;
    delRainMaps(item: any): void;
    warningsPluvio: any;
    addWarningPluvio(): void;
    delWarningPluvio(item: any): void;
    warningsIdro: any;
    addWarningIdro(): void;
    delWarningIdro(item: any): void;
    delFile(file: any): void;
    constructor(fakeData: FakeDataService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrevSituationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrevSituationComponent, "reporter-prev-situation", never, {}, {}, never, never>;
}
