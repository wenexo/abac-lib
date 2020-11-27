export enum PermissionAction {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export enum PermissionScope {
  Any = 'any',
  Own = 'own',
  Other = 'other',
  Group = 'group',
  Shared = 'shared',
  Others = 'others',
}

export enum PermissionOperation {
  Count = 'count',
  Read = 'read',
  ReadOne = 'read_one',
  Create = 'create',
  CreateOne = 'create_one',
  Update = 'update',
  UpdateOne = 'update_one',
  Delete = 'delete',
  DeleteOne = 'delete_one',
  Restore = 'restore',
  RestoreOne = 'restore_one',
}
