/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AcompteDto } from '../../models/acompte-dto';

export interface FindAll5$Params {
}

export function findAll5(http: HttpClient, rootUrl: string, params?: FindAll5$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AcompteDto>>> {
  const rb = new RequestBuilder(rootUrl, findAll5.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<AcompteDto>>;
    })
  );
}

findAll5.PATH = '/acompte/all';
