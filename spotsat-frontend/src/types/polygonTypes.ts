export interface PolygonData {
    id: number;
    name: string;
    properties: {
        [key: string]: any;
    };
    geom: {
        type: string;
        coordinates: number[][][];
    };
    centroid: {
        type: string;
        coordinates: number[];
    };
    area: number;
    userId: number;
}
