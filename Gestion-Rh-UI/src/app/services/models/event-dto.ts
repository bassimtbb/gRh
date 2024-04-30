/* tslint:disable */
/* eslint-disable */
import { Utilisateur } from '../models/utilisateur';
export interface EventDto {
  createdBy?: string;
  createdDate?: string;
  dateD?: string;
  dateF?: string;
  description?: string;
  duree?: number;
  id?: number;
  img?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  lieu?: string;
  listEmploye?: Array<Utilisateur>;
  nbrPlace?: number;
  titre?: string;
}
