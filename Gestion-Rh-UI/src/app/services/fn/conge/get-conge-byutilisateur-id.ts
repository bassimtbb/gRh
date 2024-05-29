/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Conge } from '../../models/conge';

export interface GetCongeByutilisateurId$Params {
  utilisateurId: number;
}

export function getCongeByutilisateurId(http: HttpClient, rootUrl: string, params: GetCongeByutilisateurId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Conge>>> {
  const rb = new RequestBuilder(rootUrl, getCongeByutilisateurId.PATH, 'get');
  if (params) {
    rb.path('utilisateurId', params.utilisateurId, {});
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

getCongeByutilisateurId.PATH = '/Conge/utilisateur/{utilisateurId}';
