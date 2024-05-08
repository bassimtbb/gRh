/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
export interface UserDto {
  DEmbauche?: string;
  accountLocked?: boolean;
  address?: string;
  cin?: string;
  createdBy?: string;
  createdDate?: string;
  dembauche?: string;
  departement?: Departement;
  ejuridic?: string;
  email?: string;
  enabled?: boolean;
  firstname?: string;
  id?: number;
  img?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  lastname?: string;
  password?: string;
  phonenumber?: string;
  role?: 'EMPLOYE' | 'RRH' | 'SUP_H';
  service?: string;
  sexe?: string;
}
