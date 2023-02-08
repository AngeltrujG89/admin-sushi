import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Product {
  id: number;
  active: boolean,
  updatedAt: Date,
  createdAt: Date,
  name:string;
  image:string;
  price:number;
  description:string;
  maximumQuantity:number;
  tags?:string[]
  freeSides:number;
  branch?: any[];
  category: any;
  adicionales?: any[];
  sold:number
  variations?:any[];
}

 const store = createStore({ name: 'products' }, withEntities<Product>());


@Injectable({
  providedIn: 'root'
})
export class ProductRepo {
  products$ = store.pipe(selectAllEntities());

   setProducts(products: Product[]) {
    store.update(setEntities(products));
  }
  
  addProduct(product: Product) {
    store.update(addEntities(product));
  }
  
   updateProduct(id: Product['id'], product: Partial<Product>) {
    store.update(updateEntities(id, product));
  }
  
  deleteProduct(id: Product['id']) {
    store.update(deleteEntities(id));
  }
}