/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { Utilisateur } from '../models/utilisateur';
export interface AutorisationSortieDto {
  createdBy?: string;
  createdDate?: string;
  dateR?: string;
  dateS?: string;
  departement?: Departement;
  duree?: number;
  hretour?: string;
  hsortie?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  motif?: string;
  statut?: 'Validee' | 'En_attente' | 'Refus\xE9e' | 'Annuler';
  temporaire?: boolean;
  type?: string;
  utilisateur?: Utilisateur;
}
