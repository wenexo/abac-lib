import { AccessControlOption, CanOption, Permission, Policy, User } from './types';
import { AccessControlInterface } from './interfaces';
import { Privilege } from 'classes/privilage';
import { PermissionAction } from './enums';
import hash = require('object-hash');

export class AccessControl implements AccessControlInterface {
  protected policy: Policy;

  constructor(option?: AccessControlOption) {
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

  public getUserRoles(user: User): string[] {
    let roles: string[] = [];

    if (typeof (user.role || user.roles) === 'string') {
      roles.push((user.role || user.roles) as string);
    } else {
      roles = (user.role || user.roles) as string[];
    }

    if (user.org || user.organization) {
      const organization = user.org || user.organization;
      for (let i = 0; i < roles.length; i++) {
        if (!roles[i].startsWith(organization)) {
          roles.splice(i, 1);
        }
      }
    } else {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].includes('.')) {
          roles.splice(i, 1);
        }
      }
    }

    return roles;
  }

  public can(user: User, action: PermissionAction, object: string, option?: CanOption): Privilege {
    const granted: boolean = false;

    const permissions: Permission[] = [];
    for (const role of this.getUserRoles(user)) {
      if (role in this.policy) {
        for (const permission in this.policy[role]) {
          if (this.policy[role][permission].object.startsWith(object)) {
            permissions.push(this.policy[role][permission]);
          }
        }
      }
    }

    return new Privilege(granted, permissions);
  }
}
