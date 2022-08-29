import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from 'src/models/country';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class countrieService {
    constructor(private httpClient: HttpClient) { }

    public getCountries(): Observable<Country[]> {
        return this.httpClient.get<Country[]>(`${environment.api}/all`)
    }

    public getCountriesCoords(): Observable<any> {
        return this.getCountries().pipe(
            map(proxyToCoords)
        )
    }
}

const proxyToCoords = (countries: Country[]) => {
    return countries.map(country => ({ ...country, capitalInfo: { latlng: convertCoordToPercent(country.capitalInfo.latlng) } }))
}

const convertCoordToPercent = (coord?: [number, number]): [number, number] => {
    if (!coord) return [-180, -90];
    const maxLat = 90;
    const maxLong = 180;
    const newLat = transformToAbsolute(coord[0], maxLat);
    const newPercentLat = transformToPercent(newLat, maxLat * 2);
    const newLong = transformToAbsolute(coord[1], maxLong);
    const newPercentLong = transformToPercent(newLong, maxLong * 2)
    return [newPercentLat, newPercentLong];
}

const transformToAbsolute = (value: number, addition: number): number => {
    return value + addition;
}

const transformToPercent = (value: number, max: number): number => {
    return (value / max * 100);
}
