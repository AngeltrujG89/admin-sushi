import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantPageRoutingModule } from './restaurant-routing.module';

import { RestaurantPage } from './restaurant.page';
import { SharedModule } from '../../shared/shared.module';
import { FiltroBusquedaPipe } from 'src/app/pipes/filtro-busqueda.pipe';
import { AdicionalesComponent } from './pages/adicionales/adicionales.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NgxImageCompressService } from 'ngx-image-compress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    ReactiveFormsModule,
    RestaurantPageRoutingModule,

  ],
  declarations: [RestaurantPage,AdicionalesComponent,CategoriasComponent,ProductosComponent],
  providers:[NgxImageCompressService,FiltroBusquedaPipe]
})
export class RestaurantPageModule {}
