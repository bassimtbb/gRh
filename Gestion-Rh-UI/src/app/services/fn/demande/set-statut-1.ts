/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DemandeDto } from '../../models/demande-dto';

export interface SetStatut1$Params {
  demandeId: number;
      body: string
}

export function setStatut1(http: HttpClient, rootUrl: string, params: SetStatut1$Params, context?: HttpContext): Observable<StrictHttpResponse<DemandeDto>> {
  const rb = new RequestBuilder(rootUrl, setStatut1.PATH, 'post');
  if (params) {
    rb.path('demandeId', params.demandeId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DemandeDto>;
    })
  );
}

setStatut1.PATH = '/demande/statut/{demandeId}';
