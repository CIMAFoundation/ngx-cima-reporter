import { EventEmitter, OnInit } from '@angular/core';
import { PrintLayout } from '../../models/classes';
import * as i0 from "@angular/core";
export declare class PrintLayoutComponent implements OnInit {
    selected: EventEmitter<PrintLayout>;
    layouts: PrintLayout[];
    layoutSelected: number;
    constructor();
    setLayout(idlayout: number): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrintLayoutComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrintLayoutComponent, "reporter-print-layout", never, {}, { "selected": "selected"; }, never, never>;
}
