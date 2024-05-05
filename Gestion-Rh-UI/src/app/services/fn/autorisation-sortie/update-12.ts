/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AutorisationSortieDto } from '../../models/autorisation-sortie-dto';

export interface Update12$Params {
  id: number;
      body: AutorisationSortieDto
}

export function update12(http: HttpClient, rootUrl: string, params: Update12$Params, context?: HttpContext): Observable<StrictHttpResponse<AutorisationSortieDto>> {
  const rb = new RequestBuilder(rootUrl, update12.PATH, 'put');
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

update12.PATH = '/AutorisationS/{id}';
