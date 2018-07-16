import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forbiddenValue } from './forbidden-value.validator';
import { environment } from '../../environments/environment';
import { Restaurant } from '@models/restaurant.model';
import { Table } from '@models/table.model';

@Component({
  selector: 'elm-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationFormComponent implements OnInit, OnChanges {

  // used to display tables of 6 or more persons or not
  @Input() set arebigtablesavailable(value: boolean) {
    if (typeof (value) === 'boolean') {
      this._arebigtablesavailable = value;
    } else {
      this._arebigtablesavailable = JSON.parse(value);
    }
  }
  get arebigtablesavailable(): boolean {
    return this._arebigtablesavailable;
  }

  // send leads to partner using this provider code
  @Input() providercode = 'resores';

  // list of restaurants
  @Input() set restaurants(value: Restaurant[]) {
    if (typeof (value) === 'object') {
      this._restaurants = value;
    } else {
      this._restaurants = JSON.parse(value as any);
    }
  }
  get restaurants(): Restaurant[] {
    return this._restaurants;
  }

  // list of tables
  @Input() set tables(value: Table[]) {
    if (typeof (value) === 'object') {
      this._tables = value;
    } else {
      this._tables = JSON.parse(value as any);
    }
  }
  get tables(): Table[] {
    return this.arebigtablesavailable ? this._tables : this._tables.filter(t => t.value !== '6+');
  }

  @Output() continue = new EventEmitter<{ restaurant: string, table: string }>();

  reservationForm: FormGroup;

  private _tables: Table[] = [];
  private _arebigtablesavailable = true;
  private _restaurants: Restaurant[] = [];

  constructor(private fb: FormBuilder) {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.reservationForm = this.fb.group({
      restaurant: ['-1', [Validators.required, forbiddenValue('-1')]],
      table: ['-1', [Validators.required, forbiddenValue('-1')]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
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
    window.location.href = `${environment.partnerRestaurantUrl}?providerCode=${this.providercode}`;
  }
}
