import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Order {
  id:number
  products:any[]
  subtotal:number
  total:number;
  moneyUsed:number;
  comentarioBranch:string;
  comentarioDeliveryman:string;
  paymentPay:string;
  idPay:string;
  status:string;
  ordena_recoje:boolean;
  pagado:boolean;
  pin:string;
  branch: any;
  delivery : any;
  user : any;
  address: any;
  active:boolean;
  updatedAt:Date
  createdAt:Date
}

const store = createStore({ name: 'orders' }, withEntities<Order>());



@Injectable({
  providedIn: 'root'
})
export class OrderRepo {

orders$ = store.pipe(selectAllEntities());

setOrders(orders: Order[]) {
  store.update(setEntities(orders));
}

addOrder(order: Order) {
  store.update(addEntities(order));
}

 updateOrder(id: Order['id'], order: Partial<Order>) {
  store.update(updateEntities(id, order));
}

deleteOrder(id: Order['id']) {
  store.update(deleteEntities(id));
}
}
