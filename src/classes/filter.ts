import { FilterInterface } from 'interfaces';
import { Permission } from 'types';

export class Filter implements FilterInterface {
  protected permissions: Permission[];

  constructor(permissions: Permission[]) {
    this.permissions = permissions;
  }

  income<T = any, K = void>(entity: T): Partial<T> & K {
    throw new Error('Method not implemented.');
  }

  outcome<T = any, K = void>(entity: T): Partial<T> & K {
    throw new Error('Method not implemented.');
  }
}
