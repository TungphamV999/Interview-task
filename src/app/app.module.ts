import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './pages/about/about.component';
import { CarsComponent } from './pages/cars/cars.component';
import { ButtonCustomComponent } from './components/button-custom/button-custom.component';
import { CarCardComponent } from './components/car-card/car-card.component';
import { AddCarModalComponent } from './pages/cars/components/add-car-modal/add-car-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CarsComponent,
    ButtonCustomComponent,
    CarCardComponent,
    AddCarModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
