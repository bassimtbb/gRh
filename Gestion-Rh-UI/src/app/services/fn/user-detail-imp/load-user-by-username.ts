/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserDetails } from '../../models/user-details';

export interface LoadUserByUsername$Params {
  username: string;
}

export function loadUserByUsername(http: HttpClient, rootUrl: string, params: LoadUserByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDetails>> {
  const rb = new RequestBuilder(rootUrl, loadUserByUsername.PATH, 'get');
  if (params) {
    rb.path('username', params.username, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserDetails>;
    })
  );
}

loadUserByUsername.PATH = '/userD/username/{username}';
