/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { User } from '../models/user';
export interface DemandeDto {
  createdBy?: string;
  createdDate?: string;
  departement?: Departement;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  statut?: 'Validee' | 'En_attente' | 'Refus\xE9e' | 'Annuler';
  type?: string;
  utilisateur?: User;
}
