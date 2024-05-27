/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GeneratePdf$Params {
  demandeId: number;
  typeDemande: string;
}

export function generatePdf(http: HttpClient, rootUrl: string, params: GeneratePdf$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, generatePdf.PATH, 'get');
  if (params) {
    rb.path('demandeId', params.demandeId, {});
    rb.query('typeDemande', params.typeDemande, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

generatePdf.PATH = '/demande/pdf/{demandeId}';
