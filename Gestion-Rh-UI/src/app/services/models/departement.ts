/* tslint:disable */
/* eslint-disable */
import { Utilisateur } from '../models/utilisateur';
export interface Departement {
  createdBy?: string;
  createdDate?: string;
  id?: number;
  lastModifiedBy?: string;
  listEmploye?: Array<Utilisateur>;
  manager?: Utilisateur;
  nom?: string;
}
