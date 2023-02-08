/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { GenericService } from 'src/app/shared/service/generic.service';
import { ProductRepo } from 'src/app/shared/repos/products.repository';
import { AdicionalesRepo } from 'src/app/shared/repos/adicionales.repository';
import { CategoriaRepo } from 'src/app/shared/repos/categorias.repository';
import { zip } from 'rxjs';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  constructor(
    private genericS:GenericService,
    private productRepo:ProductRepo,
    private addRepo:AdicionalesRepo,
    private catRepo:CategoriaRepo
               ) {
  }

  ngOnInit() {
    const Llamados$ = zip(
      this.genericS.getAll("product"),
      this.genericS.getAll("adicionales"),
      this.genericS.getAll("category")
    )
    Llamados$.subscribe((res:any) => {
      console.log(res);
      
      this.productRepo.setProducts(res[0]);
      this.addRepo.setAdicionales(res[1]);
      this.catRepo.setCategorias(res[2])
    })
  }
ionViewWillEnter(){
  }
  categoria:boolean=true
  producto:boolean=false;
  adicional:boolean=false;
  select(key:string){

    switch (key) {
      case 'cat':
        this.categoria=true;
        this.producto=false;
        this.adicional=false;
        break;

        case 'prod':
          this.categoria=false;
          this.producto=true;
          this.adicional=false;
          break;

          case 'add':
            this.categoria=false;
            this.producto=false;
            this.adicional=true;
            break;

      default:
        break;
    }

  }



}
