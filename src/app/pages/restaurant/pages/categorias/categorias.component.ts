import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { CategoriaRepo } from 'src/app/shared/repos/categorias.repository';
import { GenericService } from 'src/app/shared/service/generic.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  Categorias:any = []
  name:string="";
  editName:string="";
  search!:string
  editModal=false;
  idselected:number=-1
  constructor(
    private catRepo:CategoriaRepo,
    private ngx:ToastrService,
    private alert:AlertController,
    private categoryS:GenericService
     ) { }

  ngOnInit() {
    this.catRepo.categorias$.subscribe((res:any)=>{
      this.Categorias = res
      console.log(res);

    })
  }


  save(){
    this.categoryS.post("category",{
      name:this.name
    }).subscribe( (res:any) => {
      this.catRepo.addCategoria(res)
      this.name="",
      this.ngx.success("Nueva categoría creada")
    })
  }


  async delete(id:number){
    let alert = await this.alert.create({
    message: '¿Quieres eliminar esta categoría?',
    // message: 'Do you want delete this category?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Eliminar',
        handler: () => {
          this.categoryS.delete("category",id).subscribe( (res)=>{
            this.catRepo.deleteCategoria(id);
            this.ngx.success("Categoría ");
          })
        }
      }
    ]
  });
  alert.present();


  }

  edit(){
    const id = this.idselected;
    this.categoryS.update("category",id,{name:this.editName}).subscribe( (res)=>{
      this.catRepo.updateCategoria(id,res)
      this.editName="";
      this.ngx.success("Se editó la categoría");
      this.idselected=-1
      this.editModal=false;
    })
  }
}
