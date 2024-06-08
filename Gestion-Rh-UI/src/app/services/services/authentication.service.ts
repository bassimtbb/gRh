/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authenticate } from '../fn/authentication/authenticate';
import { Authenticate$Params } from '../fn/authentication/authenticate';
import { AuthenticationResponse } from '../models/authentication-response';
import { lockCompte } from '../fn/authentication/lock-compte';
import { LockCompte$Params } from '../fn/authentication/lock-compte';
import { register } from '../fn/authentication/register';
import { Register$Params } from '../fn/authentication/register';
import { RegistrationRequest } from '../models/registration-request';
import { resetPassword } from '../fn/authentication/reset-password';
import { ResetPassword$Params } from '../fn/authentication/reset-password';
import { unlockCompte } from '../fn/authentication/unlock-compte';
import { UnlockCompte$Params } from '../fn/authentication/unlock-compte';
import { updateInfoconfidentiel } from '../fn/authentication/update-infoconfidentiel';
import { UpdateInfoconfidentiel$Params } from '../fn/authentication/update-infoconfidentiel';
import { updateInfopersonnel } from '../fn/authentication/update-infopersonnel';
import { UpdateInfopersonnel$Params } from '../fn/authentication/update-infopersonnel';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateInfoconfidentiel()` */
  static readonly UpdateInfoconfidentielPath = '/auth/{id}/update-info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateInfoconfidentiel()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateInfoconfidentiel$Response(params: UpdateInfoconfidentiel$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return updateInfoconfidentiel(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateInfoconfidentiel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateInfoconfidentiel(params: UpdateInfoconfidentiel$Params, context?: HttpContext): Observable<User> {
    return this.updateInfoconfidentiel$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `updateInfopersonnel()` */
  static readonly UpdateInfopersonnelPath = '/auth/{id}/update-info-personnel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateInfopersonnel()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateInfopersonnel$Response(params: UpdateInfopersonnel$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return updateInfopersonnel(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateInfopersonnel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateInfopersonnel(params: UpdateInfopersonnel$Params, context?: HttpContext): Observable<User> {
    return this.updateInfopersonnel$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `unlockCompte()` */
  static readonly UnlockComptePath = '/auth/{id}/unlock-account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlockCompte()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlockCompte$Response(params: UnlockCompte$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return unlockCompte(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `unlockCompte$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlockCompte(params: UnlockCompte$Params, context?: HttpContext): Observable<User> {
    return this.unlockCompte$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `resetPassword()` */
  static readonly ResetPasswordPath = '/auth/{id}/reset-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword$Response(params: ResetPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return resetPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resetPassword(params: ResetPassword$Params, context?: HttpContext): Observable<User> {
    return this.resetPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `lockCompte()` */
  static readonly LockComptePath = '/auth/{id}/lock-account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lockCompte()` instead.
   *
   * This method doesn't expect any request body.
   */
  lockCompte$Response(params: LockCompte$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return lockCompte(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `lockCompte$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  lockCompte(params: LockCompte$Params, context?: HttpContext): Observable<User> {
    return this.lockCompte$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<RegistrationRequest>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<RegistrationRequest> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<RegistrationRequest>): RegistrationRequest => r.body)
    );
  }

  /** Path part for operation `authenticate()` */
  static readonly AuthenticatePath = '/auth/authenticate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(params: Authenticate$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authenticate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(params: Authenticate$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.authenticate$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

}
