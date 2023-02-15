import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuoponsPageRoutingModule } from './cuopons-routing.module';

import { CuoponsPage } from './cuopons.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    CuoponsPageRoutingModule
  ],
  declarations: [CuoponsPage]
})
export class CuoponsPageModule {}
