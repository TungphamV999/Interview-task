import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

export interface Car {
  color: string;
  engine: string;
  id: string;
  model: string;
}

export interface cardData {
  data: Car[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  cars$ = new BehaviorSubject<Car[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getCars() {
    this.loading$.next(true);
    return this.http.get<cardData>(`${this.apiUrl}/api/cars`).pipe(
      tap((response) => {
        this.cars$.next(response.data);
        this.loading$.next(false);
      })
    );
  }

  deleteCar(id: string) {
    return this.http
      .delete<Car>(`${this.apiUrl}/api/cars/${id}`)
      .pipe(switchMap(() => this.getCars()));
  }

  addCar(car: Partial<Car>) {
    return this.http
      .post<Car>(`${this.apiUrl}/api/cars`, { ...car })
      .pipe(switchMap(() => this.getCars()));
  }
}
