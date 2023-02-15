import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroupName, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AlertController } from '@ionic/angular';
import { GenericService } from 'src/app/shared/service/generic.service';
import { Product } from 'src/app/shared/repos/products.repository';

@Component({
  selector: 'app-cuopons',
  templateUrl: './cuopons.page.html',
  styleUrls: ['./cuopons.page.scss'],
})
export class CuoponsPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private couponS: GenericService,
    private toast:ToastrService,
    private alertController: AlertController) { }
  coupons:any[]=[];
  couponForm!:FormGroup;
  idBranch!:number;
  products:Product[]=[];
  ngOnInit() {

    this.couponForm = this.fb.group({
    name:[null,Validators.required],
    active:[true,Validators.required],
    date:[null,Validators.required],
    description:[null,Validators.required],
    uses:[null,Validators.required],
    products: [[]],
    allProducts:[true,Validators.required],
    discount:[null,Validators.required],
    percentage:[false,Validators.required],
    orders:[null],
    isBirthday:[false],
    initialDate:[null,Validators.required],
    });

    this.couponS.getAll("coupons").subscribe( (res : any) => {
      console.log(res);

      this.coupons = res;

    })
  }


save(){

  if(!this.couponForm.valid){
    console.log(this.couponForm.value);

    this.toast.error("Completa el formulario para continuar");
    return;
  }
  this.couponForm.controls['percentage'].setValue(!this.couponForm.controls['percentage'].value);
  this.couponS.post("coupon",this.couponForm.value).subscribe( (res:any) => {
    this.coupons.push(res);
    this.toast.success('Cupon Guardado');
  this.couponForm.reset({
    allProducts:true,
    active:true,
    percentage:false
  },);
  }, (err: any) => {
    this.couponForm.controls['percentage'].setValue(!this.couponForm.controls['percentage'].value);
    this.toast.error(err.error.message);
  });
}


async delete(id:number){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Delete Coupon',
    message: 'Do you agree? ',
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
          this.couponS.delete("coupon",id).subscribe( () => {
            this.toast.success("Coupon deleted");
            this.coupons = this.coupons.filter( (c:any) => c.id !== Number(id));
          });
        }
      }
    ]
  });

  await alert.present();


}



}
