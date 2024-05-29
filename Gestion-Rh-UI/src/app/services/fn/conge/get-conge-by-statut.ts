/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Conge } from '../../models/conge';

export interface GetCongeByStatut$Params {
  statut: 'En_attente_Sup_H' | 'Refusee_Sup_H' | 'En_attente_RRH' | 'Validee' | 'Refusee';
}

export function getCongeByStatut(http: HttpClient, rootUrl: string, params: GetCongeByStatut$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Conge>>> {
  const rb = new RequestBuilder(rootUrl, getCongeByStatut.PATH, 'get');
  if (params) {
    rb.path('statut', params.statut, {});
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

getCongeByStatut.PATH = '/Conge/statut/{statut}';
