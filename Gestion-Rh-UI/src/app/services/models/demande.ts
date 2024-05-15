/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { User } from '../models/user';
export interface Demande {
  createdBy?: string;
  createdDate?: string;
  departement?: Departement;
  id?: number;
  lastModifiedBy?: string;
  statut?: 'En_attente_Sup_H' | 'Refusee_Sup_H' | 'En_attente_RRH' | 'Validee' | 'Refusee';
  type?: string;
  utilisateur?: User;
}
