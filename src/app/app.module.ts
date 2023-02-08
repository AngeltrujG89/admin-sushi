import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RequestInterceptor } from './interceptor/request.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';

const config: SocketIoConfig = { url: environment.wss, options: { transports:['websocket'] } };
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    BrowserAnimationsModule ,
    IonicModule.forRoot(),
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    ToastrModule.forRoot(),
    SharedModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide:HTTP_INTERCEPTORS, useClass:RequestInterceptor, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
