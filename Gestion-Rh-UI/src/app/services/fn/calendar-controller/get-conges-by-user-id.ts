/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Conge } from '../../models/conge';

export interface GetCongesByUserId$Params {
  userId: number;
}

export function getCongesByUserId(http: HttpClient, rootUrl: string, params: GetCongesByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Conge>>> {
  const rb = new RequestBuilder(rootUrl, getCongesByUserId.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Conge>>;
    })
  );
}

getCongesByUserId.PATH = '/calendar/conges/{userId}';
