import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationFormComponent } from './reservation-form.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [ReservationFormComponent],
    declarations: [ReservationFormComponent]
})
export class ReservationFormModule { }
