/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add3 } from '../fn/departement/add-3';
import { Add3$Params } from '../fn/departement/add-3';
import { addEmployeToDepartement } from '../fn/departement/add-employe-to-departement';
import { AddEmployeToDepartement$Params } from '../fn/departement/add-employe-to-departement';
import { delete3 } from '../fn/departement/delete-3';
import { Delete3$Params } from '../fn/departement/delete-3';
import { deleteEmpl } from '../fn/departement/delete-empl';
import { DeleteEmpl$Params } from '../fn/departement/delete-empl';
import { Departement } from '../models/departement';
import { DepartementDto } from '../models/departement-dto';
import { findAll3 } from '../fn/departement/find-all-3';
import { FindAll3$Params } from '../fn/departement/find-all-3';
import { findById3 } from '../fn/departement/find-by-id-3';
import { FindById3$Params } from '../fn/departement/find-by-id-3';
import { findByIdEn } from '../fn/departement/find-by-id-en';
import { FindByIdEn$Params } from '../fn/departement/find-by-id-en';
import { setSup } from '../fn/departement/set-sup';
import { SetSup$Params } from '../fn/departement/set-sup';
import { update3 } from '../fn/departement/update-3';
import { Update3$Params } from '../fn/departement/update-3';

@Injectable({ providedIn: 'root' })
export class DepartementService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById3()` */
  static readonly FindById3Path = '/department/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById3()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById3$Response(params: FindById3$Params, context?: HttpContext): Observable<StrictHttpResponse<DepartementDto>> {
    return findById3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById3(params: FindById3$Params, context?: HttpContext): Observable<DepartementDto> {
    return this.findById3$Response(params, context).pipe(
      map((r: StrictHttpResponse<DepartementDto>): DepartementDto => r.body)
    );
  }

  /** Path part for operation `update3()` */
  static readonly Update3Path = '/department/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update3$Response(params: Update3$Params, context?: HttpContext): Observable<StrictHttpResponse<DepartementDto>> {
    return update3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update3(params: Update3$Params, context?: HttpContext): Observable<DepartementDto> {
    return this.update3$Response(params, context).pipe(
      map((r: StrictHttpResponse<DepartementDto>): DepartementDto => r.body)
    );
  }

  /** Path part for operation `delete3()` */
  static readonly Delete3Path = '/department/{id}';

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
  static readonly Add3Path = '/department';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add3$Response(params: Add3$Params, context?: HttpContext): Observable<StrictHttpResponse<DepartementDto>> {
    return add3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add3(params: Add3$Params, context?: HttpContext): Observable<DepartementDto> {
    return this.add3$Response(params, context).pipe(
      map((r: StrictHttpResponse<DepartementDto>): DepartementDto => r.body)
    );
  }

  /** Path part for operation `deleteEmpl()` */
  static readonly DeleteEmplPath = '/department/removeEmpl/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEmpl()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteEmpl$Response(params: DeleteEmpl$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteEmpl(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteEmpl$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteEmpl(params: DeleteEmpl$Params, context?: HttpContext): Observable<void> {
    return this.deleteEmpl$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `addEmployeToDepartement()` */
  static readonly AddEmployeToDepartementPath = '/department/addEmploye/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addEmployeToDepartement()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEmployeToDepartement$Response(params: AddEmployeToDepartement$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addEmployeToDepartement(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addEmployeToDepartement$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEmployeToDepartement(params: AddEmployeToDepartement$Params, context?: HttpContext): Observable<void> {
    return this.addEmployeToDepartement$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `setSup()` */
  static readonly SetSupPath = '/department/SetSup/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setSup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setSup$Response(params: SetSup$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return setSup(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setSup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setSup(params: SetSup$Params, context?: HttpContext): Observable<void> {
    return this.setSup$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findByIdEn()` */
  static readonly FindByIdEnPath = '/department/findByIdE/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByIdEn()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByIdEn$Response(params: FindByIdEn$Params, context?: HttpContext): Observable<StrictHttpResponse<Departement>> {
    return findByIdEn(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByIdEn$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByIdEn(params: FindByIdEn$Params, context?: HttpContext): Observable<Departement> {
    return this.findByIdEn$Response(params, context).pipe(
      map((r: StrictHttpResponse<Departement>): Departement => r.body)
    );
  }

  /** Path part for operation `findAll3()` */
  static readonly FindAll3Path = '/department/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll3()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll3$Response(params?: FindAll3$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DepartementDto>>> {
    return findAll3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll3(params?: FindAll3$Params, context?: HttpContext): Observable<Array<DepartementDto>> {
    return this.findAll3$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DepartementDto>>): Array<DepartementDto> => r.body)
    );
  }

}
