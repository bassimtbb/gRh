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
import { add6 } from '../fn/acompte/add-6';
import { Add6$Params } from '../fn/acompte/add-6';
import { delete6 } from '../fn/acompte/delete-6';
import { Delete6$Params } from '../fn/acompte/delete-6';
import { findAll6 } from '../fn/acompte/find-all-6';
import { FindAll6$Params } from '../fn/acompte/find-all-6';
import { findById6 } from '../fn/acompte/find-by-id-6';
import { FindById6$Params } from '../fn/acompte/find-by-id-6';
import { update6 } from '../fn/acompte/update-6';
import { Update6$Params } from '../fn/acompte/update-6';

@Injectable({ providedIn: 'root' })
export class AcompteService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById6()` */
  static readonly FindById6Path = '/acompte/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById6()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById6$Response(params: FindById6$Params, context?: HttpContext): Observable<StrictHttpResponse<AcompteDto>> {
    return findById6(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById6(params: FindById6$Params, context?: HttpContext): Observable<AcompteDto> {
    return this.findById6$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcompteDto>): AcompteDto => r.body)
    );
  }

  /** Path part for operation `update6()` */
  static readonly Update6Path = '/acompte/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update6()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update6$Response(params: Update6$Params, context?: HttpContext): Observable<StrictHttpResponse<AcompteDto>> {
    return update6(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update6$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update6(params: Update6$Params, context?: HttpContext): Observable<AcompteDto> {
    return this.update6$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcompteDto>): AcompteDto => r.body)
    );
  }

  /** Path part for operation `delete6()` */
  static readonly Delete6Path = '/acompte/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete6()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete6$Response(params: Delete6$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete6(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete6(params: Delete6$Params, context?: HttpContext): Observable<string> {
    return this.delete6$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add6()` */
  static readonly Add6Path = '/acompte';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add6()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add6$Response(params: Add6$Params, context?: HttpContext): Observable<StrictHttpResponse<AcompteDto>> {
    return add6(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add6$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add6(params: Add6$Params, context?: HttpContext): Observable<AcompteDto> {
    return this.add6$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcompteDto>): AcompteDto => r.body)
    );
  }

  /** Path part for operation `findAll6()` */
  static readonly FindAll6Path = '/acompte/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll6()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll6$Response(params?: FindAll6$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AcompteDto>>> {
    return findAll6(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll6(params?: FindAll6$Params, context?: HttpContext): Observable<Array<AcompteDto>> {
    return this.findAll6$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AcompteDto>>): Array<AcompteDto> => r.body)
    );
  }

}
