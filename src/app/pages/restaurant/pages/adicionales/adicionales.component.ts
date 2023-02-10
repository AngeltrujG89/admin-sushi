import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdicionalesRepo } from 'src/app/shared/repos/adicionales.repository';
import { GenericService } from 'src/app/shared/service/generic.service';


@Component({
  selector: 'app-adicionales',
  templateUrl: './adicionales.component.html',
  styleUrls: ['./adicionales.component.scss'],
})
export class AdicionalesComponent implements OnInit {

   Adicional:any = [];

  name=null;
  price=null;
  nameEdit=null;
  priceEdit=null;
  canFree=false;
  canFreeEdit=false;
  editAdd=false;
  products:any =[];
  productsEdit:any=[];
  constructor(
    private adicionalS:GenericService,
    private ngx:ToastrService,
    private addRepo:AdicionalesRepo
  ) { }

  ngOnInit() {
    this.addRepo.adicionales$.subscribe((res:any) => {
      this.Adicional = res;
    })
  }



  create(){

    this.adicionalS.post("adicionales",{name:this.name,price:this.price,canFree:this.canFree}).subscribe( (res:any) =>{
      this.addRepo.addAdicionale(res);
      this.name=null;
      this.price=null;
      this.canFree=false;
      this.ngx.success("Adicional guardado");
    })
  }

  delete(id:number){
    this.adicionalS.delete("adicionales",id).subscribe(res =>{
      this.addRepo.deleteAdicionale(id);
      this.ngx.success("Adicional eliminado")
    })
  }


  edit(){
    this.adicionalS.update("adicionales",this.idEdit,{id:this.idEdit,name:this.nameEdit,price:this.priceEdit,canFree:this.canFreeEdit}).subscribe( (res:any) =>{
      this.addRepo.updateAdicionale(this.idEdit,res);
      this.idEdit=-1;
      this.nameEdit=null;
      this.ngx.success("Adicional actualizado")
      this.priceEdit=null;
      this.editAdd=false;
      this.canFreeEdit=false;
      this.productsEdit=[];
    })
  }

  idEdit=-1
  assignEdit(aditional:any){
    this.nameEdit=aditional.name;
    this.priceEdit=aditional.price;
    this.idEdit = aditional.id;
    this.canFreeEdit=aditional.canFree;
    aditional.products.forEach((element:any) => {
      this.productsEdit.push(element.id)
    });
  }
  search!:string
  activeDesactive(id:number){
    const add:any = this.Adicional.find( (d:any) => d.id === id );
    this.adicionalS.update("adicionales",id,{active:!add.active}).subscribe( (res:any) =>{
      this.addRepo.updateAdicionale(id,res);
    if(res.active){
      this.ngx.success("Adicional activado")
    }else{
      this.ngx.success("Adicional desactivado")
    }
    })
  }

}
