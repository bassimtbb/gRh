/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrdreMissionDto } from '../../models/ordre-mission-dto';

export interface Add9$Params {
      body: OrdreMissionDto
}

export function add9(http: HttpClient, rootUrl: string, params: Add9$Params, context?: HttpContext): Observable<StrictHttpResponse<OrdreMissionDto>> {
  const rb = new RequestBuilder(rootUrl, add9.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OrdreMissionDto>;
    })
  );
}

add9.PATH = '/OrdreMission';
