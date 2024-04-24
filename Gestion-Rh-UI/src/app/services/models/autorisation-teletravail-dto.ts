/* tslint:disable */
/* eslint-disable */
import { Utilisateur } from '../models/utilisateur';
export interface AutorisationTeletravailDto {
  contact?: string;
  createdBy?: string;
  createdDate?: string;
  debut?: string;
  employe?: Utilisateur;
  fin?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  lieu?: string;
  statut?: 'valid' | 'pending' | 'rejected' | 'cancel';
  tache?: string;
  telephone?: string;
}
