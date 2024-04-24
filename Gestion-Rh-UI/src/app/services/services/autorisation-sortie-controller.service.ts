/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add12 } from '../fn/autorisation-sortie-controller/add-12';
import { Add12$Params } from '../fn/autorisation-sortie-controller/add-12';
import { AutorisationSortieDto } from '../models/autorisation-sortie-dto';
import { delete12 } from '../fn/autorisation-sortie-controller/delete-12';
import { Delete12$Params } from '../fn/autorisation-sortie-controller/delete-12';
import { findAll12 } from '../fn/autorisation-sortie-controller/find-all-12';
import { FindAll12$Params } from '../fn/autorisation-sortie-controller/find-all-12';
import { findById12 } from '../fn/autorisation-sortie-controller/find-by-id-12';
import { FindById12$Params } from '../fn/autorisation-sortie-controller/find-by-id-12';
import { update12 } from '../fn/autorisation-sortie-controller/update-12';
import { Update12$Params } from '../fn/autorisation-sortie-controller/update-12';

@Injectable({ providedIn: 'root' })
export class AutorisationSortieControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById12()` */
  static readonly FindById12Path = '/AutorisationS/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById12()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById12$Response(params: FindById12$Params, context?: HttpContext): Observable<StrictHttpResponse<AutorisationSortieDto>> {
    return findById12(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById12(params: FindById12$Params, context?: HttpContext): Observable<AutorisationSortieDto> {
    return this.findById12$Response(params, context).pipe(
      map((r: StrictHttpResponse<AutorisationSortieDto>): AutorisationSortieDto => r.body)
    );
  }

  /** Path part for operation `update12()` */
  static readonly Update12Path = '/AutorisationS/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update12()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update12$Response(params: Update12$Params, context?: HttpContext): Observable<StrictHttpResponse<AutorisationSortieDto>> {
    return update12(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update12$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update12(params: Update12$Params, context?: HttpContext): Observable<AutorisationSortieDto> {
    return this.update12$Response(params, context).pipe(
      map((r: StrictHttpResponse<AutorisationSortieDto>): AutorisationSortieDto => r.body)
    );
  }

  /** Path part for operation `delete12()` */
  static readonly Delete12Path = '/AutorisationS/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete12()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete12$Response(params: Delete12$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete12(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete12(params: Delete12$Params, context?: HttpContext): Observable<string> {
    return this.delete12$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add12()` */
  static readonly Add12Path = '/AutorisationS';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add12()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add12$Response(params: Add12$Params, context?: HttpContext): Observable<StrictHttpResponse<AutorisationSortieDto>> {
    return add12(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add12$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add12(params: Add12$Params, context?: HttpContext): Observable<AutorisationSortieDto> {
    return this.add12$Response(params, context).pipe(
      map((r: StrictHttpResponse<AutorisationSortieDto>): AutorisationSortieDto => r.body)
    );
  }

  /** Path part for operation `findAll12()` */
  static readonly FindAll12Path = '/AutorisationS/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll12()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll12$Response(params?: FindAll12$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AutorisationSortieDto>>> {
    return findAll12(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll12(params?: FindAll12$Params, context?: HttpContext): Observable<Array<AutorisationSortieDto>> {
    return this.findAll12$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AutorisationSortieDto>>): Array<AutorisationSortieDto> => r.body)
    );
  }

}
