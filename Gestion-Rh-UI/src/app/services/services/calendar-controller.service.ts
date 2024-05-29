/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Formation } from '../models/formation';
import { getFormationsByUserId } from '../fn/calendar-controller/get-formations-by-user-id';
import { GetFormationsByUserId$Params } from '../fn/calendar-controller/get-formations-by-user-id';

@Injectable({ providedIn: 'root' })
export class CalendarControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getFormationsByUserId()` */
  static readonly GetFormationsByUserIdPath = '/calendar/formations/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFormationsByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFormationsByUserId$Response(params: GetFormationsByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Formation>>> {
    return getFormationsByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFormationsByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFormationsByUserId(params: GetFormationsByUserId$Params, context?: HttpContext): Observable<Array<Formation>> {
    return this.getFormationsByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Formation>>): Array<Formation> => r.body)
    );
  }

}
