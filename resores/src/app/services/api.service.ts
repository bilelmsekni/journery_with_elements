import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from './restaurant.model';
import { Table } from './table.model';

@Injectable()
export class ApiService {
    constructor(private httpClient: HttpClient) { }

    getRestaurants(): Observable<Restaurant[]> {
        return this.httpClient.get<Restaurant[]>('api/restaurants.json');
    }

    getTables(): Observable<Table[]> {
        return this.httpClient.get<Table[]>('api/tables.json');
    }

    saveReservation(reservation: { restaurant: string, table: string }) {
        this.httpClient.post<{ restaurant: string, table: string }>('api/reservations', reservation);
    }
}
