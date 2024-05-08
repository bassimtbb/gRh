/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { User } from '../models/user';
export interface AutorisationTeletravailDto {
  contact?: string;
  createdBy?: string;
  createdDate?: string;
  debut?: string;
  departement?: Departement;
  fin?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  lieu?: string;
  statut?: 'Validee' | 'En_attente' | 'Refus\xE9e' | 'Annuler';
  tache?: string;
  telephone?: string;
  type?: string;
  utilisateur?: User;
}
