import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/service/generic.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
})
export class PromotionsComponent implements OnInit {

  @ViewChild('modal', { static: true }) modal!: IonModal;


  create : boolean = false;
  selectProducts : boolean = false;
  promoForm : FormGroup;
  categories : any = []
  products : any[] = [];
  selectedProducts: string[] = [];
  itemSelected : string = '';
  additionalsSelect : boolean = false;
  priceSelected: string = '';
  dias:any = [
    {
      name:"LUNES",
      open:"9:00",
      close:"18:00",
      active:true
    },
    {
      name:"MARTES",
      open:"9:00",
      close:"18:00",
      active:true
    },
    {
      name:"MIERCOLES",
      open:"9:00",
      close:"18:00",
      active:true
    },
    {
      name:"JUEVES",
      open:"9:00",
      close:"18:00",
      active:true
    },
    {
      name:"VIERNES",
      open:"9:00",
      close:"18:00",
      active:true
    },{
      name:"SABADO",
      open:"9:00",
      close:"18:00",
      active:true
    },{
      name:"DOMINGO",
      open:"9:00",
      close:"18:00",
      active:true
    }
  ]


  constructor(
    private formBuilder : FormBuilder,
    private toast : ToastrService,
    private modalcontroller : ModalController,
    private genericService: GenericService
  ) { 
    this.promoForm = this.formBuilder.group({
      name : [null, Validators.required]
    })
  }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  getCategories(){
    this.genericService.getAll("category").subscribe((resp : any) => {
      this.categories = resp;
    })
  }

  getProducts(){
    this.genericService.getAll("product").subscribe((resp : any) => {
      this.products = resp;
    })
  }

  private formatData(data: string[]) {
    if (data.length === 1) {
      const fruit = this.products.find((product: string) => product === data[0])
      return fruit.text;
    }
  
    return `${data.length} items`;
  }

  promoSelectionChanged(items : string[]) {
    console.log('hola')
    this.selectedProducts = items
    // this.selectedProducts = this.formatData(this.selectedProducts);
    this.modal.dismiss();
  }

  selectItemsForPromo(ev : any){
    console.log(ev.target.value)
    this.itemSelected = ev.target.value;
  }

  assign(name:string,event:any,type:string){

    if(type==="OPEN"){
      this.dias = this.dias.map((d:any)=> d.name ===name ? {...d,open:event.detail.value}:d)
    }else{

      this.dias = this.dias.map((d:any)=> d.name ===name ? {...d,close:event.detail.value}:d)
    }

  }

  // async showModalCreate(){
  //   const modal = await this.modalcontroller.create({
      
  //   })
  // }

}
