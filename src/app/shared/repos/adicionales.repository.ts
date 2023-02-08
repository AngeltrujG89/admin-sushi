import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Adicionales {
  id: number;
  name:string;
  active: boolean,
  updatedAt: Date,
  createdAt: Date,
  price:number;
  products: any;
  sold:number;
  canFree:boolean;
}
 const store = createStore({ name: 'adicionales' }, withEntities<Adicionales>());


@Injectable({ providedIn: 'root'})
export class AdicionalesRepo {

 adicionales$ = store.pipe(selectAllEntities());
  
  setAdicionales(adicionales: Adicionales[]) {
    store.update(setEntities(adicionales));
  }
  
  addAdicionale(adicionale: Adicionales) {
    store.update(addEntities(adicionale));
  }
  
  updateAdicionale(id: Adicionales['id'], adicionale: Partial<Adicionales>) {
    store.update(updateEntities(id, adicionale));
  }
  
deleteAdicionale(id: Adicionales['id']) {
    store.update(deleteEntities(id));
  }
}
