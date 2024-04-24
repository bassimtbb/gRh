/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { GrantedAuthority } from '../models/granted-authority';
import { Role } from '../models/role';
export interface Utilisateur {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  adresse?: string;
  authorities?: Array<GrantedAuthority>;
  cin?: string;
  createdBy?: string;
  createdDate?: string;
  credentialsNonExpired?: boolean;
  dembauche?: string;
  departement?: Departement;
  direction?: string;
  ejuridic?: string;
  email?: string;
  enabled?: boolean;
  fullName?: string;
  id?: number;
  img?: string;
  lastModifiedBy?: string;
  name?: string;
  nom?: string;
  password?: string;
  prenom?: string;
  roles?: Array<Role>;
  service?: string;
  sexe?: string;
  telephone?: string;
  username?: string;
}
