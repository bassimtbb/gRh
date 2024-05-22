// notification.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private reloadNotificationSource = new Subject<void>();
  reloadNotification$ = this.reloadNotificationSource.asObservable();

  triggerReloadNotification() {
    this.reloadNotificationSource.next();
  }
}