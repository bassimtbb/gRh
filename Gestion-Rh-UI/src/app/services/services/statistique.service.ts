/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getStatistiqueDemande } from '../fn/statistique/get-statistique-demande';
import { GetStatistiqueDemande$Params } from '../fn/statistique/get-statistique-demande';
import { getStatistiqueDemandeByDepartement } from '../fn/statistique/get-statistique-demande-by-departement';
import { GetStatistiqueDemandeByDepartement$Params } from '../fn/statistique/get-statistique-demande-by-departement';
import { getStatistiqueEvent } from '../fn/statistique/get-statistique-event';
import { GetStatistiqueEvent$Params } from '../fn/statistique/get-statistique-event';
import { getStatistiqueFormation } from '../fn/statistique/get-statistique-formation';
import { GetStatistiqueFormation$Params } from '../fn/statistique/get-statistique-formation';
import { getStatistiqueGenerale } from '../fn/statistique/get-statistique-generale';
import { GetStatistiqueGenerale$Params } from '../fn/statistique/get-statistique-generale';
import { StatistiqueDemandeByDepartementResult } from '../models/statistique-demande-by-departement-result';
import { StatistiqueDemandeResult } from '../models/statistique-demande-result';
import { StatistiqueEventResult } from '../models/statistique-event-result';
import { StatistiqueFormationResult } from '../models/statistique-formation-result';
import { StatistiqueGeneraleResult } from '../models/statistique-generale-result';

@Injectable({ providedIn: 'root' })
export class StatistiqueService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getStatistiqueGenerale()` */
  static readonly GetStatistiqueGeneralePath = '/Statistique/Generale';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStatistiqueGenerale()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatistiqueGenerale$Response(params?: GetStatistiqueGenerale$Params, context?: HttpContext): Observable<StrictHttpResponse<StatistiqueGeneraleResult>> {
    return getStatistiqueGenerale(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStatistiqueGenerale$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatistiqueGenerale(params?: GetStatistiqueGenerale$Params, context?: HttpContext): Observable<StatistiqueGeneraleResult> {
    return this.getStatistiqueGenerale$Response(params, context).pipe(
      map((r: StrictHttpResponse<StatistiqueGeneraleResult>): StatistiqueGeneraleResult => r.body)
    );
  }

  /** Path part for operation `getStatistiqueFormation()` */
  static readonly GetStatistiqueFormationPath = '/Statistique/Formation/{formationId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStatistiqueFormation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatistiqueFormation$Response(params: GetStatistiqueFormation$Params, context?: HttpContext): Observable<StrictHttpResponse<StatistiqueFormationResult>> {
    return getStatistiqueFormation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStatistiqueFormation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatistiqueFormation(params: GetStatistiqueFormation$Params, context?: HttpContext): Observable<StatistiqueFormationResult> {
    return this.getStatistiqueFormation$Response(params, context).pipe(
      map((r: StrictHttpResponse<StatistiqueFormationResult>): StatistiqueFormationResult => r.body)
    );
  }

  /** Path part for operation `getStatistiqueEvent()` */
  static readonly GetStatistiqueEventPath = '/Statistique/Event/{eventId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStatistiqueEvent()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatistiqueEvent$Response(params: GetStatistiqueEvent$Params, context?: HttpContext): Observable<StrictHttpResponse<StatistiqueEventResult>> {
    return getStatistiqueEvent(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStatistiqueEvent$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatistiqueEvent(params: GetStatistiqueEvent$Params, context?: HttpContext): Observable<StatistiqueEventResult> {
    return this.getStatistiqueEvent$Response(params, context).pipe(
      map((r: StrictHttpResponse<StatistiqueEventResult>): StatistiqueEventResult => r.body)
    );
  }

  /** Path part for operation `getStatistiqueDemande()` */
  static readonly GetStatistiqueDemandePath = '/Statistique/Demande';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStatistiqueDemande()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatistiqueDemande$Response(params?: GetStatistiqueDemande$Params, context?: HttpContext): Observable<StrictHttpResponse<StatistiqueDemandeResult>> {
    return getStatistiqueDemande(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStatistiqueDemande$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatistiqueDemande(params?: GetStatistiqueDemande$Params, context?: HttpContext): Observable<StatistiqueDemandeResult> {
    return this.getStatistiqueDemande$Response(params, context).pipe(
      map((r: StrictHttpResponse<StatistiqueDemandeResult>): StatistiqueDemandeResult => r.body)
    );
  }

  /** Path part for operation `getStatistiqueDemandeByDepartement()` */
  static readonly GetStatistiqueDemandeByDepartementPath = '/Statistique/Demande/{departementId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStatistiqueDemandeByDepartement()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatistiqueDemandeByDepartement$Response(params: GetStatistiqueDemandeByDepartement$Params, context?: HttpContext): Observable<StrictHttpResponse<StatistiqueDemandeByDepartementResult>> {
    return getStatistiqueDemandeByDepartement(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStatistiqueDemandeByDepartement$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatistiqueDemandeByDepartement(params: GetStatistiqueDemandeByDepartement$Params, context?: HttpContext): Observable<StatistiqueDemandeByDepartementResult> {
    return this.getStatistiqueDemandeByDepartement$Response(params, context).pipe(
      map((r: StrictHttpResponse<StatistiqueDemandeByDepartementResult>): StatistiqueDemandeByDepartementResult => r.body)
    );
  }

}
