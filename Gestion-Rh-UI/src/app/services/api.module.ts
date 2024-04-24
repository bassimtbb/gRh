/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { UtilisateurControllerService } from './services/utilisateur-controller.service';
import { PublicationControllerService } from './services/publication-controller.service';
import { FormationControllerService } from './services/formation-controller.service';
import { EventControllerService } from './services/event-controller.service';
import { DepartementControllerService } from './services/departement-controller.service';
import { AcompteControllerService } from './services/acompte-controller.service';
import { AutorisationTravailSupControllerService } from './services/autorisation-travail-sup-controller.service';
import { AutorisationTeletravailControllerService } from './services/autorisation-teletravail-controller.service';
import { PretControllerService } from './services/pret-controller.service';
import { OrdreMissionControllerService } from './services/ordre-mission-controller.service';
import { CongeControllerService } from './services/conge-controller.service';
import { ChangementHoraireControllerService } from './services/changement-horaire-controller.service';
import { AutorisationSortieControllerService } from './services/autorisation-sortie-controller.service';
import { AuthenticationService } from './services/authentication.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    UtilisateurControllerService,
    PublicationControllerService,
    FormationControllerService,
    EventControllerService,
    DepartementControllerService,
    AcompteControllerService,
    AutorisationTravailSupControllerService,
    AutorisationTeletravailControllerService,
    PretControllerService,
    OrdreMissionControllerService,
    CongeControllerService,
    ChangementHoraireControllerService,
    AutorisationSortieControllerService,
    AuthenticationService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
