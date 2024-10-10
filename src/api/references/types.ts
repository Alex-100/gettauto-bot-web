
export interface Model{
    [key: string]: string;
}


export interface GeoPoint{
    id: number;
    region: string;
    pointName: string;
    pointLat: number;
    pointLon: number;
}