/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Conge } from '../models/conge';
import { Event } from '../models/event';
import { Formation } from '../models/formation';
import { getCongesByUserId } from '../fn/calendar-controller/get-conges-by-user-id';
import { GetCongesByUserId$Params } from '../fn/calendar-controller/get-conges-by-user-id';
import { getEventsByUserId } from '../fn/calendar-controller/get-events-by-user-id';
import { GetEventsByUserId$Params } from '../fn/calendar-controller/get-events-by-user-id';
import { getFormationsByUserId } from '../fn/calendar-controller/get-formations-by-user-id';
import { GetFormationsByUserId$Params } from '../fn/calendar-controller/get-formations-by-user-id';

@Injectable({ providedIn: 'root' })
export class CalendarControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getFormationsByUserId()` */
  static readonly GetFormationsByUserIdPath = '/calendar/formations/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFormationsByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFormationsByUserId$Response(params: GetFormationsByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Formation>>> {
    return getFormationsByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFormationsByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFormationsByUserId(params: GetFormationsByUserId$Params, context?: HttpContext): Observable<Array<Formation>> {
    return this.getFormationsByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Formation>>): Array<Formation> => r.body)
    );
  }

  /** Path part for operation `getEventsByUserId()` */
  static readonly GetEventsByUserIdPath = '/calendar/events/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEventsByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventsByUserId$Response(params: GetEventsByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Event>>> {
    return getEventsByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getEventsByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventsByUserId(params: GetEventsByUserId$Params, context?: HttpContext): Observable<Array<Event>> {
    return this.getEventsByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Event>>): Array<Event> => r.body)
    );
  }

  /** Path part for operation `getCongesByUserId()` */
  static readonly GetCongesByUserIdPath = '/calendar/conges/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCongesByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCongesByUserId$Response(params: GetCongesByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Conge>>> {
    return getCongesByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCongesByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCongesByUserId(params: GetCongesByUserId$Params, context?: HttpContext): Observable<Array<Conge>> {
    return this.getCongesByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Conge>>): Array<Conge> => r.body)
    );
  }

}
