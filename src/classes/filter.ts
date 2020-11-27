import { FilterInterface } from 'interfaces';

export class Filter implements FilterInterface {
  income<T = any, K = void>(entity: T): Partial<T> & K {
    throw new Error('Method not implemented.');
  }
  outcome<T = any, K = void>(entity: T): Partial<T> & K {
    throw new Error('Method not implemented.');
  }
}
