/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface NotificationDto {
  createdBy?: string;
  createdDate?: string;
  date?: string;
  description?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  statut?: boolean;
  utilisateur?: User;
}
