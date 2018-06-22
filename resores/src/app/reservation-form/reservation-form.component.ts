import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Restaurant } from '../services/restaurant.model';
import { Table } from '../services/table.model';
import { ApiService } from '../services/api.service';
import { map } from 'rxjs/operators';
import { forbiddenValue } from '../services/forbidden-value.validator';
import { environment } from '../../environments/environment';

@Component({
  selector: 'rr-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationFormComponent implements OnInit {

  // used to display tables of 6 or more persons or not
  private areBigTablesAvailable = true;

  // send leads to partner using this provider code
  private providerCode = 'resores';

  // list of restaurants
  restaurants$: Observable<Restaurant[]>;

  // list of tables
  tables$: Observable<Table[]>;

  reservationForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.restaurants$ = this.apiService.getRestaurants();
    this.tables$ = this.apiService.getTables().pipe(
      map(tables => this.areBigTablesAvailable ? tables : tables.filter(t => t.value !== '6+'))
    );

    this.reservationForm = this.fb.group({
      restaurant: ['-1', [Validators.required, forbiddenValue('-1')]],
      table: ['-1', [Validators.required, forbiddenValue('-1')]]
    });
  }

  onContinue(): void {
    if (this.reservationForm.valid) {
      if (this.isPartnerRestaurantRequested(this.reservationForm.value.restaurant)) {
        this.redirectToPartner();
      } else {
        this.apiService.saveReservation(this.reservationForm.value);
      }
    } else {
      // to display error messages
      Object.values(this.reservationForm.controls).forEach(ctrl => ctrl.markAsDirty());
    }
  }

  get tableError(): string {
    if (this.reservationForm.controls.table.invalid && this.reservationForm.controls.table.dirty) {
      return 'Please choose your table';
    }
  }

  get restaurantError(): string {
    if (this.reservationForm.controls.restaurant.invalid && this.reservationForm.controls.restaurant.dirty) {
      return 'Please choose your restaurant';
    }
  }

  private isPartnerRestaurantRequested(restaurantId: string): boolean {
    return restaurantId === 'OTHER';
  }

  private redirectToPartner(): void {
    window.location.href = `${environment.partnerRestaurantUrl}?providerCode=${this.providerCode}`;
  }
}
