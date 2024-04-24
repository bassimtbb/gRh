/* tslint:disable */
/* eslint-disable */
import { DepartementDto } from '../models/departement-dto';
import { GrantedAuthority } from '../models/granted-authority';
import { Role } from '../models/role';
export interface UtilisateurDto {
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
  departement?: DepartementDto;
  direction?: string;
  ejuridic?: string;
  email?: string;
  enabled?: boolean;
  id?: number;
  img?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
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
