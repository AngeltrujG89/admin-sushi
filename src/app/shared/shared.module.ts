import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FiltroBusquedaPipe } from '../pipes/filtro-busqueda.pipe';
import { FiltroColaborratorPipe } from '../pipes/filtro-colaborrator.pipe';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [NavComponent,FiltroBusquedaPipe,FiltroColaborratorPipe, FooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports:[NavComponent,FiltroBusquedaPipe,FiltroColaborratorPipe, FooterComponent]
})
export class SharedModule { }
