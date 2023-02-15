import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GenericService } from 'src/app/shared/service/generic.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  deliveries:any=[];
  request!:any[];
  view=false;
  URL = environment.image;
  viewSelect:any;
  constructor( private alertController:AlertController,private deliveryS:GenericService) { }

  ngOnInit() {
    this.deliveryS.getAll("delivery-man").subscribe( (res:any)=> {

      this.request = res;
    })

  }


  active(id:number){
    console.log(id);

    this.deliveryS.update("delivery-man",id,{active:true}).subscribe( (res:any) => {
      console.log(res);

      this.request = this.request.map((prod) => prod.id_delivery === res.id_delivery ? res  : prod);
    })
  }

  desactive (id:number){
    this.deliveryS.update("delivery-man",id,{active:true}).subscribe( (res:any) => {
      this.request = this.request.map((prod) => prod.id_delivery === res.id_delivery ? res  : prod);
    })
  }

  select(del:any){
    this.viewSelect = del
  }


}
