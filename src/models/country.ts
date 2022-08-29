export interface Country {
    latlng: [number, number];
    capital: string[];
    altSpellings: string[];
    capitalInfo: { latlng: [number, number] };
    flags:{png: string, svg: string};
    languages:{};
    region:string;
    continents: string[];
    maps:{googleMaps: string, openStreetMap: string};
}