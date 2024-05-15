/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DepartementDto } from '../../models/departement-dto';

export interface FindAll4$Params {
}

export function findAll4(http: HttpClient, rootUrl: string, params?: FindAll4$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DepartementDto>>> {
  const rb = new RequestBuilder(rootUrl, findAll4.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<DepartementDto>>;
    })
  );
}

findAll4.PATH = '/department/all';
