import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchPageRoutingModule } from './branch-routing.module';

import { BranchPage } from './branch.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    BranchPageRoutingModule
  ],
  declarations: [BranchPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BranchPageModule {}
