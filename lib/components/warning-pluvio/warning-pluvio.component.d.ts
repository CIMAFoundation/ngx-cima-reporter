import { OnInit } from '@angular/core';
import { FakeDataService } from "../../services/fake-data.service";
import * as i0 from "@angular/core";
export declare class WarningPluvioComponent implements OnInit {
    fakeData: FakeDataService;
    constructor(fakeData: FakeDataService);
    ngOnInit(): void;
    warningsPluvio: any;
    addWarningPluvio(): void;
    delWarningPluvio(item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WarningPluvioComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WarningPluvioComponent, "reporter-warning-pluvio", never, {}, {}, never, never>;
}
