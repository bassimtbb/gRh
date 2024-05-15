/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Demande } from '../../models/demande';

export interface GetDemandeBydepartementId$Params {
  departementId: number;
}

export function getDemandeBydepartementId(http: HttpClient, rootUrl: string, params: GetDemandeBydepartementId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Demande>>> {
  const rb = new RequestBuilder(rootUrl, getDemandeBydepartementId.PATH, 'get');
  if (params) {
    rb.path('departementId', params.departementId, {});
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

getDemandeBydepartementId.PATH = '/demande/Departement/{departementId}';
