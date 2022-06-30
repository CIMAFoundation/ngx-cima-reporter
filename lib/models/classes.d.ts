import { CurrentReport, ForecastReport, PreviousReport, Report } from "./interfaces";
export declare class LocalReport implements Report {
    title: string;
    txt: string;
    prevReport: PreviousReport;
    date_creation: string;
    analysisPeriod: string;
    cumulLabel: string;
    aggrLabel: string;
    currReport: CurrentReport;
    foreReport: ForecastReport;
    constructor();
}
export declare class PrintLayout {
    numberOfImages: number;
    constructor(nImgs: number);
}
