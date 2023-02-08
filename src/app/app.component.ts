import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Eventos, Status } from './enums/sockets.enum';
import { OrderRepo } from './shared/repos/orders.repository';
import { SocketsService } from './shared/service/sockets.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private wsService:SocketsService,  private toastr:ToastrService, private orderRepo:OrderRepo) {
    this.escuchar()
  }


  escuchar( ){
    if(localStorage.getItem("branch")){
      this.wsService.listen(Eventos.ADMIN).subscribe( async (res:any) => {
        if(res.status === Status.CANCELLED){
          this.toastr.error(`Order #${res.id} cancelled by the user`,"Orders Cancelled")
        }else{
          this.toastr.success("Check the order board ","Orders Updated")
        }
        this.orderRepo.orders$.subscribe((orders:any[]) => {
          const find =  orders.find((ord:any) => ord.id === res.id);
          if(find){
            this.orderRepo.updateOrder(res.id,res);
          }else{
            this.orderRepo.addOrder(res);
          }
        })
      const audio = new Audio('../../assets/tono.mp3');
      await audio.play();

    })
    }

  }
}
