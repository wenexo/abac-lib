import { PermissionAction, PermissionOperation, PermissionScope } from './enums';

export type User = {
  /**
   * Example:
   * manager, org_name.admin, org_name.team.user
   * permission:product_manage, permission:org_name.article_read
   */
  [x in 'role' | 'roles']: string | string[];
} & {
  ip?: string; // regex validation needed
} & { [x in 'org' | 'organization']?: string };

export type Role = {
  name: string;
  includes?: string[]; // hierarchy roles
  permissions: Permission[] | string[];
};

export type AccessControlOption = {
  roles?: Role[];
  permissions?: Permission[];
};

export type HowCanDo = {
  scope?: PermissionScope;
  operations?: PermissionOperation[];
};

type CreatePermission = {
  action: PermissionAction.Create;
  operations?: (PermissionOperation.Create | PermissionOperation.CreateOne)[];
};

type ReadPermission = {
  action: PermissionAction.Read;
  operations?: (PermissionOperation.Count | PermissionOperation.Read | PermissionOperation.ReadOne)[];
};

type UpdatePermission = {
  action: PermissionAction.Update;
  operations?: (
    | PermissionOperation.Update
    | PermissionOperation.UpdateOne
    | PermissionOperation.Restore
    | PermissionOperation.RestoreOne
  )[];
};

type DeletePermission = {
  action: PermissionAction.Delete;
  operations?: (PermissionOperation.Delete | PermissionOperation.DeleteOne)[];
};

type BasePermission = {
  /**
   * Should generate by hash automatically if not provided
   */
  name?: string;

  /**
   * regex: (^[.]$|([a-zA-Z_$]+[.]?)+)
   */
  object: string;

  scope?: PermissionScope;

  /**
   * Default: [ '*' ]
   */
  filter?: {
    income?: string[];
    outcome: string[];
  };

  /**
   * Cron Like + Duration
   *
   * Example: *\/5 1,2,3 * * * 12m
   */
  access_time?: string;

  /**
   * IP Base
   *
   * Example: 192.168.1.0/24 or [ 192.168.1.2, 192.168.1.0/24 ]
   */
  environment?: string | string[];
};

export type Permission = BasePermission &
  (CreatePermission | ReadPermission | UpdatePermission | DeletePermission);
