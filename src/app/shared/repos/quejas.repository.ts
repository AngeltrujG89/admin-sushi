import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';

export interface Queja {
  id: number;
  active:boolean;
  updatedAt:Date
  createdAt:Date
}

export const store = createStore({ name: 'quejas' }, withEntities<Queja>());

export const quejas$ = store.pipe(selectAllEntities());

export function setQuejas(quejas: Queja[]) {
  store.update(setEntities(quejas));
}

export function addQueja(queja: Queja) {
  store.update(addEntities(queja));
}

export function updateQueja(id: Queja['id'], queja: Partial<Queja>) {
  store.update(updateEntities(id, queja));
}

export function deleteQueja(id: Queja['id']) {
  store.update(deleteEntities(id));
}
