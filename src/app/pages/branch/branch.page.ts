import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalController, AlertController } from '@ionic/angular';
import { BranchRepo } from 'src/app/shared/repos/branch.repository';
import { MapboxService } from 'src/app/shared/service/mapbox.service';
import { GenericService } from 'src/app/shared/service/generic.service';
import { CompressImageService } from 'src/app/shared/service/compress-image.service';
import { AddressComponent } from 'src/app/shared/components/address/address.component';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.page.html',
  styleUrls: ['./branch.page.scss']
})
export class BranchPage implements OnInit {
  branchs: any[]=[];
  editando =false;
  branchForm: FormGroup;
  id!:number
  direccion:
    {
      address:string,
      latitud:number,
      longitud:number,
      id?:number
    }
  = {
    address:"",
    latitud:0,
    longitud:0
  };
  Uri: string = environment.image;
  abrirMapa =false;
  individual=false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private alertController: AlertController,
    private branchRepo:BranchRepo,
    private mapboxS:MapboxService,
    private GenericS:GenericService,
    private compressImage:CompressImageService,
    private modalC:ModalController
    ) {
    this.branchForm = this.fb.group({
      name: [null,Validators.required],
      shippingCost: [null,Validators.required],
      phone: [null],
      deliveryType: [null,Validators.required],
      paymentMethod: [null],
      rate: [null,Validators.required],
    });
   }


initial=false;
  ngOnInit() {
    this.branchRepo.branch$.subscribe((res:any) => {
      this.branchs = res;
      if(!this.initial){
        this.GenericS.getAll("branch").subscribe((res:any) =>{
          res.map((branch:any) =>  {
            if(typeof(branch.dias) === 'string'){
              branch.dias = JSON.parse(branch.dias)
            }
          })

          this.branchRepo.setBranch(res)
          this.initial=true
          console.log(res);

        })
      }
    })

  }



  label: any = {
    color:'red',
    text:"marcador"
  };
  title='Su ubicacion';
  async preparedMapa(edit=false)  {
    const modal = await this.modalC.create({
      component:AddressComponent,
      cssClass: 'fullscreen',
      backdropDismiss:false,
      componentProps:{
        direccion:this.direccion,
        edit,
        branch:this.branch
      }
    })
    modal.onDidDismiss().then((res) => {

      if(!res.data){
        this.individual=false;
      }
    }

    );


    modal.present()

  };


  labelOptions = {
    color: '#ee4646',
    fontFamily: '',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing:'0.5px',
    text: 'Plan Pagado/No pagado'
  }

iconURL ="https://img2.freepng.es/20180404/clw/kisspng-computer-icons-google-map-maker-marker-pen-cartodb-map-marker-5ac4f16f538be1.8585288315228563033422.jpg"
data=false;
days=false;
dias:any = [
  {
    name:"LUNES",
    open:"7:00",
    close:"18:00",
    active:true
  },
  {
    name:"MARTES",
    open:"7:00",
    close:"18:00",
    active:true
  },
  {
    name:"MIERCOLES",
    open:"7:00",
    close:"18:00",
    active:true
  },
  {
    name:"JUEVES",
    open:"7:00",
    close:"18:00",
    active:true
  },
  {
    name:"VIERNES",
    open:"7:00",
    close:"18:00",
    active:true
  },{
    name:"SABADO",
    open:"7:00",
    close:"18:00",
    active:true
  },{
    name:"DOMINGO",
    open:"7:00",
    close:"18:00",
    active:true
  }
]

  imagen:any
  async camera(){
    this.imagen = await this.compressImage.returnImageCompress();
  }


  branch:number=0;
  createBranch(){

    const findActiveDay = this.dias.find((d:any) => d.active===true)
    if(findActiveDay){

    }

    if(!this.branchForm.valid){
      this.toast.error('Complete the form to save');
      return;
    }
    const form = new FormData();
    form.append("name",this.branchForm.controls["name"].value)
    form.append("shippingCost",this.branchForm.controls["shippingCost"].value)
    form.append("phone",this.branchForm.controls["phone"].value)
    form.append("deliveryType",this.branchForm.controls["deliveryType"].value)
    form.append("paymentMethod",this.branchForm.controls["paymentMethod"].value)
    form.append("rate",this.branchForm.controls["rate"].value)
    form.append("dias",JSON.stringify(this.dias))
    if(this.imagen){
      form.append("image",this.imagen)
    }
    this.GenericS.postWhitImage("branch",form).subscribe( (res: any) => {
      this.toast.success("Branchs Created");
      this.branchForm.reset({
        rate:[0]
      });
      this.branchRepo.addBranch(res);
      this.imagen=null;
      this.branch = res.id;
      this.preparedMapa()
      this.data=false;
      this.resetDias();
    });


  }


async deleteBranch(id: number){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Delete Category',
    message: 'If you delete this Branch, you would <strong>delete all the products, categories and additional products related to it!!! </strong> <br>    Do you agree? ',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        id: 'cancel-button',
      }, {
        text: 'Okay',
        id: 'confirm-button',
        handler: () => {
            this.GenericS.delete("branch",id).subscribe( (res:any) =>{
              this.toast.success("Deleted Branch");
              this.branchRepo.deleteBranch(id)
            })
        }
      }
    ]
  });

  await alert.present();

}

async updateBranch(branch:any){
  this.editando=true;

  this.branchForm.setValue({
    name: branch.name,
    shippingCost: branch.shippingCost,
    deliveryType: branch.deliveryType,
    phone:branch.phone,
    paymentMethod:branch.paymentMethod,
    rate: branch.rate,
  });
  if(!this.branchForm.contains('id')){
    this.branchForm.addControl('id', new FormControl (branch.id));

  }
}


editBranch(){
  const form = new FormData();
  form.append("name",this.branchForm.controls["name"].value)
  form.append("shippingCost",this.branchForm.controls["shippingCost"].value)
  form.append("phone",this.branchForm.controls["phone"].value)
  form.append("deliveryType",this.branchForm.controls["deliveryType"].value)
  form.append("paymentMethod",this.branchForm.controls["paymentMethod"].value)
  form.append("rate",this.branchForm.controls["rate"].value)
  form.append("dias",JSON.stringify(this.dias))
  if(this.imagen){
    form.append("image",this.imagen)
  }

  this.GenericS.updateWhitImage("branch",this.branchForm.controls["id"].value,form).subscribe( (res: any) => {

   this.toast.success("Updated success")
    this.branchRepo.updateBranch(res.id,res)
    this.resetEdit()
    this.data = false;
    this.individual=false;
    this.imagen=null;
  })

}


resetEdit(){
  this.branchForm.removeControl('id');
  this.branchForm.reset({
  });
    this.imagen=null;
    this.editando = false;
    this.direccion.latitud=0;
    this.direccion.longitud=0;
}




resetDias(){
  this.dias = [
    {
      name:"MONDAY",
      open:"9:00",
      close:"18:00",
      active:true
    },
    {
      name:"TUESDAY",
      open:"9:00",
      close:"18:00",
      active:true
    },
    {
      name:"WEDNESDAY",
      open:"9:00",
      close:"18:00",
      active:true
    },
    {
      name:"THURSDAY",
      open:"9:00",
      close:"18:00",
      active:true
    },
    {
      name:"FRIDAY",
      open:"9:00",
      close:"18:00",
      active:true
    },{
      name:"SATURDAY",
      open:"9:00",
      close:"18:00",
      active:true
    },{
      name:"SUNDAY",
      open:"9:00",
      close:"18:00",
      active:true
    }
  ]
}

resetDireccion(){
  this.direccion = {
    address:'',
    latitud:0,
    longitud:0
  }
}

updateAddress(){
  this.GenericS.update("address",this.direccion.id || 0,this.direccion).subscribe( add =>{
    this.toast.success("Address Saved");
    this.branchs = this.branchs.map( (b:any) =>
      b.address.id===this.direccion.id ? {...b,address:add} : b
    )
    this.resetDireccion();
  })
}
updateSchedule(){
this.GenericS.update("branch",this.id,{dias:this.dias}).subscribe(
  (res:any) =>{
  this.branchRepo.updateBranch(this.id,res)
  this.resetDias()
  this.toast.success("Schedule updated")
  this.days=false;
  }
)
}


assign(name:string,event:any,type:string){

  if(type==="OPEN"){
    this.dias = this.dias.map((d:any)=> d.name ===name ? {...d,open:event.detail.value}:d)
  }else{

    this.dias = this.dias.map((d:any)=> d.name ===name ? {...d,close:event.detail.value}:d)
  }

}
}
