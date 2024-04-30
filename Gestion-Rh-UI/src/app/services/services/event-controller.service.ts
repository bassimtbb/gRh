/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add3 } from '../fn/event-controller/add-3';
import { Add3$Params } from '../fn/event-controller/add-3';
import { addEmployeToEvent } from '../fn/event-controller/add-employe-to-event';
import { AddEmployeToEvent$Params } from '../fn/event-controller/add-employe-to-event';
import { delete3 } from '../fn/event-controller/delete-3';
import { Delete3$Params } from '../fn/event-controller/delete-3';
import { EventDto } from '../models/event-dto';
import { findAll3 } from '../fn/event-controller/find-all-3';
import { FindAll3$Params } from '../fn/event-controller/find-all-3';
import { findById3 } from '../fn/event-controller/find-by-id-3';
import { FindById3$Params } from '../fn/event-controller/find-by-id-3';
import { update3 } from '../fn/event-controller/update-3';
import { Update3$Params } from '../fn/event-controller/update-3';

@Injectable({ providedIn: 'root' })
export class EventControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById3()` */
  static readonly FindById3Path = '/event/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById3()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById3$Response(params: FindById3$Params, context?: HttpContext): Observable<StrictHttpResponse<EventDto>> {
    return findById3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById3(params: FindById3$Params, context?: HttpContext): Observable<EventDto> {
    return this.findById3$Response(params, context).pipe(
      map((r: StrictHttpResponse<EventDto>): EventDto => r.body)
    );
  }

  /** Path part for operation `update3()` */
  static readonly Update3Path = '/event/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update3$Response(params: Update3$Params, context?: HttpContext): Observable<StrictHttpResponse<EventDto>> {
    return update3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update3(params: Update3$Params, context?: HttpContext): Observable<EventDto> {
    return this.update3$Response(params, context).pipe(
      map((r: StrictHttpResponse<EventDto>): EventDto => r.body)
    );
  }

  /** Path part for operation `delete3()` */
  static readonly Delete3Path = '/event/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete3()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete3$Response(params: Delete3$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete3(params: Delete3$Params, context?: HttpContext): Observable<string> {
    return this.delete3$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add3()` */
  static readonly Add3Path = '/event';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add3$Response(params: Add3$Params, context?: HttpContext): Observable<StrictHttpResponse<EventDto>> {
    return add3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add3(params: Add3$Params, context?: HttpContext): Observable<EventDto> {
    return this.add3$Response(params, context).pipe(
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

  /** Path part for operation `findAll3()` */
  static readonly FindAll3Path = '/event/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll3()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll3$Response(params?: FindAll3$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<EventDto>>> {
    return findAll3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll3(params?: FindAll3$Params, context?: HttpContext): Observable<Array<EventDto>> {
    return this.findAll3$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<EventDto>>): Array<EventDto> => r.body)
    );
  }

}
