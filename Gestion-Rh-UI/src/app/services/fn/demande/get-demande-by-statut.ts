/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Demande } from '../../models/demande';

export interface GetDemandeByStatut$Params {
  statut: 'En_attente_Sup_H' | 'Refusee_Sup_H' | 'En_attente_RRH' | 'Validee' | 'Refusee';
}

export function getDemandeByStatut(http: HttpClient, rootUrl: string, params: GetDemandeByStatut$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Demande>>> {
  const rb = new RequestBuilder(rootUrl, getDemandeByStatut.PATH, 'get');
  if (params) {
    rb.path('statut', params.statut, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Demande>>;
    })
  );
}

getDemandeByStatut.PATH = '/demande/statut/{statut}';
