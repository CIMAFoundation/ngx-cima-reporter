import { OnInit } from '@angular/core';
import { TextEditorComponentConfig } from "@cima/commons";
import { FakeDataService } from "../../services/fake-data.service";
import * as i0 from "@angular/core";
export declare class ExpectedSituationComponent implements OnInit {
    fakeData: FakeDataService;
    sectionEnabled: boolean;
    textExpected: string;
    config: TextEditorComponentConfig;
    runsPrec: any;
    addRunPrec(): void;
    delRunPrec(item: any): void;
    runsSnow: any;
    addRunSnow(): void;
    delRunSnow(item: any): void;
    runsGeoPot: any;
    addRunGeoPot(): void;
    delRunGeoPot(item: any): void;
    constructor(fakeData: FakeDataService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpectedSituationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpectedSituationComponent, "reporter-expected-situation", never, {}, {}, never, never>;
}
