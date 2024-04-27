/* tslint:disable */
/* eslint-disable */
import { DepartementDto } from '../models/departement-dto';
import { Role } from '../models/role';
export interface UtilisateurDto {
  accountLocked?: boolean;
  adresse?: string;
  cin?: string;
  createdBy?: string;
  createdDate?: string;
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
  nom?: string;
  password?: string;
  prenom?: string;
  roles?: Array<Role>;
  service?: string;
  sexe?: string;
  telephone?: string;
  username?: string;
}
