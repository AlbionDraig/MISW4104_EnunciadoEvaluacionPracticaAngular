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
  countMap = new Map<string, number>();

  constructor(private vehicleService: VehicleService) {}

  getVehicles() {
    this.vehicleService.getCourses().subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
  }

  getCountBrands() {
    this.vehicles.forEach((vehicle) => {
      const brand = vehicle.marca;
      if (this.countMap.has(brand)) {
        this.countMap.set(brand, this.countMap.get(brand)! + 1);
      } else {
        this.countMap.set(brand, 1);
      }
    });

    const brandsCount: Array<{ Marca: string; Cantidad: number }> = [];
    this.countMap.forEach((count, brand) => {
      brandsCount.push({ Marca: brand, Cantidad: count });
    });

    return brandsCount;
  }

  ngOnInit() {
    this.getVehicles();
  }
}
