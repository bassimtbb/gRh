/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
import { Utilisateur } from '../models/utilisateur';
export interface Demande {
  createdBy?: string;
  createdDate?: string;
  departement?: Departement;
  id?: number;
  isValidee?: number;
  lastModifiedBy?: string;
  statut?: 'Validee' | 'En_attente' | 'Refus\xE9e' | 'Annuler';
  type?: string;
  utilisateur?: Utilisateur;
}
