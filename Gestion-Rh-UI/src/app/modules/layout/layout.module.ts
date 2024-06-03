import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './pages/main/main.component';
import { MesDemandesComponent } from './pages/mes-demandes/mes-demandes.component';
import { FormationComponent } from './pages/formation/formation.component';
import { EventComponent } from './pages/event/event.component';
import { ChatComponent } from './pages/chat/chat.component';
import { GererDemandesComponent } from './pages/gerer-demandes/gerer-demandes.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/users/users.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { DepartementComponent } from './pages/departement/departement.component';
import { CalendrierComponent } from './pages/calendrier/calendrier.component';
import { ProfileUserComponent } from './pages/profile-user/profile-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    MesDemandesComponent,
    FormationComponent,
    EventComponent,
    ChatComponent,
    GererDemandesComponent,
    ProfileComponent,
    UsersComponent,
    ManageUserComponent,
    DepartementComponent,
    CalendrierComponent,
    ProfileUserComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    FullCalendarModule,
    NgxChartsModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class LayoutModule { }
