/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add10 } from '../fn/conge/add-10';
import { Add10$Params } from '../fn/conge/add-10';
import { Conge } from '../models/conge';
import { CongeDto } from '../models/conge-dto';
import { delete10 } from '../fn/conge/delete-10';
import { Delete10$Params } from '../fn/conge/delete-10';
import { findAll10 } from '../fn/conge/find-all-10';
import { FindAll10$Params } from '../fn/conge/find-all-10';
import { findById10 } from '../fn/conge/find-by-id-10';
import { FindById10$Params } from '../fn/conge/find-by-id-10';
import { getCongeBydepartementId } from '../fn/conge/get-conge-bydepartement-id';
import { GetCongeBydepartementId$Params } from '../fn/conge/get-conge-bydepartement-id';
import { getCongeByStatut } from '../fn/conge/get-conge-by-statut';
import { GetCongeByStatut$Params } from '../fn/conge/get-conge-by-statut';
import { getCongeByutilisateurId } from '../fn/conge/get-conge-byutilisateur-id';
import { GetCongeByutilisateurId$Params } from '../fn/conge/get-conge-byutilisateur-id';
import { update10 } from '../fn/conge/update-10';
import { Update10$Params } from '../fn/conge/update-10';

@Injectable({ providedIn: 'root' })
export class CongeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById10()` */
  static readonly FindById10Path = '/Conge/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById10()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById10$Response(params: FindById10$Params, context?: HttpContext): Observable<StrictHttpResponse<CongeDto>> {
    return findById10(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById10(params: FindById10$Params, context?: HttpContext): Observable<CongeDto> {
    return this.findById10$Response(params, context).pipe(
      map((r: StrictHttpResponse<CongeDto>): CongeDto => r.body)
    );
  }

  /** Path part for operation `update10()` */
  static readonly Update10Path = '/Conge/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update10()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update10$Response(params: Update10$Params, context?: HttpContext): Observable<StrictHttpResponse<CongeDto>> {
    return update10(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update10$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update10(params: Update10$Params, context?: HttpContext): Observable<CongeDto> {
    return this.update10$Response(params, context).pipe(
      map((r: StrictHttpResponse<CongeDto>): CongeDto => r.body)
    );
  }

  /** Path part for operation `delete10()` */
  static readonly Delete10Path = '/Conge/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete10()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete10$Response(params: Delete10$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete10(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete10(params: Delete10$Params, context?: HttpContext): Observable<string> {
    return this.delete10$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add10()` */
  static readonly Add10Path = '/Conge';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add10()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add10$Response(params: Add10$Params, context?: HttpContext): Observable<StrictHttpResponse<CongeDto>> {
    return add10(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add10$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add10(params: Add10$Params, context?: HttpContext): Observable<CongeDto> {
    return this.add10$Response(params, context).pipe(
      map((r: StrictHttpResponse<CongeDto>): CongeDto => r.body)
    );
  }

  /** Path part for operation `getCongeByutilisateurId()` */
  static readonly GetCongeByutilisateurIdPath = '/Conge/utilisateur/{utilisateurId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCongeByutilisateurId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCongeByutilisateurId$Response(params: GetCongeByutilisateurId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Conge>>> {
    return getCongeByutilisateurId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCongeByutilisateurId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCongeByutilisateurId(params: GetCongeByutilisateurId$Params, context?: HttpContext): Observable<Array<Conge>> {
    return this.getCongeByutilisateurId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Conge>>): Array<Conge> => r.body)
    );
  }

  /** Path part for operation `getCongeByStatut()` */
  static readonly GetCongeByStatutPath = '/Conge/statut/{statut}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCongeByStatut()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCongeByStatut$Response(params: GetCongeByStatut$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Conge>>> {
    return getCongeByStatut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCongeByStatut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCongeByStatut(params: GetCongeByStatut$Params, context?: HttpContext): Observable<Array<Conge>> {
    return this.getCongeByStatut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Conge>>): Array<Conge> => r.body)
    );
  }

  /** Path part for operation `findAll10()` */
  static readonly FindAll10Path = '/Conge/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll10()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll10$Response(params?: FindAll10$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CongeDto>>> {
    return findAll10(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll10(params?: FindAll10$Params, context?: HttpContext): Observable<Array<CongeDto>> {
    return this.findAll10$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CongeDto>>): Array<CongeDto> => r.body)
    );
  }

  /** Path part for operation `getCongeBydepartementId()` */
  static readonly GetCongeBydepartementIdPath = '/Conge/Departement/{departementId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCongeBydepartementId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCongeBydepartementId$Response(params: GetCongeBydepartementId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Conge>>> {
    return getCongeBydepartementId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCongeBydepartementId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCongeBydepartementId(params: GetCongeBydepartementId$Params, context?: HttpContext): Observable<Array<Conge>> {
    return this.getCongeBydepartementId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Conge>>): Array<Conge> => r.body)
    );
  }

}
