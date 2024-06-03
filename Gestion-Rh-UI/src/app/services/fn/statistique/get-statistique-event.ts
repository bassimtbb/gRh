/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StatistiqueEventResult } from '../../models/statistique-event-result';

export interface GetStatistiqueEvent$Params {
  eventId: number;
}

export function getStatistiqueEvent(http: HttpClient, rootUrl: string, params: GetStatistiqueEvent$Params, context?: HttpContext): Observable<StrictHttpResponse<StatistiqueEventResult>> {
  const rb = new RequestBuilder(rootUrl, getStatistiqueEvent.PATH, 'get');
  if (params) {
    rb.path('eventId', params.eventId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StatistiqueEventResult>;
    })
  );
}

getStatistiqueEvent.PATH = '/Statistique/Event/{eventId}';
