import { OnInit } from '@angular/core';
import { FakeDataService } from "../../services/fake-data.service";
import * as i0 from "@angular/core";
export declare class WarningIdroComponent implements OnInit {
    fakeData: FakeDataService;
    constructor(fakeData: FakeDataService);
    ngOnInit(): void;
    warningsIdro: any;
    addWarningIdro(): void;
    delWarningIdro(item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WarningIdroComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WarningIdroComponent, "reporter-warning-idro", never, {}, {}, never, never>;
}
