/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add8 } from '../fn/pret/add-8';
import { Add8$Params } from '../fn/pret/add-8';
import { delete8 } from '../fn/pret/delete-8';
import { Delete8$Params } from '../fn/pret/delete-8';
import { findAll8 } from '../fn/pret/find-all-8';
import { FindAll8$Params } from '../fn/pret/find-all-8';
import { findById8 } from '../fn/pret/find-by-id-8';
import { FindById8$Params } from '../fn/pret/find-by-id-8';
import { PretDto } from '../models/pret-dto';
import { update8 } from '../fn/pret/update-8';
import { Update8$Params } from '../fn/pret/update-8';

@Injectable({ providedIn: 'root' })
export class PretService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById8()` */
  static readonly FindById8Path = '/Pret/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById8()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById8$Response(params: FindById8$Params, context?: HttpContext): Observable<StrictHttpResponse<PretDto>> {
    return findById8(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById8(params: FindById8$Params, context?: HttpContext): Observable<PretDto> {
    return this.findById8$Response(params, context).pipe(
      map((r: StrictHttpResponse<PretDto>): PretDto => r.body)
    );
  }

  /** Path part for operation `update8()` */
  static readonly Update8Path = '/Pret/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update8()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update8$Response(params: Update8$Params, context?: HttpContext): Observable<StrictHttpResponse<PretDto>> {
    return update8(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update8$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update8(params: Update8$Params, context?: HttpContext): Observable<PretDto> {
    return this.update8$Response(params, context).pipe(
      map((r: StrictHttpResponse<PretDto>): PretDto => r.body)
    );
  }

  /** Path part for operation `delete8()` */
  static readonly Delete8Path = '/Pret/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete8()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete8$Response(params: Delete8$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete8(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete8(params: Delete8$Params, context?: HttpContext): Observable<string> {
    return this.delete8$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add8()` */
  static readonly Add8Path = '/Pret';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add8()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add8$Response(params: Add8$Params, context?: HttpContext): Observable<StrictHttpResponse<PretDto>> {
    return add8(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add8$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add8(params: Add8$Params, context?: HttpContext): Observable<PretDto> {
    return this.add8$Response(params, context).pipe(
      map((r: StrictHttpResponse<PretDto>): PretDto => r.body)
    );
  }

  /** Path part for operation `findAll8()` */
  static readonly FindAll8Path = '/Pret/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll8()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll8$Response(params?: FindAll8$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PretDto>>> {
    return findAll8(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll8(params?: FindAll8$Params, context?: HttpContext): Observable<Array<PretDto>> {
    return this.findAll8$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PretDto>>): Array<PretDto> => r.body)
    );
  }

}
