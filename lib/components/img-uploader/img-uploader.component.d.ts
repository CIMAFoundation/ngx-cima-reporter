import { OnInit } from '@angular/core';
import { FakeDataService } from "../../services/fake-data.service";
import * as i0 from "@angular/core";
export declare class ImgUploaderComponent implements OnInit {
    fakeData: FakeDataService;
    constructor(fakeData: FakeDataService);
    ngOnInit(): void;
    delFile(file: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImgUploaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImgUploaderComponent, "reporter-img-uploader", never, {}, {}, never, never>;
}
