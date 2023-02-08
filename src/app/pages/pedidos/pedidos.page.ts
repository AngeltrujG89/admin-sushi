import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/enums/sockets.enum';
import { OrderRepo } from 'src/app/shared/repos/orders.repository';
import { GenericService } from 'src/app/shared/service/generic.service';
import { SocketsService } from 'src/app/shared/service/sockets.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  constructor(
    private sockets:SocketsService,
    private toast:ToastrService,
    private orderRepo:OrderRepo,
    private orderService:GenericService) {
  }
  allOrders!:any;
  orderSelected!:any;
  TOCONFIRM=0;
  ACCEPTED = 0;
  CANCELLED = 0;
  ONWALK=0;
  FINISHED=0;
  READY =0;
  PREPARING=0;
  selectedSwitch!:string;
  status = Status;
  ngOnInit(): void {
    this.orderRepo.orders$.subscribe((res:any[]) => {
      this.orderSelected = res.filter((ord) => ord.status === Status.TOCONFIRM);
      this.allOrders = res;
      this.recalcular(res);
      console.log(this.allOrders);
    })

  }



  recalcular(array:any[]){
    this.TOCONFIRM=0;
    this.ACCEPTED = 0;
    this.CANCELLED = 0;
    this.ONWALK=0;
    this.FINISHED=0;
    this.READY =0;
    this.PREPARING=0;
    array.forEach( (ord) =>{
      switch (ord.status) {
        case Status.CANCELLED:
          this.CANCELLED++;
          break;
          case Status.FINISHED:
          this.FINISHED++;
          break;
          case Status.ONWALK:
          this.ONWALK++;
          break;
          case Status.PREPARING:
          this.PREPARING++;
          break;
          case Status.READY:
            this.READY++;
          break;
          case Status.ACCEPTED:
            this.ACCEPTED++;
          break;

        default:
        this.TOCONFIRM++
          break;
      }
    })
  }

  seleccionar(status:any){
    this.orderSelected = this.allOrders.filter((ord:any) => ord.status === status);

  }

  updated(status:string,id:number){
    this.orderService.update("order",id,{status}).subscribe((res:any) => {
      console.log(res);

      this.orderRepo.updateOrder(res.orden.id,res.orden)
      this.toast.success("Order Updated")
    })
  }

}
