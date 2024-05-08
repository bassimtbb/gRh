/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { User } from '../models/user';
export interface PretDto {
  createdBy?: string;
  createdDate?: string;
  credit?: string;
  departement?: Departement;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  montant?: number;
  motif?: string;
  remboursement?: string;
  statut?: 'Validee' | 'En_attente' | 'Refus\xE9e' | 'Annuler';
  type?: string;
  utilisateur?: User;
}
