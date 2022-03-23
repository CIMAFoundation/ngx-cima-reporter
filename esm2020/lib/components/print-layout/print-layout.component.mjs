import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class PrintLayoutComponent {
    constructor() {
        this.layoutSelected = 1;
    }
    ngOnInit() {
    }
}
PrintLayoutComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PrintLayoutComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PrintLayoutComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: PrintLayoutComponent, selector: "reporter-print-layout", ngImport: i0, template: "<h2 class=\"mb-2 mt-3 border-bottom\">Layout di Stampa</h2>\n<div class=\"d-flex\">\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 1? 'selected':''\"\n       (click)=\"layoutSelected=1\">\n    <img class=\"img-layout\" src=\"assets/reporter/img/1img.png\">\n    <span class=\"my-1\">1 Immagine</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 2? 'selected':''\"\n       (click)=\"layoutSelected=2\">\n    <img class=\"img-layout\" src=\"assets/reporter/img/2img.png\">\n    <span class=\"my-1\">2 Immagini</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 3? 'selected':''\"\n       (click)=\"layoutSelected=3\">\n    <img class=\"img-layout\" src=\"assets/reporter/img/4img.png\">\n    <span class=\"my-1\">4 Immagini</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n</div>\n\n", styles: [".layout-wrapper .img-layout{height:140px;cursor:pointer}.layout-wrapper .selection-bullet{width:10px;height:10px;border-radius:50%;background-color:#d3d3d3}.layout-wrapper.selected .selection-bullet{background-color:#007dfc}.layout-wrapper:hover .selection-bullet{outline:3px solid rgba(211,211,211,.6)}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PrintLayoutComponent, decorators: [{
            type: Component,
            args: [{ selector: 'reporter-print-layout', template: "<h2 class=\"mb-2 mt-3 border-bottom\">Layout di Stampa</h2>\n<div class=\"d-flex\">\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 1? 'selected':''\"\n       (click)=\"layoutSelected=1\">\n    <img class=\"img-layout\" src=\"assets/reporter/img/1img.png\">\n    <span class=\"my-1\">1 Immagine</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 2? 'selected':''\"\n       (click)=\"layoutSelected=2\">\n    <img class=\"img-layout\" src=\"assets/reporter/img/2img.png\">\n    <span class=\"my-1\">2 Immagini</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n  <div class=\"layout-wrapper d-flex flex-column align-items-center justify-content-center me-3\"\n       [ngClass]=\"layoutSelected == 3? 'selected':''\"\n       (click)=\"layoutSelected=3\">\n    <img class=\"img-layout\" src=\"assets/reporter/img/4img.png\">\n    <span class=\"my-1\">4 Immagini</span>\n    <div class=\"selection-bullet\"></div>\n  </div>\n\n</div>\n\n", styles: [".layout-wrapper .img-layout{height:140px;cursor:pointer}.layout-wrapper .selection-bullet{width:10px;height:10px;border-radius:50%;background-color:#d3d3d3}.layout-wrapper.selected .selection-bullet{background-color:#007dfc}.layout-wrapper:hover .selection-bullet{outline:3px solid rgba(211,211,211,.6)}\n"] }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQtbGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NpbWEvcmVwb3J0ZXIvc3JjL2xpYi9jb21wb25lbnRzL3ByaW50LWxheW91dC9wcmludC1sYXlvdXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2ltYS9yZXBvcnRlci9zcmMvbGliL2NvbXBvbmVudHMvcHJpbnQtbGF5b3V0L3ByaW50LWxheW91dC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7QUFPbEQsTUFBTSxPQUFPLG9CQUFvQjtJQUkvQjtRQUZBLG1CQUFjLEdBQUMsQ0FBQyxDQUFBO0lBRUEsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7aUhBUFUsb0JBQW9CO3FHQUFwQixvQkFBb0IsNkRDUGpDLG9xQ0E2QkE7MkZEdEJhLG9CQUFvQjtrQkFMaEMsU0FBUzsrQkFDRSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdyZXBvcnRlci1wcmludC1sYXlvdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJpbnQtbGF5b3V0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHJpbnQtbGF5b3V0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHJpbnRMYXlvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGxheW91dFNlbGVjdGVkPTFcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbn1cbiIsIjxoMiBjbGFzcz1cIm1iLTIgbXQtMyBib3JkZXItYm90dG9tXCI+TGF5b3V0IGRpIFN0YW1wYTwvaDI+XG48ZGl2IGNsYXNzPVwiZC1mbGV4XCI+XG5cbiAgPGRpdiBjbGFzcz1cImxheW91dC13cmFwcGVyIGQtZmxleCBmbGV4LWNvbHVtbiBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlciBtZS0zXCJcbiAgICAgICBbbmdDbGFzc109XCJsYXlvdXRTZWxlY3RlZCA9PSAxPyAnc2VsZWN0ZWQnOicnXCJcbiAgICAgICAoY2xpY2spPVwibGF5b3V0U2VsZWN0ZWQ9MVwiPlxuICAgIDxpbWcgY2xhc3M9XCJpbWctbGF5b3V0XCIgc3JjPVwiYXNzZXRzL3JlcG9ydGVyL2ltZy8xaW1nLnBuZ1wiPlxuICAgIDxzcGFuIGNsYXNzPVwibXktMVwiPjEgSW1tYWdpbmU8L3NwYW4+XG4gICAgPGRpdiBjbGFzcz1cInNlbGVjdGlvbi1idWxsZXRcIj48L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImxheW91dC13cmFwcGVyIGQtZmxleCBmbGV4LWNvbHVtbiBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlciBtZS0zXCJcbiAgICAgICBbbmdDbGFzc109XCJsYXlvdXRTZWxlY3RlZCA9PSAyPyAnc2VsZWN0ZWQnOicnXCJcbiAgICAgICAoY2xpY2spPVwibGF5b3V0U2VsZWN0ZWQ9MlwiPlxuICAgIDxpbWcgY2xhc3M9XCJpbWctbGF5b3V0XCIgc3JjPVwiYXNzZXRzL3JlcG9ydGVyL2ltZy8yaW1nLnBuZ1wiPlxuICAgIDxzcGFuIGNsYXNzPVwibXktMVwiPjIgSW1tYWdpbmk8L3NwYW4+XG4gICAgPGRpdiBjbGFzcz1cInNlbGVjdGlvbi1idWxsZXRcIj48L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImxheW91dC13cmFwcGVyIGQtZmxleCBmbGV4LWNvbHVtbiBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlciBtZS0zXCJcbiAgICAgICBbbmdDbGFzc109XCJsYXlvdXRTZWxlY3RlZCA9PSAzPyAnc2VsZWN0ZWQnOicnXCJcbiAgICAgICAoY2xpY2spPVwibGF5b3V0U2VsZWN0ZWQ9M1wiPlxuICAgIDxpbWcgY2xhc3M9XCJpbWctbGF5b3V0XCIgc3JjPVwiYXNzZXRzL3JlcG9ydGVyL2ltZy80aW1nLnBuZ1wiPlxuICAgIDxzcGFuIGNsYXNzPVwibXktMVwiPjQgSW1tYWdpbmk8L3NwYW4+XG4gICAgPGRpdiBjbGFzcz1cInNlbGVjdGlvbi1idWxsZXRcIj48L2Rpdj5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuXG4iXX0=