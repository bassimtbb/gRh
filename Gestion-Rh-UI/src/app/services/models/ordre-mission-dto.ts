/* tslint:disable */
/* eslint-disable */
import { Utilisateur } from '../models/utilisateur';
export interface OrdreMissionDto {
  createdBy?: string;
  createdDate?: string;
  dateR?: string;
  dateS?: string;
  employe?: Utilisateur;
  hretour?: string;
  hsortie?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  motif?: string;
  statut?: 'valid' | 'pending' | 'rejected' | 'cancel';
}
