import { Component ,OnInit} from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { Departement, DepartementDto, User } from '../../../services/models';
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
    path: 'mesdemande',
    title: 'Mes demandes',
    icon: 'fas fa-users text-yellow',
    class: '',
    roles: [ 'EMPLOYE']
    , submenu: []
  },{
    path: '',
    title: 'Demandes',
    icon: 'fas fa-users text-yellow',
    class: 'dropdown-toggle',
    roles: [ 'RRH','SUP_H']
    , submenu: [
      {
        path: 'mesdemande',
        title: 'Mes demandes',
        icon: 'fas fa-users text-yellow',
        class: '',
        roles: [ 'RRH','SUP_H']
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

export class HeaderComponent implements OnInit {
  public menuItems1!: RouteInfo[];
  public isCollapsed = true;
  public departments: DepartementDto[] = [];
  notifications: any;

  constructor(
    public tokenService: TokenService,
    public departmentService: DepartementService,
    private router: Router
  ) {}

  ngOnInit() {
    const userRole = this.tokenService.userRole();
    console.log("rs:", userRole);

    if (userRole) {
      // Fetch departments from database using departmentService
      this.departmentService.findAll3()
        .subscribe(departments => {
          this.departments = departments;

          // Update ROUTES constant dynamically
          const departmentRoutes: RouteInfo[] = [];
          departmentRoutes.push({
            path: '',
            title: 'Départements',
            icon: 'ni-world text-blue',
            class: 'dropdown-toggle',
            roles: ['RRH', 'SUP_H'],
            submenu: [] // Initialize empty submenu
          });

          // Populate submenu with departments
          for (const department of departments) {
            departmentRoutes[0].submenu!.push({
              path: `departement/${department.id}`, // Customize path based on department ID
              title: department?.name ?? 'Départements',
              icon: 'ni-world text-blue',
              class: '',
              roles: ['RRH', 'SUP_H'],
              submenu: []
            });
          }

          // Update menuItems with filtered and dynamically populated ROUTES
          this.menuItems1 = ROUTES.filter(menuItem => menuItem.roles && menuItem.roles.includes(userRole))
                                     .concat(departmentRoutes); // Concatenate with department routes
        });

    } else {
      this.router.navigate(['login']);
    }

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });

    // Notifications (unchanged)
   
  }
  isActive(route: string): boolean {
    return true;
  }
}