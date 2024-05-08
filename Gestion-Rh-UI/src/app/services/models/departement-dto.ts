/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface DepartementDto {
  createdBy?: string;
  createdDate?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  listEmploye?: Array<User>;
  manager?: User;
  name?: string;
}
