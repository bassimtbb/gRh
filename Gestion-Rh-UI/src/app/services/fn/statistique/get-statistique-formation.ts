/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StatistiqueFormationResult } from '../../models/statistique-formation-result';

export interface GetStatistiqueFormation$Params {
  formationId: number;
}

export function getStatistiqueFormation(http: HttpClient, rootUrl: string, params: GetStatistiqueFormation$Params, context?: HttpContext): Observable<StrictHttpResponse<StatistiqueFormationResult>> {
  const rb = new RequestBuilder(rootUrl, getStatistiqueFormation.PATH, 'get');
  if (params) {
    rb.path('formationId', params.formationId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StatistiqueFormationResult>;
    })
  );
}

getStatistiqueFormation.PATH = '/Statistique/Formation/{formationId}';
