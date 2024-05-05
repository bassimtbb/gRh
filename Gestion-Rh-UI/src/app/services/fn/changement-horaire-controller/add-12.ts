/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChangementHoraireDto } from '../../models/changement-horaire-dto';

export interface Add12$Params {
      body: ChangementHoraireDto
}

export function add12(http: HttpClient, rootUrl: string, params: Add12$Params, context?: HttpContext): Observable<StrictHttpResponse<ChangementHoraireDto>> {
  const rb = new RequestBuilder(rootUrl, add12.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ChangementHoraireDto>;
    })
  );
}

add12.PATH = '/ChangementH';
