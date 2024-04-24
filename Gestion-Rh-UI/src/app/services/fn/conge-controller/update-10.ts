/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CongeDto } from '../../models/conge-dto';

export interface Update10$Params {
  id: number;
      body: CongeDto
}

export function update10(http: HttpClient, rootUrl: string, params: Update10$Params, context?: HttpContext): Observable<StrictHttpResponse<CongeDto>> {
  const rb = new RequestBuilder(rootUrl, update10.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CongeDto>;
    })
  );
}

update10.PATH = '/Conge/{id}';
