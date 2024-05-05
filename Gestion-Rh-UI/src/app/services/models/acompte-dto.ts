/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { Utilisateur } from '../models/utilisateur';
export interface AcompteDto {
  createdBy?: string;
  createdDate?: string;
  departement?: Departement;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  montant?: number;
  statut?: 'Validee' | 'En_attente' | 'Refus\xE9e' | 'Annuler';
  type?: string;
  utilisateur?: Utilisateur;
}
