/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AutorisationTeletravailDto } from '../../models/autorisation-teletravail-dto';

export interface Add7$Params {
      body: AutorisationTeletravailDto
}

export function add7(http: HttpClient, rootUrl: string, params: Add7$Params, context?: HttpContext): Observable<StrictHttpResponse<AutorisationTeletravailDto>> {
  const rb = new RequestBuilder(rootUrl, add7.PATH, 'post');
  if (params) {
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

add7.PATH = '/Teletravail';
