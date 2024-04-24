/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add } from '../fn/utilisateur-controller/add';
import { Add$Params } from '../fn/utilisateur-controller/add';
import { delete$ } from '../fn/utilisateur-controller/delete';
import { Delete$Params } from '../fn/utilisateur-controller/delete';
import { findAll } from '../fn/utilisateur-controller/find-all';
import { FindAll$Params } from '../fn/utilisateur-controller/find-all';
import { findById } from '../fn/utilisateur-controller/find-by-id';
import { FindById$Params } from '../fn/utilisateur-controller/find-by-id';
import { loadUserByUsername } from '../fn/utilisateur-controller/load-user-by-username';
import { LoadUserByUsername$Params } from '../fn/utilisateur-controller/load-user-by-username';
import { update } from '../fn/utilisateur-controller/update';
import { Update$Params } from '../fn/utilisateur-controller/update';
import { Utilisateur } from '../models/utilisateur';
import { UtilisateurDto } from '../models/utilisateur-dto';

@Injectable({ providedIn: 'root' })
export class UtilisateurControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById()` */
  static readonly FindByIdPath = '/utilisateur/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<UtilisateurDto>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<UtilisateurDto> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<UtilisateurDto>): UtilisateurDto => r.body)
    );
  }

  /** Path part for operation `update()` */
  static readonly UpdatePath = '/utilisateur/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update$Response(params: Update$Params, context?: HttpContext): Observable<StrictHttpResponse<UtilisateurDto>> {
    return update(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update(params: Update$Params, context?: HttpContext): Observable<UtilisateurDto> {
    return this.update$Response(params, context).pipe(
      map((r: StrictHttpResponse<UtilisateurDto>): UtilisateurDto => r.body)
    );
  }

  /** Path part for operation `delete()` */
  static readonly DeletePath = '/utilisateur/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: Delete$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete$(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: Delete$Params, context?: HttpContext): Observable<string> {
    return this.delete$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add()` */
  static readonly AddPath = '/utilisateur';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add$Response(params: Add$Params, context?: HttpContext): Observable<StrictHttpResponse<UtilisateurDto>> {
    return add(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add(params: Add$Params, context?: HttpContext): Observable<UtilisateurDto> {
    return this.add$Response(params, context).pipe(
      map((r: StrictHttpResponse<UtilisateurDto>): UtilisateurDto => r.body)
    );
  }

  /** Path part for operation `loadUserByUsername()` */
  static readonly LoadUserByUsernamePath = '/utilisateur/email/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadUserByUsername()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadUserByUsername$Response(params: LoadUserByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<Utilisateur>> {
    return loadUserByUsername(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loadUserByUsername$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadUserByUsername(params: LoadUserByUsername$Params, context?: HttpContext): Observable<Utilisateur> {
    return this.loadUserByUsername$Response(params, context).pipe(
      map((r: StrictHttpResponse<Utilisateur>): Utilisateur => r.body)
    );
  }

  /** Path part for operation `findAll()` */
  static readonly FindAllPath = '/utilisateur/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll$Response(params?: FindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UtilisateurDto>>> {
    return findAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll(params?: FindAll$Params, context?: HttpContext): Observable<Array<UtilisateurDto>> {
    return this.findAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UtilisateurDto>>): Array<UtilisateurDto> => r.body)
    );
  }

}
