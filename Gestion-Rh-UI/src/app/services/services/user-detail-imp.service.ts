/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { loadUserByUsername1 } from '../fn/user-detail-imp/load-user-by-username-1';
import { LoadUserByUsername1$Params } from '../fn/user-detail-imp/load-user-by-username-1';
import { UserDetails } from '../models/user-details';

@Injectable({ providedIn: 'root' })
export class UserDetailImpService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `loadUserByUsername1()` */
  static readonly LoadUserByUsername1Path = '/userD/username/{username}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadUserByUsername1()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadUserByUsername1$Response(params: LoadUserByUsername1$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDetails>> {
    return loadUserByUsername1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loadUserByUsername1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadUserByUsername1(params: LoadUserByUsername1$Params, context?: HttpContext): Observable<UserDetails> {
    return this.loadUserByUsername1$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDetails>): UserDetails => r.body)
    );
  }

}
