/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AcompteDto } from '../models/acompte-dto';
import { add5 } from '../fn/acompte/add-5';
import { Add5$Params } from '../fn/acompte/add-5';
import { delete5 } from '../fn/acompte/delete-5';
import { Delete5$Params } from '../fn/acompte/delete-5';
import { findAll5 } from '../fn/acompte/find-all-5';
import { FindAll5$Params } from '../fn/acompte/find-all-5';
import { findById5 } from '../fn/acompte/find-by-id-5';
import { FindById5$Params } from '../fn/acompte/find-by-id-5';
import { update5 } from '../fn/acompte/update-5';
import { Update5$Params } from '../fn/acompte/update-5';

@Injectable({ providedIn: 'root' })
export class AcompteService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById5()` */
  static readonly FindById5Path = '/acompte/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById5()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById5$Response(params: FindById5$Params, context?: HttpContext): Observable<StrictHttpResponse<AcompteDto>> {
    return findById5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById5(params: FindById5$Params, context?: HttpContext): Observable<AcompteDto> {
    return this.findById5$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcompteDto>): AcompteDto => r.body)
    );
  }

  /** Path part for operation `update5()` */
  static readonly Update5Path = '/acompte/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update5()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update5$Response(params: Update5$Params, context?: HttpContext): Observable<StrictHttpResponse<AcompteDto>> {
    return update5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update5$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update5(params: Update5$Params, context?: HttpContext): Observable<AcompteDto> {
    return this.update5$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcompteDto>): AcompteDto => r.body)
    );
  }

  /** Path part for operation `delete5()` */
  static readonly Delete5Path = '/acompte/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete5()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete5$Response(params: Delete5$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete5(params: Delete5$Params, context?: HttpContext): Observable<string> {
    return this.delete5$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add5()` */
  static readonly Add5Path = '/acompte';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add5()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add5$Response(params: Add5$Params, context?: HttpContext): Observable<StrictHttpResponse<AcompteDto>> {
    return add5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add5$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add5(params: Add5$Params, context?: HttpContext): Observable<AcompteDto> {
    return this.add5$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcompteDto>): AcompteDto => r.body)
    );
  }

  /** Path part for operation `findAll5()` */
  static readonly FindAll5Path = '/acompte/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll5()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll5$Response(params?: FindAll5$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AcompteDto>>> {
    return findAll5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll5(params?: FindAll5$Params, context?: HttpContext): Observable<Array<AcompteDto>> {
    return this.findAll5$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AcompteDto>>): Array<AcompteDto> => r.body)
    );
  }

}
