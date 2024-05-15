/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { Notification } from '../models/notification';
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
  notifications?: Array<Notification>;
  password?: string;
  phonenumber?: string;
  role?: 'EMPLOYE' | 'RRH' | 'SUP_H';
  service?: string;
  sexe?: string;
}
