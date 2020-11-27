import { PrivilegeInterface } from 'interfaces';
import { Permission } from 'types';
import { Filter } from './filter';

export class Privilege implements PrivilegeInterface {
  filter: Filter;
  granted: boolean;

  constructor(granted: boolean, permissions: Permission[]) {
    this.granted = granted;
    this.filter = new Filter(permissions);
  }
}
