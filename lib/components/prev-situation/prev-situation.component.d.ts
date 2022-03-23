import { OnInit } from '@angular/core';
import { TextEditorComponentConfig } from "@cima/commons";
import { FakeDataService } from "../../services/fake-data.service";
import * as i0 from "@angular/core";
export declare class PrevSituationComponent implements OnInit {
    fakeData: FakeDataService;
    sectionEnabled: boolean;
    pluviometriTableEnabled: boolean;
    idrometriTableEnabled: boolean;
    textPrev: string;
    config: TextEditorComponentConfig;
    rainMaps: any;
    addRainMaps(): void;
    delRainMaps(item: any): void;
    constructor(fakeData: FakeDataService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrevSituationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrevSituationComponent, "reporter-prev-situation", never, {}, {}, never, never>;
}
