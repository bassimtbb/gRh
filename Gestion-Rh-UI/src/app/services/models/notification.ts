/* tslint:disable */
/* eslint-disable */
export interface Notification {
  createdBy?: string;
  createdDate?: string;
  description?: string;
  id?: number;
  lastModifiedBy?: string;
  statut?: boolean;
  type?: 'DEMANDE_VALIDEE_SUPH' | 'DEMANDE_VALIDEE_RRH' | 'DEMANDE_REJETEE_SUPH' | 'DEMANDE_REJETEE_RRH' | 'DEMANDE_A_DEPOSER' | 'FORMATION_INSCRIRE' | 'EVENEMENT_INSCRIRE';
}
