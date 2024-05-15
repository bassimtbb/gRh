/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface NotificationDto {
  createdBy?: string;
  createdDate?: string;
  date?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  name?: string;
  statut?: boolean;
  type?: string;
  utilisateur?: User;
}
