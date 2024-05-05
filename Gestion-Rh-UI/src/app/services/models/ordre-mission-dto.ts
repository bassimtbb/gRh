/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { Utilisateur } from '../models/utilisateur';
export interface OrdreMissionDto {
  createdBy?: string;
  createdDate?: string;
  dateR?: string;
  dateS?: string;
  departement?: Departement;
  hretour?: string;
  hsortie?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  motif?: string;
  statut?: 'Validee' | 'En_attente' | 'Refus\xE9e' | 'Annuler';
  type?: string;
  utilisateur?: Utilisateur;
}
