/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { User } from '../models/user';
export interface AutorisationTravailSupDto {
  Hacces?: string;
  Hsortie?: string;
  createdBy?: string;
  createdDate?: string;
  date?: string;
  departement?: Departement;
  hacces?: string;
  hsortie?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  motif?: string;
  statut?: 'En_attente_Sup_H' | 'Refusee_Sup_H' | 'En_attente_RRH' | 'Validee' | 'Refusee';
  type?: string;
  utilisateur?: User;
}
