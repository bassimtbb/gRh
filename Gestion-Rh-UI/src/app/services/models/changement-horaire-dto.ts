/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { Utilisateur } from '../models/utilisateur';
export interface ChangementHoraireDto {
  AncienH?: string;
  NouvelH?: string;
  ancienH?: string;
  createdBy?: string;
  createdDate?: string;
  debut?: string;
  departement?: Departement;
  fin?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  motif?: string;
  nouvelH?: string;
  statut?: 'Validee' | 'En_attente' | 'Refus\xE9e' | 'Annuler';
  type?: string;
  utilisateur?: Utilisateur;
}
