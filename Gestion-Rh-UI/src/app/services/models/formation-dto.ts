/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface FormationDto {
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
  listEmploye?: Array<User>;
  nbrPlace?: number;
  titre?: string;
}
