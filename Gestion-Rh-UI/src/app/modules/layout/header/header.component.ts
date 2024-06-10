import { Component ,EventEmitter,OnInit, Output} from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { Departement, DepartementDto, Notification, NotificationDto, User } from '../../../services/models';
import {Router} from '@angular/router';
import { DepartementService, NotificationService, UserService } from '../../../services/services';
import { NotificationsService } from '../.././layout/NotificationsService';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles?: any[];
  submenu : RouteInfo[];
}
export const ROUTES: RouteInfo[] = [
    // {
    //   path: 'dashboard',
    //   title: 'Tableau de bord',
    //   icon: 'bi bi-speedometer',  // Filled Bootstrap icon for dashboard
    //   class: '',
    //   roles: ['RRH','SUP_H'],
    //   submenu: []
    // },
    {
      path: 'mesdemande',
      title: 'Mes demandes',
      icon: 'bi bi-file-earmark-text-fill',  // Filled Bootstrap icon for file
      class: '',
      roles: ['EMPLOYE'],
      submenu: []
    },
    {
      path: '',
      title: 'Demandes',
      icon: 'bi bi-inbox-fill',  // Filled Bootstrap icon for inbox
      class: 'dropdown-toggle',
      roles: ['RRH','SUP_H'],
      submenu: [
        {
          path: 'mesdemande',
          title: 'Mes demandes',
          icon: 'bi bi-file-earmark-text-fill',  // Filled Bootstrap icon for file
          class: '',
          roles: ['RRH','SUP_H'],
          submenu: []
        },
        {
          path: 'gererdemande',
          title: 'Traiter Demandes',
          icon: 'bi bi-gear-fill',  // Filled Bootstrap icon for settings
          class: '',
          roles: ['RRH','SUP_H'],
          submenu: []
        },
      ]
    },
    {
      path: 'formations',
      title: 'Formation',
      icon: 'bi bi-mortarboard-fill',  // Filled Bootstrap icon for graduation cap
      class: '',
      roles: ['EMPLOYE','RRH','SUP_H'],
      submenu: []
    },
    // {
    //   path: 'event',
    //   title: 'Événement',
    //   icon: 'bi bi-calendar-event-fill',  // Filled Bootstrap icon for calendar event
    //   class: '',
    //   roles: ['EMPLOYE','RRH','SUP_H'],
    //   submenu: []
    // },
    // {
    //   path: 'chat',
    //   title: 'Messagerie',
    //   icon: 'bi bi-chat-dots-fill',  // Filled Bootstrap icon for chat
    //   class: '',
    //   roles: ['EMPLOYE','RRH','SUP_H'],
    //   submenu: []
    // },
    {
      path: 'users',
      title: 'Employé',
      icon: 'bi bi-people-fill',  // Filled Bootstrap icon for people
      class: '',
      roles: ['RRH'],
      submenu: []
    },
    // {
    //   path: 'calendrier',
    //   title: 'Calendrier',
    //   icon: 'bi bi-calendar-fill',  // Filled Bootstrap icon for calendar
    //   class: '',
    //   roles: ['RRH','SUP_H','EMPLOYE'],
    //   submenu: []
    // }
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
  user !:User;
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
        this.user=user;

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
                icon: '',
                class: '',
                roles: ['RRH'],
                submenu: []
              });
            }
            departmentRoutes.push({
              path: '',
              title: 'Départements',
              icon: 'bi bi-building-fill',
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
                  icon: 'bi bi-building-fill',
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
    this.ngOnInit();
  }
  isActive(route: string): boolean {
    return true;
  }
   Readed(notif :Notification):string{
    if(!notif.statut){
      return "dropdown-item ";
    }else{
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
    case "DEMANDE_REJETEE_SUPH":
       return"mesDemandes" ; 
        break;
    case "DEMANDE_VALIDEE_RRH":
    return"mesDemandes" ;
        break;
    case "DEMANDE_VALIDEE_SUPH":
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
