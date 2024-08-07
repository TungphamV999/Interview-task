import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '../../services/api.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss',
})
export class CarCardComponent {
  @Input({ required: true }) car!: Car;
  @Output() deleteCar = new EventEmitter<string>();
}
