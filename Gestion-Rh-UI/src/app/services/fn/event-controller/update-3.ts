/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EventDto } from '../../models/event-dto';

export interface Update3$Params {
  id: number;
      body: EventDto
}

export function update3(http: HttpClient, rootUrl: string, params: Update3$Params, context?: HttpContext): Observable<StrictHttpResponse<EventDto>> {
  const rb = new RequestBuilder(rootUrl, update3.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EventDto>;
    })
  );
}

update3.PATH = '/event/{id}';
