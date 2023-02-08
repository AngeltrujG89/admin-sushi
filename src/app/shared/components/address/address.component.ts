import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { throws } from 'assert';
import { GenericService } from 'src/app/shared/service/generic.service';
import { MapboxService } from 'src/app/shared/service/mapbox.service';
import { environment } from 'src/environments/environment';
import { BranchRepo } from '../../repos/branch.repository';

@Component({
  selector: 'app-address',
  standalone:true,
  imports:[FormsModule,IonicModule,RouterModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit, AfterViewInit {
  @Input() direccion:any = {
    id:null,
    address:null,
    latitud:0,
    longitud:0,
  }
  ios=false;
  @Input() edit=false;
  @Input() branch=0;
  constructor(
    private mapBoxS:MapboxService,
    private toast:ToastController,
    private modalCtr:ModalController,
    private router:Router,
    private genericS:GenericService,
    private branchRepo:BranchRepo
  ) { }
    user:any
  ngOnInit() {
    console.log(this.direccion,this.branch);


  }
  modal:boolean=false;
  ngAfterViewInit(): void {

    this.init()
  }

  dismiss(bool:boolean){
    this.modalCtr.dismiss(bool)
  }
  async init(){

   if(this.direccion.latitud !== 0 &&this.direccion.longitud !== 0){
    await  this.mapBoxS.createMapSelectUbication(this.direccion.latitud,this.direccion.longitud);
    await this.mapBoxS.addMarket([this.direccion.longitud,this.direccion.latitud])
   }else{
    const {coords} = await Geolocation.getCurrentPosition()
    await  this.mapBoxS.createMapSelectUbication(coords.latitude,coords.longitude);
    await this.mapBoxS.addMarket([coords.longitude,coords.latitude])
   }

  }

  select(){
    this.mapBoxS.eventMapClick()
  }

  save(){
    this.direccion.latitud = this.mapBoxS.ubicationPoint.getLngLat().lat
    this.direccion.longitud = this.mapBoxS.ubicationPoint.getLngLat().lng
    console.log(this.direccion);

    if(this.edit){
     this.genericS.update("address",this.direccion.id,{...this.direccion}).subscribe( async (add:any) =>{

       const toast = await this.toast.create({
        message: 'Address Saved!',
        duration: 1500,
        color:"success",
        position: "top"
      });
      await toast.present();
      this.branchRepo.updateBranch(this.branch,{address:add})
      this.dismiss(true)
      this.modal=false;
    })
    }else{
     this.genericS.post("address",{...this.direccion,branch:this.branch}).subscribe( async (add:any) =>{

       const toast = await this.toast.create({
        message: 'Address Saved!',
        duration: 1500,
        color:"success",
        position: "top"
      });
      await toast.present();
      this.modal=false;
      this.branchRepo.updateBranch(this.branch,{address:add})
      this.dismiss(true)
    })
    }
    this.modal=false;
   }
}
