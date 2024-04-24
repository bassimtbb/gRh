/* tslint:disable */
/* eslint-disable */
import { Utilisateur } from '../models/utilisateur';
export interface AcompteDto {
  createdBy?: string;
  createdDate?: string;
  employe?: Utilisateur;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  montant?: number;
  statut?: 'valid' | 'pending' | 'rejected' | 'cancel';
}
