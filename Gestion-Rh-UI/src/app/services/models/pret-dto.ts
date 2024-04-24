/* tslint:disable */
/* eslint-disable */
import { Utilisateur } from '../models/utilisateur';
export interface PretDto {
  createdBy?: string;
  createdDate?: string;
  credit?: string;
  employe?: Utilisateur;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  montant?: number;
  motif?: string;
  remboursement?: string;
  statut?: 'valid' | 'pending' | 'rejected' | 'cancel';
}
