/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StatistiqueDemandeResult } from '../../models/statistique-demande-result';

export interface GetStatistiqueDemande$Params {
}

export function getStatistiqueDemande(http: HttpClient, rootUrl: string, params?: GetStatistiqueDemande$Params, context?: HttpContext): Observable<StrictHttpResponse<StatistiqueDemandeResult>> {
  const rb = new RequestBuilder(rootUrl, getStatistiqueDemande.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StatistiqueDemandeResult>;
    })
  );
}

getStatistiqueDemande.PATH = '/Statistique/Demande';
