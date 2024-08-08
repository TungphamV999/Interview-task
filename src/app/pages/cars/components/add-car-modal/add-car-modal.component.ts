import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService, Car } from '../../../../services/api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrl: './add-car-modal.component.scss',
})
export class AddCarModalComponent {
  carForm = new FormGroup({
    model: new FormControl<string>('', [Validators.required]),
    engine: new FormControl<string>('', [Validators.required]),
    color: new FormControl<string>('', [Validators.required]),
  });

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  addNewCar() {
    if (this.carForm.invalid) {
      return;
    }
    this.dialog.closeAll();
    this.apiService
      .addCar(this.carForm.getRawValue() as Partial<Car>)
      .subscribe();
  }
}
