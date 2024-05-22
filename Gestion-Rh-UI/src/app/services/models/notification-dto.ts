/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface NotificationDto {
  createdBy?: string;
  createdDate?: string;
  description?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  owner?: User;
  statut?: boolean;
  type?: 'DEMANDE_VALIDEE_SUPH' | 'DEMANDE_VALIDEE_RRH' | 'DEMANDE_REJETEE_SUPH' | 'DEMANDE_REJETEE_RRH' | 'DEMANDE_A_DEPOSER' | 'FORMATION_INSCRIRE' | 'EVENEMENT_INSCRIRE';
}
