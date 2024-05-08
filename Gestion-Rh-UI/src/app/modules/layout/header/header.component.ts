import { Component ,OnInit} from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { Departement, User } from '../../../services/models';
import {Router} from '@angular/router';
import { DepartementService } from '../../../services/services';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles?: any[];
  submenu : RouteInfo[];
}
export const ROUTES: RouteInfo[] = [
  {path: 'dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '', roles: ['RRH','SUP_H'], submenu: []},
  {
    path: '',
    title: 'Demandes',
    icon: 'fas fa-users text-yellow',
    class: 'dropdown-toggle',
    roles: [ 'EMPLOYE','RRH','SUP_H']
    , submenu: [
      {
        path: 'mesdemande',
        title: 'Mes demandes',
        icon: 'fas fa-users text-yellow',
        class: '',
        roles: [ 'EMPLOYE','RRH','SUP_H']
        , submenu: []
      },
      {
        path: 'gererdemande',
        title: 'Traiter Demandes',
        icon: 'ni-glasses-2 text-yellow',
        class: '',
        roles: ['RRH','SUP_H']
        , submenu: []
      },
    ]
  },
  {
    path: 'formations',
    title: 'Formation',
    icon: 'ni-world text-blue',
    class: '',
    roles: ['EMPLOYE','RRH','SUP_H']
    , submenu: []
  },
  {
    path: '',
    title: 'Departements',
    icon: 'ni-world text-blue',
    class: 'dropdown-toggle',
    roles: ['RRH','SUP_H']
    , submenu: [
      {
        path: 'departement/:id',
        title: 'Informatique',
        icon: 'ni-world text-blue',
        class: '',
        roles: ['RRH','SUP_H']
        , submenu: []
      },  {
        path: 'departement/:id',
        title: 'Finance',
        icon: 'ni-world text-blue',
        class: '',
        roles: ['RRH','SUP_H']
        , submenu: []
      },  {
        path: 'departement/:id',
        title: 'Ressources_Humaine',
        icon: 'ni-world text-blue',
        class: '',
        roles: ['RRH','SUP_H']
        , submenu: []
      },
    ]
  },
  {
    path: 'event',
    title: 'Événement',
    icon: 'ni-tag text-orange',
    class: '',
    roles: ['EMPLOYE','RRH','SUP_H']
    , submenu: []
  },
  {
    path: 'chat',
    title: 'Messagerie',
    icon: 'ni-settings text-red',
    class: '',
    roles: ['EMPLOYE','RRH','SUP_H']
    , submenu: []
  },
  {
    path: 'users',
    title: 'Employé',
    icon: 'ni-settings text-red',
    class: '',
    roles: ['RRH','SUP_H']
    , submenu: []
  },
  {
    path: 'calendrier',
    title: 'Calendrier',
    icon: 'ni-settings text-red',
    class: '',
    roles: ['RRH','SUP_H']
    , submenu: []
  },
];
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  public menuItems1!:any[];
  public isCollapsed = true;
  constructor(
    public tokenService: TokenService,
    public departmentSevice: DepartementService,
      private router: Router
  ) {}

departements:Departement[]=[];
ngOnInit() {
  const userRole = this.tokenService.userRole() ;
  console.log("rs:",userRole);

  if (userRole) {
    // const role = userRole.authority;
    this.menuItems1 = ROUTES.filter(menuItem => {
      console.log("mm:",menuItem);
      console.log("mm1:",this.menuItems1);
      if (menuItem.roles && menuItem.roles.includes(userRole)) {
      
        return true;
      }
      return false;
    });
  } else {
   this.router.navigate(['login']);
  }
  this.router.events.subscribe((event) => {
    this.isCollapsed = true;
  });
}




  // ngOnInit(): void {
  //     this.departmentSevice.findAll3()
  //     .subscribe(departements=>{
  //       this.departements=departements;
  //     })
  // }
  




isActive(route: string): boolean {
return true;
}
  notifications: string[] = ['notif1','notif2','notif3','notif4'];
}

