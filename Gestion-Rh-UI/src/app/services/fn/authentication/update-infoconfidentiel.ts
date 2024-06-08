/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { User } from '../../models/user';

export interface UpdateInfoconfidentiel$Params {
  id: number;
  password: string;
  email: string;
  phoneNumber: string;
}

export function updateInfoconfidentiel(http: HttpClient, rootUrl: string, params: UpdateInfoconfidentiel$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, updateInfoconfidentiel.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('password', params.password, {});
    rb.query('email', params.email, {});
    rb.query('phoneNumber', params.phoneNumber, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<User>;
    })
  );
}

updateInfoconfidentiel.PATH = '/auth/{id}/update-info';
