/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { User } from '../models/user';
export interface CongeDto {
  createdBy?: string;
  createdDate?: string;
  debut?: string;
  departement?: Departement;
  duree?: number;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  motif?: string;
  statut?: 'En_attente_Sup_H' | 'Refusee_Sup_H' | 'En_attente_RRH' | 'Validee' | 'Refusee';
  type?: string;
  utilisateur?: User;
}
