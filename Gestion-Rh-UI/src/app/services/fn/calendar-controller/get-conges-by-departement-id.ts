/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Conge } from '../../models/conge';

export interface GetCongesByDepartementId$Params {
  departementId: number;
}

export function getCongesByDepartementId(http: HttpClient, rootUrl: string, params: GetCongesByDepartementId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Conge>>> {
  const rb = new RequestBuilder(rootUrl, getCongesByDepartementId.PATH, 'get');
  if (params) {
    rb.path('departementId', params.departementId, {});
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

getCongesByDepartementId.PATH = '/calendar/conges/Departement/{departementId}';
