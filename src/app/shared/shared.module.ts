import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FiltroBusquedaPipe } from '../pipes/filtro-busqueda.pipe';
import { FiltroColaborratorPipe } from '../pipes/filtro-colaborrator.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { OptionsRestaurantsComponent } from './components/options-restaurants/options-restaurants.component';
import { OptionsCollaboratorsComponent } from './components/options-collaborators/options-collaborators.component';



@NgModule({
  declarations: [NavComponent,FiltroBusquedaPipe,FiltroColaborratorPipe, FooterComponent, OptionsRestaurantsComponent, OptionsCollaboratorsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports:[NavComponent,FiltroBusquedaPipe,FiltroColaborratorPipe, FooterComponent, OptionsRestaurantsComponent, OptionsCollaboratorsComponent]
})
export class SharedModule { }
