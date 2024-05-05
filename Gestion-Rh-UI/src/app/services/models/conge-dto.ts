/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { Utilisateur } from '../models/utilisateur';
export interface CongeDto {
  createdBy?: string;
  createdDate?: string;
  debut?: string;
  departement?: Departement;
  duree?: number;
  fin?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  reprise?: string;
  statut?: 'Validee' | 'En_attente' | 'Refus\xE9e' | 'Annuler';
  type?: string;
  utilisateur?: Utilisateur;
}
