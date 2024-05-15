/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PretDto } from '../../models/pret-dto';

export interface Update9$Params {
  id: number;
      body: PretDto
}

export function update9(http: HttpClient, rootUrl: string, params: Update9$Params, context?: HttpContext): Observable<StrictHttpResponse<PretDto>> {
  const rb = new RequestBuilder(rootUrl, update9.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PretDto>;
    })
  );
}

update9.PATH = '/Pret/{id}';
