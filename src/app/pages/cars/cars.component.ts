import { Component } from '@angular/core';
import { ApiService, Car } from '../../services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCarModalComponent } from './components/add-car-modal/add-car-modal.component';
import { Observable, takeUntil } from 'rxjs';
import { BaseComponent } from '../../components/base.component';

export type CarType = 'All' | 'Octavia' | 'Kamiq' | 'Superb' | 'Kodiaq';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent extends BaseComponent {
  loading$!: Observable<boolean>;
  filteredCars!: Car[];
  selectedCarType: CarType = 'All';
  readonly carTypes: CarType[] = [
    'All',
    'Octavia',
    'Kamiq',
    'Superb',
    'Kodiaq',
  ];
  private cars!: Car[];

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    super();
    this.getCars();
    this.loading$ = this.apiService.loading$;
  }

  addCar(): void {
    const dialogConfig: MatDialogConfig = {
      position: { top: '-10rem', left: '40%' },
      width: '25rem',
      height: '17rem',
    };
    this.dialog.open(AddCarModalComponent, dialogConfig);
  }

  getCars(): void {
    this.apiService.getCars().pipe(takeUntil(this.ngUnsubscribe$)).subscribe();
    this.apiService.cars$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((cars) => {
        this.cars = cars;
        this.filteredCars = cars;
      });
  }

  filterCars(carType: CarType): void {
    this.selectedCarType = carType;
    this.filteredCars =
      carType === 'All'
        ? this.cars
        : this.cars.filter((car) => car.model === carType);
  }

  deleteCar(id: string): void {
    this.apiService
      .deleteCar(id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => this.filterCars(this.selectedCarType));
  }
}
