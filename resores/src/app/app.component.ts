import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Restaurant } from './services/restaurant.model';
import { Observable } from 'rxjs';
import { Table } from './services/table.model';

@Component({
  selector: 'rr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Resores';
  restaurants$: Observable<Restaurant[]>;
  tables$: Observable<Table[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.restaurants$ = this.apiService.getRestaurants();
    this.tables$ = this.apiService.getTables();
  }
  onContinue(payload: { restaurant: string, table: string }): void {
    this.apiService.saveReservation(payload);
  }
}
