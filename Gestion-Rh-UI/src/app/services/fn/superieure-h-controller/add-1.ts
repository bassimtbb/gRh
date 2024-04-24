/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SuperieureHDto } from '../../models/superieure-h-dto';

export interface Add1$Params {
      body: SuperieureHDto
}

export function add1(http: HttpClient, rootUrl: string, params: Add1$Params, context?: HttpContext): Observable<StrictHttpResponse<SuperieureHDto>> {
  const rb = new RequestBuilder(rootUrl, add1.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SuperieureHDto>;
    })
  );
}

add1.PATH = '/suph';
