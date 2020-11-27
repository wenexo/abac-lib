import { AccessControlOption, HowCanDo, Permission, Policy, User } from './types';
import { AccessControlInterface, FilterInterface } from './interfaces';
import { PermissionAction } from './enums';
import { Filter } from 'classes/filter';
import hash = require('object-hash');

export class AccessControl implements AccessControlInterface {
  policy: Policy;
  filter: Filter;

  constructor(option?: AccessControlOption) {
    this.policy = {};
    this.setPolicy(option);
  }

  public setPolicy(option?: AccessControlOption): void {
    const permissions: { [name: string]: Permission } = {};
    for (const permission of option.permissions) {
      if (permission.name) permissions[permission.name] = permission;
    }

    const findPermissionByName = (name: string): Permission => {
      if (name in permissions) return permissions[name];
    };

    for (const role of option.roles) {
      this.policy[role.name] = {};
      for (const permission of role.permissions) {
        if (typeof permission === 'object') {
          this.policy[role.name][permission.name || hash(permission)] = permission;
        } else {
          this.policy[role.name][permission] = findPermissionByName(permission);
        }
      }
    }

    for (const role of option.roles) {
      const includes = role.includes;
      for (const include of includes) {
        if (include in this.policy) {
          Object.assign(this.policy[role.name], this.policy[include]);
        }
      }
    }
  }

  public how(user: User, action: PermissionAction, object: string): HowCanDo[] {
    throw new Error('Method not implemented.');
  }

  public can(user: User, action: PermissionAction, object: string, option?: HowCanDo): boolean {
    let userRoles: string[] = [];
    if (typeof (user.role || user.roles) === 'string') {
      userRoles.push((user.role || user.roles) as string);
    } else {
      userRoles = (user.role || user.roles) as string[];
    }

    return false;
  }
}
