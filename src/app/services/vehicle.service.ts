import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }
}
