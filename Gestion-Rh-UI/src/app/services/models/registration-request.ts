/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
export interface RegistrationRequest {
  address?: string;
  cin: string;
  dembauche?: string;
  departement?: Departement;
  ejuridic?: string;
  email: string;
  firstname?: string;
  img?: string;
  lastname: string;
  password: string;
  phonenumber: string;
  role?: 'EMPLOYE' | 'RRH' | 'SUP_H';
  service?: string;
  sexe: string;
}
