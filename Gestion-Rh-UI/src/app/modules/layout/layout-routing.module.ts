import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../services/guard/auth.guard';
import { MainComponent } from './pages/main/main.component';
import { MesDemandesComponent } from './pages/mes-demandes/mes-demandes.component';
import { FormationComponent } from './pages/formation/formation.component';
import { EventComponent } from './pages/event/event.component';
import { ChatComponent } from './pages/chat/chat.component';
import { GererDemandesComponent } from './pages/gerer-demandes/gerer-demandes.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/users/users.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children:[              
      {path:'mesDemandes',component:MesDemandesComponent,canActivate: [authGuard]},
      {path:'formations',component:FormationComponent,canActivate: [authGuard]},
      {path:'event',component:EventComponent,canActivate: [authGuard]},
      {path:'chat',component:ChatComponent,canActivate: [authGuard]},
      {path:'GererDemandes',component:GererDemandesComponent,canActivate: [authGuard]},
      {path:'profile',component:ProfileComponent,canActivate: [authGuard]},
      {path:'users',component:UsersComponent,canActivate: [authGuard]},
      {path:'UserDetails',component:ManageUserComponent,canActivate: [authGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
