import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService, Car } from '../../../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '../../../../components/base.component';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrl: './add-car-modal.component.scss',
})
export class AddCarModalComponent extends BaseComponent {
  carForm = new FormGroup({
    model: new FormControl<string>('', [Validators.required]),
    engine: new FormControl<string>('', [Validators.required]),
    color: new FormControl<string>('', [Validators.required]),
  });

  showError = false;
  loading$!: Observable<boolean>;

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    super();
    this.carForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => (this.showError = false));
    this.loading$ = this.apiService.loading$;
  }

  addNewCar() {
    if (this.carForm.invalid) {
      this.showError = true;
      return;
    }
    this.apiService
      .addCar(this.carForm.getRawValue() as Partial<Car>)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => this.dialog.closeAll());
  }
}
