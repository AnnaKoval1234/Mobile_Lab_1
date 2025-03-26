export interface MarkerData {
    id: string;
    coordinate: {
        latitude: number;
        longitude: number;
    };
    images: ImageData[];
}

export interface ImageData {
    id: string;
    uri: string;
}