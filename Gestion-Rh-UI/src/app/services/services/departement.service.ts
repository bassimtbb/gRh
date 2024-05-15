/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add4 } from '../fn/departement/add-4';
import { Add4$Params } from '../fn/departement/add-4';
import { addEmployeToDepartement } from '../fn/departement/add-employe-to-departement';
import { AddEmployeToDepartement$Params } from '../fn/departement/add-employe-to-departement';
import { delete4 } from '../fn/departement/delete-4';
import { Delete4$Params } from '../fn/departement/delete-4';
import { deleteEmpl } from '../fn/departement/delete-empl';
import { DeleteEmpl$Params } from '../fn/departement/delete-empl';
import { deleteSupH } from '../fn/departement/delete-sup-h';
import { DeleteSupH$Params } from '../fn/departement/delete-sup-h';
import { Departement } from '../models/departement';
import { DepartementDto } from '../models/departement-dto';
import { findAll4 } from '../fn/departement/find-all-4';
import { FindAll4$Params } from '../fn/departement/find-all-4';
import { findById4 } from '../fn/departement/find-by-id-4';
import { FindById4$Params } from '../fn/departement/find-by-id-4';
import { findByIdEn } from '../fn/departement/find-by-id-en';
import { FindByIdEn$Params } from '../fn/departement/find-by-id-en';
import { setSup } from '../fn/departement/set-sup';
import { SetSup$Params } from '../fn/departement/set-sup';
import { update4 } from '../fn/departement/update-4';
import { Update4$Params } from '../fn/departement/update-4';

@Injectable({ providedIn: 'root' })
export class DepartementService extends BaseService {
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

  /** Path part for operation `deleteSupH()` */
  static readonly DeleteSupHPath = '/department/removeSupH/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSupH()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteSupH$Response(params: DeleteSupH$Params, context?: HttpContext): Observable<StrictHttpResponse<Departement>> {
    return deleteSupH(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteSupH$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteSupH(params: DeleteSupH$Params, context?: HttpContext): Observable<Departement> {
    return this.deleteSupH$Response(params, context).pipe(
      map((r: StrictHttpResponse<Departement>): Departement => r.body)
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
  deleteEmpl$Response(params: DeleteEmpl$Params, context?: HttpContext): Observable<StrictHttpResponse<Departement>> {
    return deleteEmpl(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteEmpl$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteEmpl(params: DeleteEmpl$Params, context?: HttpContext): Observable<Departement> {
    return this.deleteEmpl$Response(params, context).pipe(
      map((r: StrictHttpResponse<Departement>): Departement => r.body)
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
  addEmployeToDepartement$Response(params: AddEmployeToDepartement$Params, context?: HttpContext): Observable<StrictHttpResponse<Departement>> {
    return addEmployeToDepartement(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addEmployeToDepartement$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEmployeToDepartement(params: AddEmployeToDepartement$Params, context?: HttpContext): Observable<Departement> {
    return this.addEmployeToDepartement$Response(params, context).pipe(
      map((r: StrictHttpResponse<Departement>): Departement => r.body)
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
  setSup$Response(params: SetSup$Params, context?: HttpContext): Observable<StrictHttpResponse<Departement>> {
    return setSup(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setSup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setSup(params: SetSup$Params, context?: HttpContext): Observable<Departement> {
    return this.setSup$Response(params, context).pipe(
      map((r: StrictHttpResponse<Departement>): Departement => r.body)
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
