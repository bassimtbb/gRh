/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add1 } from '../fn/formation/add-1';
import { Add1$Params } from '../fn/formation/add-1';
import { addEmployeToFormation } from '../fn/formation/add-employe-to-formation';
import { AddEmployeToFormation$Params } from '../fn/formation/add-employe-to-formation';
import { delete1 } from '../fn/formation/delete-1';
import { Delete1$Params } from '../fn/formation/delete-1';
import { findAll1 } from '../fn/formation/find-all-1';
import { FindAll1$Params } from '../fn/formation/find-all-1';
import { findById1 } from '../fn/formation/find-by-id-1';
import { FindById1$Params } from '../fn/formation/find-by-id-1';
import { FormationDto } from '../models/formation-dto';
import { update1 } from '../fn/formation/update-1';
import { Update1$Params } from '../fn/formation/update-1';

@Injectable({ providedIn: 'root' })
export class FormationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById1()` */
  static readonly FindById1Path = '/formation/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1$Response(params: FindById1$Params, context?: HttpContext): Observable<StrictHttpResponse<FormationDto>> {
    return findById1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1(params: FindById1$Params, context?: HttpContext): Observable<FormationDto> {
    return this.findById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<FormationDto>): FormationDto => r.body)
    );
  }

  /** Path part for operation `update1()` */
  static readonly Update1Path = '/formation/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update1$Response(params: Update1$Params, context?: HttpContext): Observable<StrictHttpResponse<FormationDto>> {
    return update1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update1(params: Update1$Params, context?: HttpContext): Observable<FormationDto> {
    return this.update1$Response(params, context).pipe(
      map((r: StrictHttpResponse<FormationDto>): FormationDto => r.body)
    );
  }

  /** Path part for operation `delete1()` */
  static readonly Delete1Path = '/formation/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete1()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete1$Response(params: Delete1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete1(params: Delete1$Params, context?: HttpContext): Observable<string> {
    return this.delete1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add1()` */
  static readonly Add1Path = '/formation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add1$Response(params: Add1$Params, context?: HttpContext): Observable<StrictHttpResponse<FormationDto>> {
    return add1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add1(params: Add1$Params, context?: HttpContext): Observable<FormationDto> {
    return this.add1$Response(params, context).pipe(
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

  /** Path part for operation `findAll1()` */
  static readonly FindAll1Path = '/formation/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll1$Response(params?: FindAll1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FormationDto>>> {
    return findAll1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll1(params?: FindAll1$Params, context?: HttpContext): Observable<Array<FormationDto>> {
    return this.findAll1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FormationDto>>): Array<FormationDto> => r.body)
    );
  }

}
