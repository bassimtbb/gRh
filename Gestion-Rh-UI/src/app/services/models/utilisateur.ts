/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
export interface Utilisateur {
  adresse?: string;
  cin?: string;
  createdBy?: string;
  createdDate?: string;
  dembauche?: string;
  departement?: Departement;
  direction?: string;
  ejuridic?: string;
  email?: string;
  id?: number;
  img?: string;
  lastModifiedBy?: string;
  nom?: string;
  prenom?: string;
  service?: string;
  sexe?: string;
  telephone?: string;
}
