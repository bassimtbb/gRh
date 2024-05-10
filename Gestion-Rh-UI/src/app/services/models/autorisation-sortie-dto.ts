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
  statut?: 'Validee' | 'En_attente' | 'Refus\xE9e' | 'Annuler';
  type?: string;
  utilisateur?: User;
}
