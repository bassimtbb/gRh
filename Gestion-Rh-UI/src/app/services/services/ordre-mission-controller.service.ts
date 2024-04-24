/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add9 } from '../fn/ordre-mission-controller/add-9';
import { Add9$Params } from '../fn/ordre-mission-controller/add-9';
import { delete9 } from '../fn/ordre-mission-controller/delete-9';
import { Delete9$Params } from '../fn/ordre-mission-controller/delete-9';
import { findAll9 } from '../fn/ordre-mission-controller/find-all-9';
import { FindAll9$Params } from '../fn/ordre-mission-controller/find-all-9';
import { findById9 } from '../fn/ordre-mission-controller/find-by-id-9';
import { FindById9$Params } from '../fn/ordre-mission-controller/find-by-id-9';
import { OrdreMissionDto } from '../models/ordre-mission-dto';
import { update9 } from '../fn/ordre-mission-controller/update-9';
import { Update9$Params } from '../fn/ordre-mission-controller/update-9';

@Injectable({ providedIn: 'root' })
export class OrdreMissionControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById9()` */
  static readonly FindById9Path = '/OrdreMission/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById9()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById9$Response(params: FindById9$Params, context?: HttpContext): Observable<StrictHttpResponse<OrdreMissionDto>> {
    return findById9(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById9(params: FindById9$Params, context?: HttpContext): Observable<OrdreMissionDto> {
    return this.findById9$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrdreMissionDto>): OrdreMissionDto => r.body)
    );
  }

  /** Path part for operation `update9()` */
  static readonly Update9Path = '/OrdreMission/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update9()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update9$Response(params: Update9$Params, context?: HttpContext): Observable<StrictHttpResponse<OrdreMissionDto>> {
    return update9(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update9$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update9(params: Update9$Params, context?: HttpContext): Observable<OrdreMissionDto> {
    return this.update9$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrdreMissionDto>): OrdreMissionDto => r.body)
    );
  }

  /** Path part for operation `delete9()` */
  static readonly Delete9Path = '/OrdreMission/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete9()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete9$Response(params: Delete9$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete9(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete9(params: Delete9$Params, context?: HttpContext): Observable<string> {
    return this.delete9$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add9()` */
  static readonly Add9Path = '/OrdreMission';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add9()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add9$Response(params: Add9$Params, context?: HttpContext): Observable<StrictHttpResponse<OrdreMissionDto>> {
    return add9(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add9$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add9(params: Add9$Params, context?: HttpContext): Observable<OrdreMissionDto> {
    return this.add9$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrdreMissionDto>): OrdreMissionDto => r.body)
    );
  }

  /** Path part for operation `findAll9()` */
  static readonly FindAll9Path = '/OrdreMission/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll9()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll9$Response(params?: FindAll9$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrdreMissionDto>>> {
    return findAll9(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll9(params?: FindAll9$Params, context?: HttpContext): Observable<Array<OrdreMissionDto>> {
    return this.findAll9$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrdreMissionDto>>): Array<OrdreMissionDto> => r.body)
    );
  }

}
