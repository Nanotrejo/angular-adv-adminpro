import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncrementComponent} from './increment/increment.component';
import {FormsModule} from '@angular/forms';
import {DonaComponent} from './dona/dona.component';

import {ChartsModule} from 'ng2-charts';
import {ModalImagenComponent} from './modal-imagen/modal-imagen.component';

@NgModule({
  declarations: [IncrementComponent, DonaComponent, ModalImagenComponent],
  exports: [IncrementComponent, DonaComponent, ModalImagenComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule {
}
