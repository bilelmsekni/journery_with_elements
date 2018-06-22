import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../services/restaurant.model';
import { Table } from '../services/table.model';
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
  @Input() areBigTablesAvailable: boolean;

  // send leads to partner using this provider code
  @Input() providerCode: string;

  // list of restaurants
  @Input() restaurants: Restaurant[];

  // list of tables
  @Input() set tables(value: Table[]) {
    this._tables = value;
  }
  get tables(): Table[] {
    return this.areBigTablesAvailable ? this._tables : this._tables.filter(t => t.value !== '6+');
  }

  @Output() continue = new EventEmitter<{ restaurant: string, table: string }>();

  reservationForm: FormGroup;

  private _tables: Table[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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
        this.continue.emit(this.reservationForm.value);
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
