import { Component ,OnInit} from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { Departement, DepartementDto, User } from '../../../services/models';
import {Router} from '@angular/router';
import { DepartementService, UserService } from '../../../services/services';

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
    roles: ['RRH']
    , submenu: []
  },
  {
    path: 'calendrier',
    title: 'Calendrier',
    icon: 'ni-settings text-red',
    class: '',
    roles: ['RRH','SUP_H']
    , submenu: []
  }
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
  userDepartmentID: number=0 ;
  notifications: any;


  constructor(
    public tokenService: TokenService,
    public userService: UserService,
    public departmentService: DepartementService,
    private router: Router
  ) {}

  
  ngOnInit() {
    const userRole = this.tokenService.userRole();
    console.log("rs:", userRole);

    if (userRole) {
      this.departmentService.findAll4()
        .subscribe(departments => {
          this.departments = departments;


          const departmentRoutes: RouteInfo[] = [];
          if (userRole === 'RRH') {
            const departmentSubmenu: RouteInfo[] = [];
            for (const department of departments) {
              departmentSubmenu.push({
                path: `departement/${department.id}`,
                title: department?.name ?? 'Département',
                icon: 'ni-world text-blue',
                class: '',
                roles: ['RRH'],
                submenu: []
              });
            }
            departmentRoutes.push({
              path: '',
              title: 'Départements',
              icon: 'ni-world text-blue',
              class: 'dropdown-toggle',
              roles: ['RRH'],
              submenu: departmentSubmenu
            });
          }

          const departmentRoutesSup: RouteInfo[] = [];
          this.userService.findById({ id: this.tokenService.Id as number })
            .subscribe(user => {
              if (user.departement) {
                departmentRoutesSup.push({
                  path: `departement/${user.departement.id}`,
                  title: "Département",
                  icon: 'ni-world text-blue',
                  class: '',
                  roles: ['SUP_H'],
                  submenu: []
                });
              }
              const filteredRoutes =ROUTES.concat(departmentRoutesSup, departmentRoutes).filter(menuItem => menuItem.roles && menuItem.roles.includes(userRole));

              this.menuItems1 = filteredRoutes;
              console.log(ROUTES);
              console.log(userRole);
              console.log(this.menuItems1);
            });
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