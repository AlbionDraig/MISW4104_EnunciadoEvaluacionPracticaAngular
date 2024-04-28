import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesComponent } from './vehicles.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VehiclesComponent],
  exports: [VehiclesComponent]
})
export class VehiclesModule { }
