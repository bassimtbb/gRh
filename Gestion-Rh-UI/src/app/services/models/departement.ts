/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface Departement {
  createdBy?: string;
  createdDate?: string;
  id?: number;
  lastModifiedBy?: string;
  listEmploye?: Array<User>;
  manager?: User;
  name?: string;
}
