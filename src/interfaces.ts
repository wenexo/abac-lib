import { AccessControlOption, CanOption, User } from './types';
import { PermissionAction } from './enums';

export interface AccessControlInterface {
  setPolicy(option?: AccessControlOption);

  can(user: User, action: PermissionAction, object: string, option?: CanOption): PrivilegeInterface;
}

export interface FilterInterface {
  income<T = any, K = void>(entity: T): Partial<T> & K;
  outcome<T = any, K = void>(entity: T): Partial<T> & K;
}

export interface PrivilegeInterface {
  granted: boolean;
  filter: FilterInterface;
}
