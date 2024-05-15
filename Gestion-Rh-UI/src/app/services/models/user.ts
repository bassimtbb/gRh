/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
import { Notification } from '../models/notification';
export interface User {
  DEmbauche?: string;
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  address?: string;
  authorities?: Array<GrantedAuthority>;
  cin?: string;
  createdBy?: string;
  createdDate?: string;
  credentialsNonExpired?: boolean;
  dembauche?: string;
  ejuridic?: string;
  email?: string;
  enabled?: boolean;
  firstname?: string;
  id?: number;
  img?: string;
  lastModifiedBy?: string;
  lastname?: string;
  name?: string;
  notifications?: Array<Notification>;
  password?: string;
  phonenumber?: string;
  role?: 'EMPLOYE' | 'RRH' | 'SUP_H';
  service?: string;
  sexe?: string;
  username?: string;
}
