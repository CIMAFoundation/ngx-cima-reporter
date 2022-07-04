export interface Station {
    stationname: string;
    munic: string;
    district: string;
    region: string;
    value: number;
    mu: string;
    threshold?: string;
}
export interface Layer {
    name: string;
    fromUTCSecond?: number;
    toUTCSecond?: number;
    mapurl: string;
    palette_img_url?: string;
    cumul?: any;
    hasCumul?: boolean;
    isUploaded?: boolean;
    isForecast?: boolean;
    run_selected?: any;
}
export interface MiddleReport {
    fromUTCSecond: number;
    toUTCSecond: number;
    text: string;
    title: string;
    nImgs: number;
    raings_title: string;
    hydros_title: string;
}
export interface CurrentReport extends MiddleReport {
    layers: Layer[];
}
export interface ForecastReport extends MiddleReport {
    layers: Layer[];
}
export interface PreviousReport extends MiddleReport {
    layers: Layer[];
    raings: Station[];
    hydros: Station[];
    raings_cumul: string;
}
export interface Report {
    title: string;
    txt: string;
    prevReport: PreviousReport;
    date_creation: string;
    analysisPeriod: string;
    cumulLabel: string;
    aggrLabel: string;
    currReport: CurrentReport;
    foreReport: ForecastReport;
}
export interface Aggregation {
    aggregation: string;
    type: string;
    date_to: number;
    lat_min: number;
    lat_max: number;
    lon_min: number;
    lon_max: number;
}
export interface MapParameter {
    layer: string;
    from: number;
    to: number;
    description: string;
    cumul: number;
    lat_min: number;
    lat_max: number;
    lon_min: number;
    lon_max: number;
}
export interface Cumul {
    descr: string;
    value: number;
}
export interface WarningAggregation {
    id?: number;
    descr: string;
    value: string;
}
export interface GeoView {
    lon: number;
    lat: number;
    zoom: number;
    bbox: L.LatLngBounds;
}
