/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Event } from '../../models/event';

export interface GetEventsByUserId$Params {
  userId: number;
}

export function getEventsByUserId(http: HttpClient, rootUrl: string, params: GetEventsByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Event>>> {
  const rb = new RequestBuilder(rootUrl, getEventsByUserId.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Event>>;
    })
  );
}

getEventsByUserId.PATH = '/calendar/events/{userId}';
