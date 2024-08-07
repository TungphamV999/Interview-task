import { Component } from '@angular/core';
import { ApiService, Car } from '../../services/api.service';

export type carType = 'All' | 'Octavia' | 'Kamiq' | 'Superb' | 'Kodiaq';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent {
  cars!: Car[];
  filteredCars!: Car[];
  selectedCarType: carType = 'All';
  constructor(private apiService: ApiService) {
    this.getCars();
  }
  addCar() {
    console.log('aaaaa');
  }

  getCars() {
    this.apiService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.filteredCars = response.data;
    });
  }

  filterCars(carType: carType) {
    this.selectedCarType = carType;
    this.filteredCars =
      carType === 'All'
        ? this.cars
        : this.cars.filter((car) => car.model === carType);
  }

  deleteCar(id: string) {
    this.apiService.deleteCar(id).subscribe(() => this.getCars());
  }
}
