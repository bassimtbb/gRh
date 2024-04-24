/* tslint:disable */
/* eslint-disable */
import { Utilisateur } from '../models/utilisateur';
export interface AutorisationTravailSupDto {
  createdBy?: string;
  createdDate?: string;
  date?: string;
  employe?: Utilisateur;
  hacces?: string;
  hsortie?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  motif?: string;
  statut?: 'valid' | 'pending' | 'rejected' | 'cancel';
}
