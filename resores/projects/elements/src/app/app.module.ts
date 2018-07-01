import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { ReservationFormModule } from './reservation-form/reservation-form.module';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  entryComponents: [ReservationFormComponent],
  imports: [
    BrowserModule,
    ReservationFormModule
  ]
})
export class AppModule {

  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const formElement = createCustomElement(ReservationFormComponent, { injector: this.injector });
    customElements.define('elm-reservation-form', formElement);
  }
}
