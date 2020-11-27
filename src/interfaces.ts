import { AccessControlOption, HowCanDo, User } from './types';
import { PermissionAction } from './enums';

export interface AccessControlInterface {
  filter: FilterInterface;

  setPolicy(option?: AccessControlOption);

  how(user: User, action: PermissionAction, object: string): HowCanDo[];
  can(user: User, action: PermissionAction, object: string, option?: HowCanDo): boolean;
}

export interface FilterInterface {
  income<T = any, K = void>(entity: T): Partial<T> & K;
  outcome<T = any, K = void>(entity: T): Partial<T> & K;
}
