import { AccessControlInterface, FilterInterface } from './interfaces';
import { AccessControlOption, HowCanDo, User } from './types';
import { PermissionAction } from './enums';

export class Filter implements FilterInterface {
  income<T = any, K = void>(entity: T): Partial<T> & K {
    throw new Error('Method not implemented.');
  }

  outcome<T = any, K = void>(entity: T): Partial<T> & K {
    throw new Error('Method not implemented.');
  }
}

export class AccessControl implements AccessControlInterface {
  filter: Filter;
  granted: boolean;

  constructor(option?: AccessControlOption) {
    this.setPolicy(option);
  }

  public setPolicy(option?: AccessControlOption): void {
    throw new Error('Method not implemented.');
  }

  public how(user: User, action: PermissionAction, object: string): HowCanDo[] {
    throw new Error('Method not implemented.');
  }

  public can(user: User, action: PermissionAction, object: string, option?: HowCanDo): boolean {
    throw new Error('Method not implemented.');
  }
}
