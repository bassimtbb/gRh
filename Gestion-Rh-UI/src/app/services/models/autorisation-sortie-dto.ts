/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { User } from '../models/user';
export interface AutorisationSortieDto {
  Hretour?: string;
  Hsortie?: string;
  createdBy?: string;
  createdDate?: string;
  dateS?: string;
  departement?: Departement;
  duree?: number;
  hretour?: string;
  hsortie?: string;
  id?: number;
  isTemporaire?: boolean;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  motif?: string;
  statut?: 'En_attente_Sup_H' | 'Refusee_Sup_H' | 'En_attente_RRH' | 'Validee' | 'Refusee';
  type?: string;
  utilisateur?: User;
}
