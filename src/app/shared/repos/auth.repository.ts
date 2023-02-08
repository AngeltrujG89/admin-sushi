import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';
import { Roles } from 'src/app/enums/sockets.enum';

export interface Auth {
  id: number;
  active: boolean,
  updatedAt: Date,
  createdAt: Date,
  names: string,
  phone: string | null,
  email: string,
  role: Roles,
  notificationsEnabled: boolean,
  image: string | null,
  googleAccess: string | null,
  facebookAccess: string | null,
  pendingOrder: boolean,
  birthday: null,
  mobileToken: string | null,
  wallet: number,
  branch?:any,
  orders?:any,
  address?:any

}

 const store = createStore({ name: 'auth' }, withEntities<Auth>());


@Injectable({ providedIn: 'root'})
export class AuthRepo {

  auth$ = store.pipe(selectAllEntities());

    setAuth(auth: Auth[]) {
    store.update(setEntities(auth));
  }
  
   addAuth(auth: Auth) {
    store.update(addEntities(auth));
  }
  
   updateAuth(id: Auth['id'], auth: Partial<Auth>) {
    store.update(updateEntities(id, auth));
  }
  
   deleteAuth(id: Auth['id']) {
    store.update(deleteEntities(id));
  }
}
