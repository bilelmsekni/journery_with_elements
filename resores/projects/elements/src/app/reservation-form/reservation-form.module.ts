import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReservationFormComponent } from './reservation-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [ReservationFormComponent],
    declarations: [ReservationFormComponent]
})
export class ReservationFormModule { }
