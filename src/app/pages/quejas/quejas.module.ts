import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuejasPageRoutingModule } from './quejas-routing.module';

import { QuejasPage } from './quejas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    QuejasPageRoutingModule
  ],
  declarations: [QuejasPage]
})
export class QuejasPageModule {}
