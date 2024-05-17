import { Component ,EventEmitter,OnInit, Output} from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { Departement, DepartementDto, Notification, NotificationDto, User } from '../../../services/models';
import {Router} from '@angular/router';
import { DepartementService, NotificationService, UserService } from '../../../services/services';
import { NotificationsService } from '../../../services/NotificationsService';

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
  notifications: Notification[]=[];
  notificationNotReaded:Notification[]=[];
  userRole:any;
  constructor(
    public tokenService: TokenService,
    public userService: UserService,
    public departmentService: DepartementService,
    public notificationService: NotificationService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  
  ngOnInit() {

     this.userRole = this.tokenService.userRole();
    console.log("rs:", this.userRole);
    const userId = this.tokenService.Id; 


    this.userService.findById({id: userId as number }) 
      .subscribe(user => {
        this.notifications=user.notifications!;
        for (const notif of this.notifications) {
          if (notif.statut === true) {
            this.notificationNotReaded.push(notif);
          }
        }
    

      })
    if (this.userRole) {
      this.departmentService.findAll4()
        .subscribe(departments => {
          this.departments = departments;


          const departmentRoutes: RouteInfo[] = [];
          if (this.userRole === 'RRH') {
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
              const filteredRoutes =ROUTES.concat(departmentRoutesSup, departmentRoutes).filter(menuItem => menuItem.roles && menuItem.roles.includes(this.userRole));

              this.menuItems1 = filteredRoutes;
              console.log(ROUTES);
              console.log(this.userRole);
              console.log(this.menuItems1);
            });
        });
        this.notificationsService. reloadNotification$.subscribe(() => {
          this.reloadNotif();
        });
        
    } else {
      this.router.navigate(['login']);
    }

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });

    // Notifications (unchanged)
   
  }
  

  reloadNotif() {
    console.log("reloadNotif() ")
    this.ngOnInit();
  }
  isActive(route: string): boolean {
    return true;
  }
   Readed(notif :Notification):string{
    if(!notif.statut){
      console.log( "dropdown-item NotifReaded")
      return "dropdown-item ";
    }else{
      console.log( "dropdown-item ")
      return "dropdown-item NotifReaded";
    }
  }
  setStatut(notif :NotificationDto){
    const notificationDto:NotificationDto={
      ...notif,
      statut:false
    }
    this.notificationService.update1({id:notif.id as number ,body:notificationDto as NotificationDto})
    .subscribe(statut=>{
    
    

  })
  console.log(this.notificationNotReaded.length);
  this.ngOnInit();
}

  get lastFiveNotifications() {
    return this.notifications.slice(-5);
  }

 linkNotif(notif :Notification):string{
  const type =notif.type;
  const role=this.userRole;
  
  switch (type) {
    case "DEMANDE_A_DEPOSER":
      return"gererdemande" ;
        break;
    case "DEMANDE_REJETEE_RRH":

 return"mesDemandes" ;
        break;
    case "DEMANDE_REJETEE_SUPERVISEUR":
       return"mesDemandes" ; 
        break;
    case "DEMANDE_VALIDEE_RRH":
    return"mesDemandes" ;
        break;
    case "DEMANDE_VALIDEE_SUPERVISEUR":
      if(notif.description==="Votre demande a été acceptée par le supérieur hiérarchique ."){
        return"mesDemandes" ;
      }else{
        return"gererdemande" ;
      }
   
        break;
    case "EVENEMENT_INSCRIRE":
 return"event" ;
        break;
    case "FORMATION_INSCRIRE":
   return"formations" ;
        break;
    default:
      return"profile" ;
};


}

}
