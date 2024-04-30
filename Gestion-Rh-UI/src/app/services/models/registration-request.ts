/* tslint:disable */
/* eslint-disable */
import { Departement } from '../models/departement';
export interface RegistrationRequest {
  adresse?: string;
  cin: string;
  dembauche?: string;
  departement?: Departement;
  direction: string;
  ejuridic?: string;
  email: string;
  firstname?: string;
  img?: string;
  lastname: string;
  password: string;
  service: string;
  sexe: string;
  telephone: string;
  username: string;
}
