/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StatistiqueUserByDepartementResult } from '../../models/statistique-user-by-departement-result';

export interface GetStatistiqueUserByDepartement$Params {
  departementId: number;
}

export function getStatistiqueUserByDepartement(http: HttpClient, rootUrl: string, params: GetStatistiqueUserByDepartement$Params, context?: HttpContext): Observable<StrictHttpResponse<StatistiqueUserByDepartementResult>> {
  const rb = new RequestBuilder(rootUrl, getStatistiqueUserByDepartement.PATH, 'get');
  if (params) {
    rb.path('departementId', params.departementId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StatistiqueUserByDepartementResult>;
    })
  );
}

getStatistiqueUserByDepartement.PATH = '/Statistique/User/{departementId}';
