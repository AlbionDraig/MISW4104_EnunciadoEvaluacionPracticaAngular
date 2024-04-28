import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  vehicles: Array<Vehicle> = [];

  constructor(private vehicleService: VehicleService) {}

  getVehicles() {
    this.vehicleService.getCourses().subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
  }

  getCountBrands(property: keyof Vehicle): { key: string; value: number }[] {
    const countMap = new Map<string, number>();
  
    this.vehicles.forEach((vehicle) => {
      const valor = String(vehicle[property]);
      if (countMap.has(valor)) {
        countMap.set(valor, countMap.get(valor)! + 1);
      } else {
        countMap.set(valor, 1);
      }
    });
  
    const countArray: { key: string; value: number }[] = [];
    countMap.forEach((value, key) => {
      countArray.push({ key: key, value: value });
    });
  
    return countArray;
  }
  

  ngOnInit() {
    this.getVehicles();
  }
}
