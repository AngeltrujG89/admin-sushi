import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { zip } from 'rxjs';
import { Tags } from 'src/app/enums/sockets.enum';
import { AdicionalesRepo } from 'src/app/shared/repos/adicionales.repository';
import { BranchRepo } from 'src/app/shared/repos/branch.repository';
import { CategoriaRepo } from 'src/app/shared/repos/categorias.repository';
import { ProductRepo } from 'src/app/shared/repos/products.repository';
import { CompressImageService } from 'src/app/shared/service/compress-image.service';
import { GenericService } from 'src/app/shared/service/generic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  imagen:any=null;
  tags = Tags
  search=null;
  imagenEdit:any=null;
  days=false;
  Uri:string =environment.image
  Productos:any =[];
  Categorias :any=[];
  Adicionales :any=[];
  productForm!:FormGroup;
  productFormEdit!:FormGroup;
  Variation:FormGroup;
  Branchs:any = [];
  dias:any = [
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
  select="default";
  productselected:any = null;
  editOption = false;
  editSize = false;
  SizeFlag=false;
  constructor(
    private fb:FormBuilder,
    private productS:GenericService,
    private ngx:ToastrService,
    private alert:AlertController,
    private imageCompress:CompressImageService,
    private branch:BranchRepo,
    private variationS:GenericService,
    private productRepo:ProductRepo,
    private addRepo:AdicionalesRepo,
    private catRepo:CategoriaRepo
    ) {
    this.productForm = this.fb.group({
      name: [null,Validators.required],
      description: [null,Validators.required],
      category: [null,Validators.required],
      price:[null,Validators.required],
      tags: [[]],
      freeSides:[0],
      branch:[null,Validators.required],
      adicionales:[]
    })

    this.Variation = this.fb.group({
      name:[null,Validators.required],
      description:[null,Validators.required],
      price:[null,Validators.required],
      image:[null]
    })
    this.productFormEdit = this.fb.group({
      id:[null,Validators.required],
      name: [null,Validators.required],
      description: [null,Validators.required],
      category: [null,Validators.required],
      price:[null,Validators.required],
      freeSides:[null,Validators.required],
      tags:[null],
      branch: [null,Validators.required],
      adicionales:[null],
    })


  }

  ngOnInit() {
    const Llamados$ = zip(
      this.variationS.getAll("branch"),

      this.catRepo.categorias$
    )
    Llamados$.subscribe((res:any) => {
      this.Branchs = res[0];
      this.Categorias= res[1];

    })
    this.productRepo.products$.subscribe(res => {
      this.Productos = res;
    })
  }


  asignForm(item:any){
    console.log(item);
    const branch:any = []
    const adicionales:any = []
    item.branch.forEach((element:any) => {
      branch.push(element.id)
    })
    if(item.adicionales){
      item.adicionales.forEach((element:any) => {
        adicionales.push(element.id)
      })
    }

    console.log(branch,adicionales);


    this.productFormEdit.setValue({
      id:item.id,
      name: item.name,
      description: item.description,
      category: item.category.id,
      price:item.price,
      freeSides:item.freeSides,
      tags:item.tags,
      branch: branch,
      adicionales:adicionales,
    })
  }

  async image(edit:boolean=false,variation:boolean= false){
   if(edit && !variation){
    this.imagenEdit = await this.imageCompress.returnImageCompress();
   }
   else if(!edit && variation){
    this.imageVariation = await this.imageCompress.returnImageCompress();
   }
   else{
    this.imagen = await this.imageCompress.returnImageCompress();
   }
  }


  save(){
    const form = new FormData();
    const product = this.productForm.value;
    form.append('name',product.name)
    form.append('description',product.description)
    form.append('price',product.price)
    form.append('freeSides',product.freeSides.toString())
    if(product.tags){
      form.append('tags',product.tags?.toString())
    }
    if(this.imagen){
      form.append('image', this.imagen)
    }

    form.append('branch',product.branch.toString())
    form.append('adicionales',product.adicionales)
    form.append('category',product.category.toString())
    this.productS.postWhitImage("product",form).subscribe((res:any) =>{
      const form = new FormData();
      form.append('product',res.id)
      form.append('name',product.name)
      form.append('price',product.price)
      if(this.imagen){
        form.append('image', this.imagen)
      }
      this.productS.postWhitImage("variations",form).subscribe((resto:any)=> {
          res.variations = [resto]
          console.log(res);
        this.productRepo.addProduct(res);
        this.productForm.reset({
          branch:[],
          adicionales:[]
        }
        )
        this.imagen=null;
        this.ngx.success("Product saved")
      })


    })

  }

  update(){
    const form = new FormData();
    const product = this.productFormEdit.value;
    form.append('name',product.name)
    form.append('description',product.description)
    form.append('price',product.price)
    form.append('freeSides',product.freeSides.toString())
    if(product.tags){
      form.append('tags',product.tags?.toString())
    }
    if(this.imagenEdit){
      form.append('image', this.imagenEdit)
    }
    form.append('branch',product.branch)
    form.append('adicionales',product.adicionales)
    form.append('category',product.category.toString())
    this.productS.updateWhitImage("product",product.id,form).subscribe((res:any) =>{
      this.productRepo.updateProduct(res.id,res);
      this.productForm.reset({
        branch:[],
        adicionales:[]
      }
      )
      this.imagenEdit=null;
      this.ngx.success("Product saved")
    })
  }


  async delete(id:number){
    let alert = await this.alert.create({
      message: 'Do you want delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'delete',
          handler: () => {
            this.productS.delete("product",id).subscribe( res =>{
              this.ngx.success("Product deleted")
              this.Productos=this.Productos.filter((p:any) => p.id !==id)
            })
          }
        }
      ]
    });
    alert.present();

  }
editProduct=false;




  changeStatus(data:any){
    this.productS.update("product",data.id,{active:!data.active}).subscribe(res =>{
      this.productRepo.updateProduct(data.id,res)
      this.ngx.success("Product edited")
    })
  }


  assign(name:string,event:any,type:string){

    if(type==="OPEN"){
      this.dias = this.dias.map((d:any)=> d.name ===name ? {...d,open:event.detail.value}:d)
    }else{

      this.dias = this.dias.map((d:any)=> d.name ===name ? {...d,close:event.detail.value}:d)
    }

  }



id:number=-1
  editarDias=false;
  asignarDias(id:number,dias:any){
    this.id = id
    if(dias && dias.length >0 ){
      this.dias=dias
      this.editarDias=true;
    }else{
      this.editarDias=false
    }
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

  imageVariation!:any
  saveVariation(){
    const form = new FormData();
    const product = this.Variation.value;
    form.append('name',product.name)
    form.append('price',product.price)
    if(this.imageVariation){
      form.append('image', this.imageVariation)
    }
    form.append('product',this.productselected.id)
    this.productS.postWhitImage("variations",form).subscribe((res:any) =>{
      this.productselected.variations.push(res)
      this.productRepo.updateProduct(this.productselected.id,this.productselected);
      this.Variation.reset({

      });
      this.editOption=false;
      this.imageVariation=null;
      this.ngx.success("Variations saved")
    })
  }

}
