import { Component } from '@angular/core';
import { ApiService, Car } from '../../services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCarModalComponent } from './components/add-car-modal/add-car-modal.component';
import { Observable } from 'rxjs';

export type CarType = 'All' | 'Octavia' | 'Kamiq' | 'Superb' | 'Kodiaq';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent {
  loading$!: Observable<boolean>;
  cars!: Car[];
  filteredCars!: Car[];
  selectedCarType: CarType = 'All';
  carTypes: CarType[] = ['All', 'Octavia', 'Kamiq', 'Superb', 'Kodiaq'];

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.getCars();
    this.loading$ = this.apiService.loading$;
  }

  addCar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: '-5rem',
      left: '40%',
    };
    dialogConfig.width = '25rem';
    dialogConfig.height = '17rem';
    this.dialog.open(AddCarModalComponent, dialogConfig);
  }

  getCars() {
    this.apiService.getCars().subscribe();
    this.apiService.cars$.subscribe((cars) => {
      this.cars = cars;
      this.filteredCars = cars;
    });
  }

  filterCars(carType: CarType) {
    this.selectedCarType = carType;
    this.filteredCars =
      carType === 'All'
        ? this.cars
        : this.cars.filter((car) => car.model === carType);
  }

  deleteCar(id: string) {
    this.apiService.deleteCar(id).subscribe();
  }
}
