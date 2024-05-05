/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add2 } from '../fn/event/add-2';
import { Add2$Params } from '../fn/event/add-2';
import { addEmployeToEvent } from '../fn/event/add-employe-to-event';
import { AddEmployeToEvent$Params } from '../fn/event/add-employe-to-event';
import { delete2 } from '../fn/event/delete-2';
import { Delete2$Params } from '../fn/event/delete-2';
import { EventDto } from '../models/event-dto';
import { findAll2 } from '../fn/event/find-all-2';
import { FindAll2$Params } from '../fn/event/find-all-2';
import { findById2 } from '../fn/event/find-by-id-2';
import { FindById2$Params } from '../fn/event/find-by-id-2';
import { update2 } from '../fn/event/update-2';
import { Update2$Params } from '../fn/event/update-2';

@Injectable({ providedIn: 'root' })
export class EventService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById2()` */
  static readonly FindById2Path = '/event/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById2()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById2$Response(params: FindById2$Params, context?: HttpContext): Observable<StrictHttpResponse<EventDto>> {
    return findById2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById2(params: FindById2$Params, context?: HttpContext): Observable<EventDto> {
    return this.findById2$Response(params, context).pipe(
      map((r: StrictHttpResponse<EventDto>): EventDto => r.body)
    );
  }

  /** Path part for operation `update2()` */
  static readonly Update2Path = '/event/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update2$Response(params: Update2$Params, context?: HttpContext): Observable<StrictHttpResponse<EventDto>> {
    return update2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update2(params: Update2$Params, context?: HttpContext): Observable<EventDto> {
    return this.update2$Response(params, context).pipe(
      map((r: StrictHttpResponse<EventDto>): EventDto => r.body)
    );
  }

  /** Path part for operation `delete2()` */
  static readonly Delete2Path = '/event/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete2()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete2$Response(params: Delete2$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete2(params: Delete2$Params, context?: HttpContext): Observable<string> {
    return this.delete2$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add2()` */
  static readonly Add2Path = '/event';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add2$Response(params: Add2$Params, context?: HttpContext): Observable<StrictHttpResponse<EventDto>> {
    return add2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add2(params: Add2$Params, context?: HttpContext): Observable<EventDto> {
    return this.add2$Response(params, context).pipe(
      map((r: StrictHttpResponse<EventDto>): EventDto => r.body)
    );
  }

  /** Path part for operation `addEmployeToEvent()` */
  static readonly AddEmployeToEventPath = '/event/addEmploye/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addEmployeToEvent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEmployeToEvent$Response(params: AddEmployeToEvent$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addEmployeToEvent(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addEmployeToEvent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEmployeToEvent(params: AddEmployeToEvent$Params, context?: HttpContext): Observable<void> {
    return this.addEmployeToEvent$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findAll2()` */
  static readonly FindAll2Path = '/event/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll2()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll2$Response(params?: FindAll2$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<EventDto>>> {
    return findAll2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll2(params?: FindAll2$Params, context?: HttpContext): Observable<Array<EventDto>> {
    return this.findAll2$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<EventDto>>): Array<EventDto> => r.body)
    );
  }

}
