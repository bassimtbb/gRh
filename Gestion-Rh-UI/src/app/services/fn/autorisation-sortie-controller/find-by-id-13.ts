/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AutorisationSortieDto } from '../../models/autorisation-sortie-dto';

export interface FindById13$Params {
  id: number;
}

export function findById13(http: HttpClient, rootUrl: string, params: FindById13$Params, context?: HttpContext): Observable<StrictHttpResponse<AutorisationSortieDto>> {
  const rb = new RequestBuilder(rootUrl, findById13.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AutorisationSortieDto>;
    })
  );
}

findById13.PATH = '/AutorisationS/{id}';
