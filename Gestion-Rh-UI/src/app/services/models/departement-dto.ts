/* tslint:disable */
/* eslint-disable */
import { UserDto } from '../models/user-dto';
export interface DepartementDto {
  createdBy?: string;
  createdDate?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  listEmploye?: Array<UserDto>;
  manager?: UserDto;
  name?: string;
}
