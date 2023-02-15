import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AlertController } from '@ionic/angular';
import { GenericService } from 'src/app/shared/service/generic.service';
import { User } from 'src/app/shared/repos/user.repository';
import { Branch, BranchRepo } from 'src/app/shared/repos/branch.repository';
import { AuthRepo } from 'src/app/shared/repos/auth.repository';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  users:User[] = []
  filter:string = "";
  you!:User;
  colProd:boolean=false;
  branch:Branch[]=[];
  userForm!:FormGroup;
  userFormEdit!:FormGroup;
  subs:Subscription[] = [];
  constructor(
     private fb:FormBuilder,
     private userS:GenericService,
     private toast:ToastrService,
     private alertController:AlertController,
     private branchRepo:BranchRepo,
     private auhtRepo:AuthRepo
     ) {

   }

   ngOnInit(): void {
    this.branchRepo.branch$.subscribe((res:any) => {
      this.branch = res
    })
    this.auhtRepo.auth$.subscribe((res:any) => {
      this.you = res[0]
    })
    this.userForm = this.fb.group({
      names:[null,Validators.required],
      phone:[null,Validators.required],
      email:[null,Validators.required],
      password:[null,Validators.required],
      password2:[null,Validators.required],
      wallet:[null],
      role:[null,Validators.required],
      active:true,
      notificationsEnabled:false,
      image:null,
      pendingOrder:false,
      birthday:"",
      address:[],
      orders:[],

    })

    this.userFormEdit = this.fb.group({
      id:"",
      names:[null,Validators.required],
      phone:[null,Validators.required],
      email:[null,Validators.required],
      role:[null,Validators.required],

    })
   }

   ionViewWillEnter() {

    this.userS.getOne('branch',Number(localStorage.getItem('branch'))).subscribe( (res:any) => {
      console.log(res);

      this.users = res.filter( (u:any) => u.role ==='GERENTE' || u.role ==='COLABORADOR' );
    })




  }



  createUser(){
    if(this.userForm.valid){
      this.userS.post("user",this.userForm.value).subscribe((res: any) => {
        console.log(res,this.users);

        this.users.push(res);
        this.users = this.users.filter( u => u.role ==='GERENTE' || u.role ==='COLABORADOR' );
        this.userForm.reset({
          active:true
        });
        this.toast.success('Usuario Agregado');
      },
      (err:any) => {
        console.log(err);

        this.toast.error(err.error.message);
      })

    }

  }


 async deleteUser(id:number){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete User',
      message: ' Do you agree? ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
        }, {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
              this.userS.delete("user",id).subscribe( (res:any) =>{
                this.toast.success("Usuario Eliminado");
                this.users= this.users.filter(b => b.id !== Number(id));
              })
          }
        }
      ]
    });

    await alert.present();

  }

  editUser(){

    this.colProd=!this.colProd

    this.userS.update("user",this.userFormEdit.controls['id'].value,this.userFormEdit.value).subscribe( (res:any) => {
      this.users=this.users.map((prod) => prod.id === res.id ? res  : prod);

      this.toast.success('Usuario Actualizado');
      this.userFormEdit.reset();
    })


  }


  colProdAdd(user:User){
    const {
      id,
      names,
      phone,
      email,
      role,
    } = user
    const userForm = {
      id,
      names,
      phone,
      email,
      role,
    }
    this.userFormEdit.setValue(userForm);
  }
}
