/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { Utilisateur } from '../models/utilisateur';
export interface AutorisationTravailSupDto {
  createdBy?: string;
  createdDate?: string;
  date?: string;
  departement?: Departement;
  hacces?: string;
  hsortie?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  motif?: string;
  statut?: 'Validee' | 'En_attente' | 'Refus\xE9e' | 'Annuler';
  type?: string;
  utilisateur?: Utilisateur;
}
