/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AutorisationTeletravailDto } from '../../models/autorisation-teletravail-dto';

export interface Update8$Params {
  id: number;
      body: AutorisationTeletravailDto
}

export function update8(http: HttpClient, rootUrl: string, params: Update8$Params, context?: HttpContext): Observable<StrictHttpResponse<AutorisationTeletravailDto>> {
  const rb = new RequestBuilder(rootUrl, update8.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AutorisationTeletravailDto>;
    })
  );
}

update8.PATH = '/Teletravail/{id}';
