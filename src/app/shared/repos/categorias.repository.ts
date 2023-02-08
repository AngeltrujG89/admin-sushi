import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Categoria {
  id: number;
  active: boolean,
  updatedAt: Date,
  createdAt: Date,
  name:string;
  products?: any[];
}

const store = createStore({ name: 'categorias' }, withEntities<Categoria>());



@Injectable({
  providedIn: 'root'
})
export class CategoriaRepo {

  categorias$ = store.pipe(selectAllEntities());

 setCategorias(categorias: Categoria[]) {
    store.update(setEntities(categorias));
  }
  
addCategoria(categoria: Categoria) {
    store.update(addEntities(categoria));
  }
  
 updateCategoria(id: Categoria['id'], categoria: Partial<Categoria>) {
    store.update(updateEntities(id, categoria));
  }
  
 deleteCategoria(id: Categoria['id']) {
    store.update(deleteEntities(id));
  }
  

}