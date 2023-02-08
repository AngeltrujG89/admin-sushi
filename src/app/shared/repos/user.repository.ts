import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, addEntities, updateEntities, deleteEntities } from '@ngneat/elf-entities';
import { Roles } from 'src/app/enums/sockets.enum';

export interface User {
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
		wallet: number
}

export const store = createStore({ name: 'user' }, withEntities<User>());

export const user$ = store.pipe(selectAllEntities());

export function setUser(user: User[]) {
  store.update(setEntities(user));
}

export function addUser(user: User) {
  store.update(addEntities(user));
}

export function updateUser(id: User['id'], user: Partial<User>) {
  store.update(updateEntities(id, user));
}

export function deleteUser(id: User['id']) {
  store.update(deleteEntities(id));
}
