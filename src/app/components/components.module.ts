import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementComponent } from './increment/increment.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [IncrementComponent, DonaComponent],
  exports: [IncrementComponent, DonaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
