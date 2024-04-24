/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EmployeDto } from '../../models/employe-dto';

export interface Add5$Params {
      body: EmployeDto
}

export function add5(http: HttpClient, rootUrl: string, params: Add5$Params, context?: HttpContext): Observable<StrictHttpResponse<EmployeDto>> {
  const rb = new RequestBuilder(rootUrl, add5.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EmployeDto>;
    })
  );
}

add5.PATH = '/employe';
