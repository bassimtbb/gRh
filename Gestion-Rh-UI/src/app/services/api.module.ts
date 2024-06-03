/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';
import { FormationService } from './services/formation.service';
import { EventService } from './services/event.service';
import { DepartementService } from './services/departement.service';
import { DemandeService } from './services/demande.service';
import { AcompteService } from './services/acompte.service';
import { AutorisationTravailSupService } from './services/autorisation-travail-sup.service';
import { AutorisationTeletravailService } from './services/autorisation-teletravail.service';
import { PretService } from './services/pret.service';
import { CongeService } from './services/conge.service';
import { ChangementHoraireService } from './services/changement-horaire.service';
import { AutorisationSortieService } from './services/autorisation-sortie.service';
import { AuthenticationService } from './services/authentication.service';
import { CalendarControllerService } from './services/calendar-controller.service';
import { StatistiqueService } from './services/statistique.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    UserService,
    NotificationService,
    FormationService,
    EventService,
    DepartementService,
    DemandeService,
    AcompteService,
    AutorisationTravailSupService,
    AutorisationTeletravailService,
    PretService,
    CongeService,
    ChangementHoraireService,
    AutorisationSortieService,
    AuthenticationService,
    CalendarControllerService,
    StatistiqueService,
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
