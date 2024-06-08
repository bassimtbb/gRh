/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { User } from '../../models/user';

export interface UpdateInfopersonnel$Params {
  id: number;
  firstname: string;
  lastname: string;
  cin: string;
  sexe: string;
  dembauche: string;
  adresse: string;
}

export function updateInfopersonnel(http: HttpClient, rootUrl: string, params: UpdateInfopersonnel$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, updateInfopersonnel.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('firstname', params.firstname, {});
    rb.query('lastname', params.lastname, {});
    rb.query('cin', params.cin, {});
    rb.query('sexe', params.sexe, {});
    rb.query('dembauche', params.dembauche, {});
    rb.query('adresse', params.adresse, {});
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

updateInfopersonnel.PATH = '/auth/{id}/update-info-personnel';
