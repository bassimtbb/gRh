/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add1 } from '../fn/notification/add-1';
import { Add1$Params } from '../fn/notification/add-1';
import { delete1 } from '../fn/notification/delete-1';
import { Delete1$Params } from '../fn/notification/delete-1';
import { findAll1 } from '../fn/notification/find-all-1';
import { FindAll1$Params } from '../fn/notification/find-all-1';
import { findById1 } from '../fn/notification/find-by-id-1';
import { FindById1$Params } from '../fn/notification/find-by-id-1';
import { getNotificationByStatut } from '../fn/notification/get-notification-by-statut';
import { GetNotificationByStatut$Params } from '../fn/notification/get-notification-by-statut';
import { Notification } from '../models/notification';
import { NotificationDto } from '../models/notification-dto';
import { sendNotif } from '../fn/notification/send-notif';
import { SendNotif$Params } from '../fn/notification/send-notif';
import { setStatut } from '../fn/notification/set-statut';
import { SetStatut$Params } from '../fn/notification/set-statut';
import { update1 } from '../fn/notification/update-1';
import { Update1$Params } from '../fn/notification/update-1';

@Injectable({ providedIn: 'root' })
export class NotificationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById1()` */
  static readonly FindById1Path = '/notification/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1$Response(params: FindById1$Params, context?: HttpContext): Observable<StrictHttpResponse<NotificationDto>> {
    return findById1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1(params: FindById1$Params, context?: HttpContext): Observable<NotificationDto> {
    return this.findById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<NotificationDto>): NotificationDto => r.body)
    );
  }

  /** Path part for operation `update1()` */
  static readonly Update1Path = '/notification/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update1$Response(params: Update1$Params, context?: HttpContext): Observable<StrictHttpResponse<NotificationDto>> {
    return update1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update1(params: Update1$Params, context?: HttpContext): Observable<NotificationDto> {
    return this.update1$Response(params, context).pipe(
      map((r: StrictHttpResponse<NotificationDto>): NotificationDto => r.body)
    );
  }

  /** Path part for operation `delete1()` */
  static readonly Delete1Path = '/notification/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete1()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete1$Response(params: Delete1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete1(params: Delete1$Params, context?: HttpContext): Observable<string> {
    return this.delete1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add1()` */
  static readonly Add1Path = '/notification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add1$Response(params: Add1$Params, context?: HttpContext): Observable<StrictHttpResponse<NotificationDto>> {
    return add1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add1(params: Add1$Params, context?: HttpContext): Observable<NotificationDto> {
    return this.add1$Response(params, context).pipe(
      map((r: StrictHttpResponse<NotificationDto>): NotificationDto => r.body)
    );
  }

  /** Path part for operation `setStatut()` */
  static readonly SetStatutPath = '/notification/statut/{notificationID}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setStatut()` instead.
   *
   * This method doesn't expect any request body.
   */
  setStatut$Response(params: SetStatut$Params, context?: HttpContext): Observable<StrictHttpResponse<NotificationDto>> {
    return setStatut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setStatut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setStatut(params: SetStatut$Params, context?: HttpContext): Observable<NotificationDto> {
    return this.setStatut$Response(params, context).pipe(
      map((r: StrictHttpResponse<NotificationDto>): NotificationDto => r.body)
    );
  }

  /** Path part for operation `sendNotif()` */
  static readonly SendNotifPath = '/notification/SendNotif/{userID}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendNotif()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendNotif$Response(params: SendNotif$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return sendNotif(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendNotif$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendNotif(params: SendNotif$Params, context?: HttpContext): Observable<void> {
    return this.sendNotif$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getNotificationByStatut()` */
  static readonly GetNotificationByStatutPath = '/notification/statut';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNotificationByStatut()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNotificationByStatut$Response(params: GetNotificationByStatut$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Notification>>> {
    return getNotificationByStatut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getNotificationByStatut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNotificationByStatut(params: GetNotificationByStatut$Params, context?: HttpContext): Observable<Array<Notification>> {
    return this.getNotificationByStatut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Notification>>): Array<Notification> => r.body)
    );
  }

  /** Path part for operation `findAll1()` */
  static readonly FindAll1Path = '/notification/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll1$Response(params?: FindAll1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NotificationDto>>> {
    return findAll1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll1(params?: FindAll1$Params, context?: HttpContext): Observable<Array<NotificationDto>> {
    return this.findAll1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<NotificationDto>>): Array<NotificationDto> => r.body)
    );
  }

}
