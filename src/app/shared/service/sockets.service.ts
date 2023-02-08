import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Eventos } from '../../enums/sockets.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  private user:any=null
  constructor(private socket:Socket,) {

      this.checkStatus()


  }

  checkStatus(){
    this.socket.on(Eventos.CONECTAR, () => {
      if(localStorage.getItem(environment.TOKEN)){
        this.emit(Eventos.CONFIGUSER,{id:localStorage.getItem('usuario')})
      }

    })

    this.socket.on(Eventos.DESCONECTAR, () => {
    })
  }


  emit (event:string,payload?:any) {

      this.socket.emit(event,payload)
  }

  listen (event:string){
    return this.socket.fromEvent(event);
  }

}
