import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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

  constructor(private http: HttpClient) {}

  getCars() {
    return this.http.get<cardData>(`${this.apiUrl}/api/cars`);
  }

  deleteCar(id: string) {
    return this.http.delete<Car>(`${this.apiUrl}/api/cars/${id}`);
  }
}
