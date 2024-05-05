/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AutorisationSortieDto } from '../../models/autorisation-sortie-dto';

export interface Update13$Params {
  id: number;
      body: AutorisationSortieDto
}

export function update13(http: HttpClient, rootUrl: string, params: Update13$Params, context?: HttpContext): Observable<StrictHttpResponse<AutorisationSortieDto>> {
  const rb = new RequestBuilder(rootUrl, update13.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
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

update13.PATH = '/AutorisationS/{id}';
