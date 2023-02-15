import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesPageRoutingModule } from './clientes-routing.module';

import { ClientesPage } from './clientes.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FiltroColaborratorPipe } from 'src/app/pipes/filtro-colaborrator.pipe';
import { FiltroBusquedaPipe } from 'src/app/pipes/filtro-busqueda.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    ClientesPageRoutingModule
  ],
  declarations: [ClientesPage]
})
export class ClientesPageModule {}
