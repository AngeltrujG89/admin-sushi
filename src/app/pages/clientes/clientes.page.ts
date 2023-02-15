import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Roles } from 'src/app/enums/sockets.enum';
import { GenericService } from 'src/app/shared/service/generic.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  cashback=false;
  filter!: string;
  user=false;
  selected:any=null;
  users: any[]=[];
  constructor(private authS: GenericService, private alertController: AlertController,private toast:ToastrService) { }

  ngOnInit() {
    this.authS.getAll("users").subscribe( (res: any) => {
      console.log(res);

      this.users=res;

    });
  }


  async block(id:number){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Block User',
      message: 'Are you sure? ',
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
            this.authS.update("user",id,{active:false}).subscribe( (res:any) =>{
              this.users = this.users.map((u:any) => u.id === id ? res : u);
              this.toast.success("User Block");
            })

          }
        }
      ]
    });

    await alert.present();



  }

  async unlock(id:number){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Unlock User',
      message: 'Are you sure? ',
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
            this.authS.update("user",id,{active:true}).subscribe( (res:any) =>{
              this.users = this.users.map((u:any) => u.id === id ? res : u);
              this.toast.success("User Unlocked");
            })

          }
        }
      ]
    });

    await alert.present();



  }


  cash(){
    this.cashback=false;
    this.toast.success("Cashback Updated");
  }

}
