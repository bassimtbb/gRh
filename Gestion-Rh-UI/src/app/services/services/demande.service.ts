/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add5 } from '../fn/demande/add-5';
import { Add5$Params } from '../fn/demande/add-5';
import { delete5 } from '../fn/demande/delete-5';
import { Delete5$Params } from '../fn/demande/delete-5';
import { Demande } from '../models/demande';
import { DemandeDto } from '../models/demande-dto';
import { findAll5 } from '../fn/demande/find-all-5';
import { FindAll5$Params } from '../fn/demande/find-all-5';
import { findById5 } from '../fn/demande/find-by-id-5';
import { FindById5$Params } from '../fn/demande/find-by-id-5';
import { generatePdf } from '../fn/demande/generate-pdf';
import { GeneratePdf$Params } from '../fn/demande/generate-pdf';
import { getDemandeBydepartementId } from '../fn/demande/get-demande-bydepartement-id';
import { GetDemandeBydepartementId$Params } from '../fn/demande/get-demande-bydepartement-id';
import { getDemandeByStatut } from '../fn/demande/get-demande-by-statut';
import { GetDemandeByStatut$Params } from '../fn/demande/get-demande-by-statut';
import { getDemandeByUtilisateurId } from '../fn/demande/get-demande-by-utilisateur-id';
import { GetDemandeByUtilisateurId$Params } from '../fn/demande/get-demande-by-utilisateur-id';
import { setStatut1 } from '../fn/demande/set-statut-1';
import { SetStatut1$Params } from '../fn/demande/set-statut-1';
import { update5 } from '../fn/demande/update-5';
import { Update5$Params } from '../fn/demande/update-5';

@Injectable({ providedIn: 'root' })
export class DemandeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findById5()` */
  static readonly FindById5Path = '/demande/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById5()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById5$Response(params: FindById5$Params, context?: HttpContext): Observable<StrictHttpResponse<DemandeDto>> {
    return findById5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById5(params: FindById5$Params, context?: HttpContext): Observable<DemandeDto> {
    return this.findById5$Response(params, context).pipe(
      map((r: StrictHttpResponse<DemandeDto>): DemandeDto => r.body)
    );
  }

  /** Path part for operation `update5()` */
  static readonly Update5Path = '/demande/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update5()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update5$Response(params: Update5$Params, context?: HttpContext): Observable<StrictHttpResponse<DemandeDto>> {
    return update5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update5$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update5(params: Update5$Params, context?: HttpContext): Observable<DemandeDto> {
    return this.update5$Response(params, context).pipe(
      map((r: StrictHttpResponse<DemandeDto>): DemandeDto => r.body)
    );
  }

  /** Path part for operation `delete5()` */
  static readonly Delete5Path = '/demande/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete5()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete5$Response(params: Delete5$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return delete5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete5(params: Delete5$Params, context?: HttpContext): Observable<string> {
    return this.delete5$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `add5()` */
  static readonly Add5Path = '/demande';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add5()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add5$Response(params: Add5$Params, context?: HttpContext): Observable<StrictHttpResponse<DemandeDto>> {
    return add5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add5$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add5(params: Add5$Params, context?: HttpContext): Observable<DemandeDto> {
    return this.add5$Response(params, context).pipe(
      map((r: StrictHttpResponse<DemandeDto>): DemandeDto => r.body)
    );
  }

  /** Path part for operation `setStatut1()` */
  static readonly SetStatut1Path = '/demande/statut/{demandeId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setStatut1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setStatut1$Response(params: SetStatut1$Params, context?: HttpContext): Observable<StrictHttpResponse<DemandeDto>> {
    return setStatut1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setStatut1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setStatut1(params: SetStatut1$Params, context?: HttpContext): Observable<DemandeDto> {
    return this.setStatut1$Response(params, context).pipe(
      map((r: StrictHttpResponse<DemandeDto>): DemandeDto => r.body)
    );
  }

  /** Path part for operation `getDemandeByStatut()` */
  static readonly GetDemandeByStatutPath = '/demande/statut/{statut}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDemandeByStatut()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDemandeByStatut$Response(params: GetDemandeByStatut$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Demande>>> {
    return getDemandeByStatut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDemandeByStatut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDemandeByStatut(params: GetDemandeByStatut$Params, context?: HttpContext): Observable<Array<Demande>> {
    return this.getDemandeByStatut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Demande>>): Array<Demande> => r.body)
    );
  }

  /** Path part for operation `generatePdf()` */
  static readonly GeneratePdfPath = '/demande/pdf/{demandeId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generatePdf()` instead.
   *
   * This method doesn't expect any request body.
   */
  generatePdf$Response(params: GeneratePdf$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return generatePdf(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `generatePdf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  generatePdf(params: GeneratePdf$Params, context?: HttpContext): Observable<string> {
    return this.generatePdf$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `findAll5()` */
  static readonly FindAll5Path = '/demande/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll5()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll5$Response(params?: FindAll5$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DemandeDto>>> {
    return findAll5(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll5(params?: FindAll5$Params, context?: HttpContext): Observable<Array<DemandeDto>> {
    return this.findAll5$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DemandeDto>>): Array<DemandeDto> => r.body)
    );
  }

  /** Path part for operation `getDemandeByUtilisateurId()` */
  static readonly GetDemandeByUtilisateurIdPath = '/demande/Utilisateur/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDemandeByUtilisateurId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDemandeByUtilisateurId$Response(params: GetDemandeByUtilisateurId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Demande>>> {
    return getDemandeByUtilisateurId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDemandeByUtilisateurId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDemandeByUtilisateurId(params: GetDemandeByUtilisateurId$Params, context?: HttpContext): Observable<Array<Demande>> {
    return this.getDemandeByUtilisateurId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Demande>>): Array<Demande> => r.body)
    );
  }

  /** Path part for operation `getDemandeBydepartementId()` */
  static readonly GetDemandeBydepartementIdPath = '/demande/Departement/{departementId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDemandeBydepartementId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDemandeBydepartementId$Response(params: GetDemandeBydepartementId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Demande>>> {
    return getDemandeBydepartementId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDemandeBydepartementId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDemandeBydepartementId(params: GetDemandeBydepartementId$Params, context?: HttpContext): Observable<Array<Demande>> {
    return this.getDemandeBydepartementId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Demande>>): Array<Demande> => r.body)
    );
  }

}
