/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DepartementDto } from '../../models/departement-dto';

export interface Update4$Params {
  id: number;
      body: DepartementDto
}

export function update4(http: HttpClient, rootUrl: string, params: Update4$Params, context?: HttpContext): Observable<StrictHttpResponse<DepartementDto>> {
  const rb = new RequestBuilder(rootUrl, update4.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DepartementDto>;
    })
  );
}

update4.PATH = '/department/{id}';
