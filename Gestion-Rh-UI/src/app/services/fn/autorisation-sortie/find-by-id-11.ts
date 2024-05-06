/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AutorisationSortieDto } from '../../models/autorisation-sortie-dto';

export interface FindById11$Params {
  id: number;
}

export function findById11(http: HttpClient, rootUrl: string, params: FindById11$Params, context?: HttpContext): Observable<StrictHttpResponse<AutorisationSortieDto>> {
  const rb = new RequestBuilder(rootUrl, findById11.PATH, 'get');
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

findById11.PATH = '/AutorisationS/{id}';
