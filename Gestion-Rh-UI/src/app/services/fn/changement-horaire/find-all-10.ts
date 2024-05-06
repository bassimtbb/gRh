/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChangementHoraireDto } from '../../models/changement-horaire-dto';

export interface FindAll10$Params {
}

export function findAll10(http: HttpClient, rootUrl: string, params?: FindAll10$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ChangementHoraireDto>>> {
  const rb = new RequestBuilder(rootUrl, findAll10.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ChangementHoraireDto>>;
    })
  );
}

findAll10.PATH = '/ChangementH/all';
