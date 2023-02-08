import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Branch {
  id: number;
  active:boolean;
  updatedAt:Date;
  createdAt:Date;
  name:string;
  address:any;
  phone:string;
  shippingCost:number | null;
  minimumCost:number| null;
  deliveryType:string;
  paymentMethod:string;
  online:boolean
  rate:number;
  image:string | null;
  products: any[];
  dias:any[]

}


export const store = createStore({ name: 'branch' },withEntities<Branch>());



@Injectable({
  providedIn: 'root'
})
export class BranchRepo {
  branch$ = store.pipe(selectAllEntities());

   setBranch(branch: Branch[]) {
    store.update(setEntities(branch));
   }
  
   addBranch(branch: Branch) {
    store.update(addEntities(branch));
    }
  
   updateBranch(id: Branch['id'], branch: Partial<Branch>) {
    store.update(updateEntities(id, branch));
   }
  
   deleteBranch(id: Branch['id']) {
    store.update(deleteEntities(id));
    }
}
