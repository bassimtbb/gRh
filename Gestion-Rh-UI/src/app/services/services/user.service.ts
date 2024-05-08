/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add } from '../fn/user/add';
import { Add$Params } from '../fn/user/add';
import { delete$ } from '../fn/user/delete';
import { Delete$Params } from '../fn/user/delete';
import { findAll } from '../fn/user/find-all';
import { FindAll$Params } from '../fn/user/find-all';
import { findById } from '../fn/user/find-by-id';
import { FindById$Params } from '../fn/user/find-by-id';
import { loadUserByUsername } from '../fn/user/load-user-by-username';
import { LoadUserByUsername$Params } from '../fn/user/load-user-by-username';
import { update } from '../fn/user/update';
import { Update$Params } from '../fn/user/update';
import { UserDetails } from '../models/user-details';
import { UserDto } from '../models/user-dto';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById()` */
  static readonly FindByIdPath = '/userD/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<UserDto> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `update()` */
  static readonly UpdatePath = '/userD/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update$Response(params: Update$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return update(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update(params: Update$Params, context?: HttpContext): Observable<UserDto> {
    return this.update$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `delete()` */
  static readonly DeletePath = '/userD/{id}';

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
  static readonly AddPath = '/userD';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add$Response(params: Add$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return add(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add(params: Add$Params, context?: HttpContext): Observable<UserDto> {
    return this.add$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `loadUserByUsername()` */
  static readonly LoadUserByUsernamePath = '/userD/username/{username}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadUserByUsername()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadUserByUsername$Response(params: LoadUserByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDetails>> {
    return loadUserByUsername(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loadUserByUsername$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadUserByUsername(params: LoadUserByUsername$Params, context?: HttpContext): Observable<UserDetails> {
    return this.loadUserByUsername$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDetails>): UserDetails => r.body)
    );
  }

  /** Path part for operation `findAll()` */
  static readonly FindAllPath = '/userD/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll$Response(params?: FindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserDto>>> {
    return findAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll(params?: FindAll$Params, context?: HttpContext): Observable<Array<UserDto>> {
    return this.findAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserDto>>): Array<UserDto> => r.body)
    );
  }

}
