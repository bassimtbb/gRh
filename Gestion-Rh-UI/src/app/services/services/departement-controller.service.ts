/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add4 } from '../fn/departement-controller/add-4';
import { Add4$Params } from '../fn/departement-controller/add-4';
import { delete4 } from '../fn/departement-controller/delete-4';
import { Delete4$Params } from '../fn/departement-controller/delete-4';
import { DepartementDto } from '../models/departement-dto';
import { findAll4 } from '../fn/departement-controller/find-all-4';
import { FindAll4$Params } from '../fn/departement-controller/find-all-4';
import { findById4 } from '../fn/departement-controller/find-by-id-4';
import { FindById4$Params } from '../fn/departement-controller/find-by-id-4';
import { update4 } from '../fn/departement-controller/update-4';
import { Update4$Params } from '../fn/departement-controller/update-4';

@Injectable({ providedIn: 'root' })
export class DepartementControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById4()` */
  static readonly FindById4Path = '/department/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById4()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById4$Response(params: FindById4$Params, context?: HttpContext): Observable<StrictHttpResponse<DepartementDto>> {
    return findById4(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById4(params: FindById4$Params, context?: HttpContext): Observable<DepartementDto> {
    return this.findById4$Response(params, context).pipe(
      map((r: StrictHttpResponse<DepartementDto>): DepartementDto => r.body)
    );
  }

  /** Path part for operation `update4()` */
  static readonly Update4Path = '/department/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update4()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update4$Response(params: Update4$Params, context?: HttpContext): Observable<StrictHttpResponse<DepartementDto>> {
    return update4(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update4$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update4(params: Update4$Params, context?: HttpContext): Observable<DepartementDto> {
    return this.update4$Response(params, context).pipe(
      map((r: StrictHttpResponse<DepartementDto>): DepartementDto => r.body)
    );
  }

  /** Path part for operation `delete4()` */
  static readonly Delete4Path = '/department/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete4()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete4$Response(params: Delete4$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete4(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete4(params: Delete4$Params, context?: HttpContext): Observable<string> {
    return this.delete4$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add4()` */
  static readonly Add4Path = '/department';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add4()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add4$Response(params: Add4$Params, context?: HttpContext): Observable<StrictHttpResponse<DepartementDto>> {
    return add4(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add4$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add4(params: Add4$Params, context?: HttpContext): Observable<DepartementDto> {
    return this.add4$Response(params, context).pipe(
      map((r: StrictHttpResponse<DepartementDto>): DepartementDto => r.body)
    );
  }

  /** Path part for operation `findAll4()` */
  static readonly FindAll4Path = '/department/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll4()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll4$Response(params?: FindAll4$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DepartementDto>>> {
    return findAll4(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll4(params?: FindAll4$Params, context?: HttpContext): Observable<Array<DepartementDto>> {
    return this.findAll4$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DepartementDto>>): Array<DepartementDto> => r.body)
    );
  }

}
