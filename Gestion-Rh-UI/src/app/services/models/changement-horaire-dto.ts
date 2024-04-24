/* tslint:disable */
/* eslint-disable */
import { Utilisateur } from '../models/utilisateur';
export interface ChangementHoraireDto {
  ancienH?: string;
  createdBy?: string;
  createdDate?: string;
  debut?: string;
  employe?: Utilisateur;
  fin?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  motif?: string;
  nouvelH?: string;
  statut?: 'valid' | 'pending' | 'rejected' | 'cancel';
}
