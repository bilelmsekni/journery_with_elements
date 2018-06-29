import { Component } from '@angular/core';
import { BaseReservationFormComponent } from '../base-reservation-form/base-reservation-form.component';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'elm-reservation-form',
    templateUrl: './reservation-form.component.html',
    styleUrls: ['./reservation-form.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationFormComponent extends BaseReservationFormComponent {
    constructor(fb: FormBuilder) {
        super(fb);
    }
}
