import { OnInit } from '@angular/core';
import { TextEditorComponentConfig } from "@cima/commons";
import { FakeDataService } from "../../services/fake-data.service";
import * as i0 from "@angular/core";
export declare class CurrentSituationComponent implements OnInit {
    fakeData: FakeDataService;
    sectionEnabled: boolean;
    textCurrent: string;
    config: TextEditorComponentConfig;
    constructor(fakeData: FakeDataService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrentSituationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CurrentSituationComponent, "reporter-current-situation", never, {}, {}, never, never>;
}
