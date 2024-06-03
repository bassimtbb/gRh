/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StatistiqueDemandeByDepartementResult } from '../../models/statistique-demande-by-departement-result';

export interface GetStatistiqueDemandeByDepartement$Params {
  departementId: number;
}

export function getStatistiqueDemandeByDepartement(http: HttpClient, rootUrl: string, params: GetStatistiqueDemandeByDepartement$Params, context?: HttpContext): Observable<StrictHttpResponse<StatistiqueDemandeByDepartementResult>> {
  const rb = new RequestBuilder(rootUrl, getStatistiqueDemandeByDepartement.PATH, 'get');
  if (params) {
    rb.path('departementId', params.departementId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StatistiqueDemandeByDepartementResult>;
    })
  );
}

getStatistiqueDemandeByDepartement.PATH = '/Statistique/Demande/{departementId}';
