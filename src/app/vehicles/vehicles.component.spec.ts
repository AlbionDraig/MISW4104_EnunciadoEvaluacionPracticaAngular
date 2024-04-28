/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { HttpClientModule } from '@angular/common/http';
import { VehiclesComponent } from './vehicles.component';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle';

describe('BookListComponent', () => {
  let component: VehiclesComponent;
  let fixture: ComponentFixture<VehiclesComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [VehiclesComponent],
      providers: [VehicleService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesComponent);
    component = fixture.componentInstance;

    for (let i = 0; i < 10; i++) {
      const vehicle = new Vehicle(
        faker.number.int(),
        faker.vehicle.manufacturer(),
        faker.vehicle.model(),
        faker.vehicle.type(),
        faker.datatype.number({ min: 1990, max: 2024 }),
        faker.datatype.number({ min: 0, max: 300000 }),
        faker.vehicle.color(),
        faker.image.transport()
      );
      component.vehicles.push(vehicle);
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component has a table', () => {
    expect(debug.query(By.css('tbody')).childNodes.length).toBeGreaterThan(0);
  });

  it('should have an dd element ', () => {
    const dd = debug.query(By.css('dd'));
    const content: HTMLElement = dd.nativeElement;
    expect(content.textContent).toEqual(String(component.vehicles[0].id));
  });

  it('should display correct vehicle data in each column', () => {
    const trElements = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(trElements.length).toBe(10);

    trElements.forEach((row, rowIndex) => {
      const vehicle = component.vehicles[rowIndex];
      const tdElements = row.queryAll(By.css('td'));
      expect(tdElements.length).toBe(4);

      expect(tdElements[0].nativeElement.textContent.trim()).toBe(vehicle.id.toString());
      expect(tdElements[1].nativeElement.textContent.trim()).toBe(vehicle.marca);
      expect(tdElements[2].nativeElement.textContent.trim()).toBe(vehicle.linea);
      expect(tdElements[3].nativeElement.textContent.trim()).toBe(vehicle.modelo.toString());
    });
  });

  it('should have 10 <tr> elements and 4 <td> elements in each row', () => {
    const trElements = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(trElements.length).toBe(10);

    trElements.forEach((row) => {
      const tdElements = row.queryAll(By.css('td'));
      expect(tdElements.length).toBe(4);
    });
  });

  it('should have 9 <tbody tr> elements and the deleted vehicle should not exist', () => {
    const vehicle = component.vehicles.pop()!;
    fixture.detectChanges();
    expect(debug.queryAll(By.css('tbody tr'))).toHaveSize(9);

    debug.queryAll(By.css('tbody tr')).forEach((selector, i) => {
      expect(selector.nativeElement.textContent).not.toContain(vehicle.id);
    });
  });
});
