import { OnInit } from '@angular/core';
import { TextEditorComponentConfig } from "@cima/commons";
import { FakeDataService } from "../../services/fake-data.service";
import * as i0 from "@angular/core";
export declare class ExpectedSituationComponent implements OnInit {
    fakeData: FakeDataService;
    sectionEnabled: boolean;
    textExpected: string;
    config: TextEditorComponentConfig;
    constructor(fakeData: FakeDataService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpectedSituationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpectedSituationComponent, "reporter-expected-situation", never, {}, {}, never, never>;
}
