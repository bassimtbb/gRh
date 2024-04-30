/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add2 } from '../fn/formation-controller/add-2';
import { Add2$Params } from '../fn/formation-controller/add-2';
import { addEmployeToFormation } from '../fn/formation-controller/add-employe-to-formation';
import { AddEmployeToFormation$Params } from '../fn/formation-controller/add-employe-to-formation';
import { delete2 } from '../fn/formation-controller/delete-2';
import { Delete2$Params } from '../fn/formation-controller/delete-2';
import { findAll2 } from '../fn/formation-controller/find-all-2';
import { FindAll2$Params } from '../fn/formation-controller/find-all-2';
import { findById2 } from '../fn/formation-controller/find-by-id-2';
import { FindById2$Params } from '../fn/formation-controller/find-by-id-2';
import { FormationDto } from '../models/formation-dto';
import { update2 } from '../fn/formation-controller/update-2';
import { Update2$Params } from '../fn/formation-controller/update-2';

@Injectable({ providedIn: 'root' })
export class FormationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById2()` */
  static readonly FindById2Path = '/formation/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById2()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById2$Response(params: FindById2$Params, context?: HttpContext): Observable<StrictHttpResponse<FormationDto>> {
    return findById2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById2(params: FindById2$Params, context?: HttpContext): Observable<FormationDto> {
    return this.findById2$Response(params, context).pipe(
      map((r: StrictHttpResponse<FormationDto>): FormationDto => r.body)
    );
  }

  /** Path part for operation `update2()` */
  static readonly Update2Path = '/formation/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update2$Response(params: Update2$Params, context?: HttpContext): Observable<StrictHttpResponse<FormationDto>> {
    return update2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update2(params: Update2$Params, context?: HttpContext): Observable<FormationDto> {
    return this.update2$Response(params, context).pipe(
      map((r: StrictHttpResponse<FormationDto>): FormationDto => r.body)
    );
  }

  /** Path part for operation `delete2()` */
  static readonly Delete2Path = '/formation/{id}';

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
  static readonly Add2Path = '/formation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add2$Response(params: Add2$Params, context?: HttpContext): Observable<StrictHttpResponse<FormationDto>> {
    return add2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add2(params: Add2$Params, context?: HttpContext): Observable<FormationDto> {
    return this.add2$Response(params, context).pipe(
      map((r: StrictHttpResponse<FormationDto>): FormationDto => r.body)
    );
  }

  /** Path part for operation `addEmployeToFormation()` */
  static readonly AddEmployeToFormationPath = '/formation/addEmploye/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addEmployeToFormation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEmployeToFormation$Response(params: AddEmployeToFormation$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addEmployeToFormation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addEmployeToFormation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEmployeToFormation(params: AddEmployeToFormation$Params, context?: HttpContext): Observable<void> {
    return this.addEmployeToFormation$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findAll2()` */
  static readonly FindAll2Path = '/formation/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll2()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll2$Response(params?: FindAll2$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FormationDto>>> {
    return findAll2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll2(params?: FindAll2$Params, context?: HttpContext): Observable<Array<FormationDto>> {
    return this.findAll2$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FormationDto>>): Array<FormationDto> => r.body)
    );
  }

}
