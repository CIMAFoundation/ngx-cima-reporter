import { EventEmitter, OnInit } from '@angular/core';
import { Layer } from '../../models/interfaces';
import { ReporterService } from '../../services/reporter.service';
import * as i0 from "@angular/core";
export declare class ImgUploaderComponent implements OnInit {
    private reporterService;
    uploadedChange: EventEmitter<Layer[]>;
    uploadedFiles: any[];
    uploading: boolean;
    constructor(reporterService: ReporterService);
    ngOnInit(): void;
    delFile(file: any): void;
    private notifyChange;
    onFileChange(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImgUploaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImgUploaderComponent, "reporter-img-uploader", never, {}, { "uploadedChange": "uploadedChange"; }, never, never>;
}
