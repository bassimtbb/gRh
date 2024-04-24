/* tslint:disable */
/* eslint-disable */
import { Utilisateur } from '../models/utilisateur';
export interface CongeDto {
  createdBy?: string;
  createdDate?: string;
  debut?: string;
  duree?: number;
  employe?: Utilisateur;
  fin?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  reprise?: string;
  statut?: 'valid' | 'pending' | 'rejected' | 'cancel';
}
