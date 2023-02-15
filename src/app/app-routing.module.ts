import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProtectedGuard } from './guards/protected.guard';
import { AddressComponent } from './shared/components/address/address.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate:[ProtectedGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'pedidos',
    canActivate:[ProtectedGuard],
    loadChildren: () => import('./pages/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'branch',
    canActivate:[ProtectedGuard],
    loadChildren: () => import('./pages/branch/branch.module').then( m => m.BranchPageModule)
  },
  {
    path: 'restaurant',
    canActivate:[ProtectedGuard],
    loadChildren: () => import('./pages/restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
  {
    path: 'clientes',
    canActivate:[ProtectedGuard],
    loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesPageModule)
  },
  {
    path: 'deliveries',
    canActivate:[ProtectedGuard],
    loadChildren: () => import('./pages/delivery/delivery.module').then(m => m.DeliveryPageModule)
  },
  {
    path: 'usuarios',
    canActivate:[ProtectedGuard],
    loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosPageModule)
  },
  { 
    path: 'cupones',
    canActivate:[ProtectedGuard],
    loadChildren: () => import('./pages/cuopons/cuopons.module').then(m => m.CuoponsPageModule)
  },
  { 
    path: 'quejas',
    canActivate:[ProtectedGuard],
    loadChildren: () => import('./pages/quejas/quejas.module').then(m => m.QuejasPageModule)
  },
  { 
    path: 'reportes',
    canActivate:[ProtectedGuard],
    loadChildren: () => import('./pages/reportes/reportes.module').then(m => m.ReportesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
