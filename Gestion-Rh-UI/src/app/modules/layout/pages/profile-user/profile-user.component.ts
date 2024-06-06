import { Component, OnInit } from '@angular/core';
import { AcompteDto, AutorisationSortieDto, AutorisationTeletravailDto, AutorisationTravailSupDto, ChangementHoraireDto, CongeDto, Demande, DemandeDto, Departement, PretDto, User, UserDto } from '../../../../services/models';
import { AcompteService, AutorisationSortieService, AutorisationTeletravailService, AutorisationTravailSupService, ChangementHoraireService, CongeService, DemandeService, DepartementService, NotificationService, PretService, UserService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';
import { NotificationsService } from '../../NotificationsService';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  demandeUpdate!: DemandeDto;
  modifADS:AutorisationSortieDto={};
  modifConge:CongeDto={};
  modifAutTeletravail:AutorisationTeletravailDto={};
  modifAutTravailSupp:  AutorisationTravailSupDto={}
  modifChHoraire: ChangementHoraireDto={}
  modifAcompte: AcompteDto={}
  modifPret : PretDto={}
   Msg!: string;
  alert!: string;
  inputsDisabled = true;
  togglenav = true;
  datePickerId = new Date().toISOString().split("T")[0];
  nbrToutDemande:number=0;
  nbrDemandeValide:number=0;
  nbrDemandeRefuser:number=0;
  nbrDemandeEnattente:number=0;
  toggle(ok : boolean){
    this.togglenav= ok;
    this.ngOnInit();
  }
  toggleInputs() {
    this.inputsDisabled = !this.inputsDisabled;
    this.ngOnInit();

  }
constructor(
  private  demandeService:DemandeService,
  private  congeService:CongeService,
  private userService:UserService,
  private tokenService :TokenService,
  private autTeletravailService:AutorisationTeletravailService,
  private autTravailSuppService:  AutorisationTravailSupService,
  private chHoraireService: ChangementHoraireService,
  private acompteService: AcompteService,
  private pretService: PretService,
  private autorisationSortieService :AutorisationSortieService,
  private  notificationService:NotificationService,
  private route: ActivatedRoute,

  private notificationsService: NotificationsService


){}
  user!:UserDto;
 departement!: Departement;
 demandes:Demande[]=[];
  departementDemandes:Demande[]=[];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Id = params.get('id');
      if (Id) {
        const UserId = parseInt(Id, 10); 
        this.userService.findById({ id: UserId })
          .pipe(
            catchError(error => {
              console.error('Error fetching user:', error);
              // Handle the error, e.g., show a notification
              return of(null);
            })
          )
          .subscribe(user => { 
            if (user) {
              this.user = user;
              this.demandeService.getDemandeByUtilisateurId({ userId: user.id as number })
                .pipe(
                  catchError(error => {
                    console.error('Error fetching demandes:', error);
                    // Handle the error, e.g., show a notification
                    return of([]);
                  })
                )
                .subscribe(demandes => { 
                  this.demandes = demandes;
                  this.nbrToutDemande = demandes.length;
                this.nbrDemandeEnattente = demandes.filter(d => d.statut === 'En_attente_Sup_H' || d.statut === 'En_attente_RRH').length;
                this.nbrDemandeRefuser = demandes.filter(d => d.statut === 'Refusee_Sup_H' || d.statut === 'Refusee').length;
                this.nbrDemandeValide = demandes.filter(d => d.statut === 'Validee').length;
             
                });
            }
          });
      }
    });


  }

  getStatusClass(statut: any): string {
    switch (statut) {
      case 'Validee':
        return 'valid bi-check-circle-fill';
      case 'En_attente_Sup_H':
        return 'pending bi-dash-circle-fill';
      case 'Refusee_Sup_H':
        return 'rejected bi-x-circle-fill';
        case 'En_attente_RRH':
          return 'pending bi-dash-circle-fill';
        case 'Refusee':
          return 'rejected bi-x-circle-fill';
        default:
        return '';
    }
  }
  
    refuse_Sup(demande :DemandeDto ){
      const IdUser = demande.utilisateur?.id ;
      const IdDemande = demande.id ;
      const Type = demande.type ;
      switch (Type) {
        case "Conge":
          this.congeService.findById10({id: IdDemande as number})
          .subscribe(demande => {
            this.modifConge=demande;
          }
          )
          this.userService.findById({id: IdUser as number  })
          .subscribe(user => {
            this.modifConge={
              ...this.modifConge,
              utilisateur:user,
              statut:'Refusee_Sup_H',
              departement:{"id":user.departement?.id as number}
            }
            console.log("this.modifConge",this.modifConge);
      
          this.congeService.update10({id:this.modifConge.id as number, body :this.modifConge })
          .subscribe ( demande => 
            { 
                this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_SUPH', error);
              }
  
            ) 
              this.Msg = `Demande de Congé modifiée avec succès!"!`;
              this.alert ="alert alert-success" ;
              this.ngOnInit();
              console.log("Valid")
              setTimeout(() => {
              this.alert = 'd-none';
              }, 5000); 
            });
        }); 
        break; 
        case "AutorisationSortie":
            this.autorisationSortieService.findById12({id: IdDemande as number})
      .subscribe(demande => {
        this.modifADS=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifADS={
          ...this.modifADS,
          utilisateur:user,
          statut:'Refusee_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifADS",this.modifADS);
  
      this.autorisationSortieService.update12({id:this.modifADS.id as number, body :this.modifADS })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_SUPH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });     
        break;
        case "AutorisationTeletravail":
            this.autTeletravailService.findById8({id: IdDemande as number})
      .subscribe(demande => {
        this.modifAutTeletravail=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifAutTeletravail={
          ...this.modifAutTeletravail,
          utilisateur:user,
          statut:'Refusee_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifConge",this.modifAutTeletravail);
  
      this.autTeletravailService.update8({id:this.modifAutTeletravail.id as number, body :this.modifAutTeletravail })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_SUPH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });     
        break;
        case "AutorisationTravailSup":
      this.autTravailSuppService.findById7({id: IdDemande as number})
      .subscribe(demande => {
        this.modifAutTravailSupp=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifAutTravailSupp={
          ...this.modifAutTravailSupp,
          utilisateur:user,
          statut:'Refusee_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifAutTravailSupp",this.modifAutTravailSupp);
  
      this.autTravailSuppService.update7({id:this.modifAutTravailSupp.id as number, body :this.modifAutTravailSupp })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_SUPH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
        break;
        case "ChangementHoraire":
            this.chHoraireService.findById11({id: IdDemande as number})
      .subscribe(demande => {
        this.modifChHoraire=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifChHoraire={
          ...this.modifChHoraire,
          utilisateur:user,
          statut:'Refusee_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifChHoraire",this.modifChHoraire);
  
      this.chHoraireService.update11({id:this.modifChHoraire.id as number, body :this.modifChHoraire })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_SUPH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });       
        break;
        case "Acompte":
             
        this.acompteService.findById6({id: IdDemande as number})
      .subscribe(demande => {
        this.modifAcompte=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifAcompte={
          ...this.modifAcompte,
          utilisateur:user,
          statut:'Refusee_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifAcompte",this.modifAcompte);
  
      this.acompteService.update6({id:this.modifAcompte.id as number, body :this.modifAcompte })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_SUPH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
        break;
        case "Pret":
            this.pretService.findById9({id: IdDemande as number})
      .subscribe(demande => {
        this.modifPret=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifPret={
          ...this.modifPret,
          utilisateur:user,
          statut:'Refusee_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifPret",this.modifPret);
  
      this.pretService.update9({id:this.modifPret.id as number, body :this.modifPret })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_SUPH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });     
        break;
        }
    }
  
  
    refuse_RRH(demande :DemandeDto ){
      const IdUser = demande.utilisateur?.id ;
      const IdDemande = demande.id ;
      const Type = demande.type ;
      switch (Type) {
        case "Conge":
          this.congeService.findById10({id: IdDemande as number})
          .subscribe(demande => {
            this.modifConge=demande;
          }
          )
          this.userService.findById({id: IdUser as number  })
          .subscribe(user => {
            this.modifConge={
              ...this.modifConge,
              utilisateur:user,
              statut:'Refusee',
              departement:{"id":user.departement?.id as number}
            }
            console.log("this.modifConge",this.modifConge);
      
          this.congeService.update10({id:this.modifConge.id as number, body :this.modifConge })
          .subscribe ( demande => 
            { 
                this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_RRH', error);
              }
  
            ) 
              this.Msg = `Demande de Congé modifiée avec succès!"!`;
              this.alert ="alert alert-success" ;
              this.ngOnInit();
              console.log("Valid")
              setTimeout(() => {
              this.alert = 'd-none';
              }, 5000); 
            });
        }); 
        break; 
        case "AutorisationSortie":
            this.autorisationSortieService.findById12({id: IdDemande as number})
      .subscribe(demande => {
        this.modifADS=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifADS={
          ...this.modifADS,
          utilisateur:user,
          statut:'Refusee',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifADS",this.modifADS);
  
      this.autorisationSortieService.update12({id:this.modifADS.id as number, body :this.modifADS })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_RRH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });     
        break;
        case "AutorisationTeletravail":
            this.autTeletravailService.findById8({id: IdDemande as number})
      .subscribe(demande => {
        this.modifAutTeletravail=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifAutTeletravail={
          ...this.modifAutTeletravail,
          utilisateur:user,
          statut:'Refusee',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifConge",this.modifAutTeletravail);
  
      this.autTeletravailService.update8({id:this.modifAutTeletravail.id as number, body :this.modifAutTeletravail })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_RRH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });     
        break;
        case "AutorisationTravailSup":
      this.autTravailSuppService.findById7({id: IdDemande as number})
      .subscribe(demande => {
        this.modifAutTravailSupp=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifAutTravailSupp={
          ...this.modifAutTravailSupp,
          utilisateur:user,
          statut:'Refusee',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifAutTravailSupp",this.modifAutTravailSupp);
  
      this.autTravailSuppService.update7({id:this.modifAutTravailSupp.id as number, body :this.modifAutTravailSupp })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_RRH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
        break;
        case "ChangementHoraire":
            this.chHoraireService.findById11({id: IdDemande as number})
      .subscribe(demande => {
        this.modifChHoraire=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifChHoraire={
          ...this.modifChHoraire,
          utilisateur:user,
          statut:'Refusee',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifChHoraire",this.modifChHoraire);
  
      this.chHoraireService.update11({id:this.modifChHoraire.id as number, body :this.modifChHoraire })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_RRH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });       
        break;
        case "Acompte":
             
        this.acompteService.findById6({id: IdDemande as number})
      .subscribe(demande => {
        this.modifAcompte=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifAcompte={
          ...this.modifAcompte,
          utilisateur:user,
          statut:'Refusee',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifAcompte",this.modifAcompte);
  
      this.acompteService.update6({id:this.modifAcompte.id as number, body :this.modifAcompte })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_RRH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
        break;
        case "Pret":
            this.pretService.findById9({id: IdDemande as number})
      .subscribe(demande => {
        this.modifPret=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifPret={
          ...this.modifPret,
          utilisateur:user,
          statut:'Refusee',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifPret",this.modifPret);
  
      this.pretService.update9({id:this.modifPret.id as number, body :this.modifPret })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_REJETEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_REJETEE_RRH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });     
        break;
        }
    }
  
  
    valid_RRH(demande :DemandeDto ){
      const IdUser = demande.utilisateur?.id ;
      const IdDemande = demande.id ;
      const Type = demande.type ;
      switch (Type) {
        case "Conge":
          this.congeService.findById10({id: IdDemande as number})
          .subscribe(demande => {
            this.modifConge=demande;
          }
          )
          this.userService.findById({id: IdUser as number  })
          .subscribe(user => {
            this.modifConge={
              ...this.modifConge,
              utilisateur:user,
              statut:'Validee',
              departement:{"id":user.departement?.id as number}
            }
            console.log("this.modifConge",this.modifConge);
      
          this.congeService.update10({id:this.modifConge.id as number, body :this.modifConge })
          .subscribe ( demande => 
            { 
                this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_RRH', error);
              }
  
            ) 
              this.Msg = `Demande de Congé modifiée avec succès!"!`;
              this.alert ="alert alert-success" ;
              this.ngOnInit();
              console.log("Valid")
              setTimeout(() => {
              this.alert = 'd-none';
              }, 5000); 
            });
        }); 
        break; 
        case "AutorisationSortie":
            this.autorisationSortieService.findById12({id: IdDemande as number})
      .subscribe(demande => {
        this.modifADS=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifADS={
          ...this.modifADS,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifADS",this.modifADS);
  
      this.autorisationSortieService.update12({id:this.modifADS.id as number, body :this.modifADS })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_RRH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });     
        break;
        case "AutorisationTeletravail":
            this.autTeletravailService.findById8({id: IdDemande as number})
      .subscribe(demande => {
        this.modifAutTeletravail=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifAutTeletravail={
          ...this.modifAutTeletravail,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifConge",this.modifAutTeletravail);
  
      this.autTeletravailService.update8({id:this.modifAutTeletravail.id as number, body :this.modifAutTeletravail })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_RRH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });     
        break;
        case "AutorisationTravailSup":
      this.autTravailSuppService.findById7({id: IdDemande as number})
      .subscribe(demande => {
        this.modifAutTravailSupp=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifAutTravailSupp={
          ...this.modifAutTravailSupp,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifAutTravailSupp",this.modifAutTravailSupp);
  
      this.autTravailSuppService.update7({id:this.modifAutTravailSupp.id as number, body :this.modifAutTravailSupp })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_RRH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
        break;
        case "ChangementHoraire":
            this.chHoraireService.findById11({id: IdDemande as number})
      .subscribe(demande => {
        this.modifChHoraire=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifChHoraire={
          ...this.modifChHoraire,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifChHoraire",this.modifChHoraire);
  
      this.chHoraireService.update11({id:this.modifChHoraire.id as number, body :this.modifChHoraire })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_RRH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });       
        break;
        case "Acompte":
             
        this.acompteService.findById6({id: IdDemande as number})
      .subscribe(demande => {
        this.modifAcompte=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifAcompte={
          ...this.modifAcompte,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifAcompte",this.modifAcompte);
  
      this.acompteService.update6({id:this.modifAcompte.id as number, body :this.modifAcompte })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_RRH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
        break;
        case "Pret":
            this.pretService.findById9({id: IdDemande as number})
      .subscribe(demande => {
        this.modifPret=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifPret={
          ...this.modifPret,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifPret",this.modifPret);
  
      this.pretService.update9({id:this.modifPret.id as number, body :this.modifPret })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_RRH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_RRH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_RRH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });     
        break;
        }
    }
  
  
    valid_Sup(demande :DemandeDto ){
      const IdUser = demande.utilisateur?.id ;
      const IdDemande = demande.id ;
      const Type = demande.type ;
      switch (Type) {
        case "Conge":
          this.congeService.findById10({id: IdDemande as number})
          .subscribe(demande => {
            this.modifConge=demande;
          }
          )
          this.userService.findById({id: IdUser as number  })
          .subscribe(user => {
            this.modifConge={
              ...this.modifConge,
              utilisateur:user,
              statut:'En_attente_RRH',
              departement:{"id":user.departement?.id as number}
            }
            console.log("this.modifConge",this.modifConge);
      
          this.congeService.update10({id:this.modifConge.id as number, body :this.modifConge })
          .subscribe ( demande => 
            { 
                this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_SUPH', error);
              }
  
            ) 
              this.Msg = `Demande de Congé modifiée avec succès!"!`;
              this.alert ="alert alert-success" ;
              this.ngOnInit();
              console.log("Valid")
              setTimeout(() => {
              this.alert = 'd-none';
              }, 5000); 
            });
        }); 
        break; 
        case "AutorisationSortie":
            this.autorisationSortieService.findById12({id: IdDemande as number})
      .subscribe(demande => {
        this.modifADS=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifADS={
          ...this.modifADS,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifADS",this.modifADS);
  
      this.autorisationSortieService.update12({id:this.modifADS.id as number, body :this.modifADS })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_SUPH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });     
        break;
        case "AutorisationTeletravail":
            this.autTeletravailService.findById8({id: IdDemande as number})
      .subscribe(demande => {
        this.modifAutTeletravail=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifAutTeletravail={
          ...this.modifAutTeletravail,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifConge",this.modifAutTeletravail);
  
      this.autTeletravailService.update8({id:this.modifAutTeletravail.id as number, body :this.modifAutTeletravail })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_SUPH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });     
        break;
        case "AutorisationTravailSup":
      this.autTravailSuppService.findById7({id: IdDemande as number})
      .subscribe(demande => {
        this.modifAutTravailSupp=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifAutTravailSupp={
          ...this.modifAutTravailSupp,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifAutTravailSupp",this.modifAutTravailSupp);
  
      this.autTravailSuppService.update7({id:this.modifAutTravailSupp.id as number, body :this.modifAutTravailSupp })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_SUPH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
        break;
        case "ChangementHoraire":
            this.chHoraireService.findById11({id: IdDemande as number})
      .subscribe(demande => {
        this.modifChHoraire=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifChHoraire={
          ...this.modifChHoraire,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifChHoraire",this.modifChHoraire);
  
      this.chHoraireService.update11({id:this.modifChHoraire.id as number, body :this.modifChHoraire })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_SUPH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });       
        break;
        case "Acompte":
             
        this.acompteService.findById6({id: IdDemande as number})
      .subscribe(demande => {
        this.modifAcompte=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifAcompte={
          ...this.modifAcompte,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifAcompte",this.modifAcompte);
  
      this.acompteService.update6({id:this.modifAcompte.id as number, body :this.modifAcompte })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_SUPH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
        break;
        case "Pret":
            this.pretService.findById9({id: IdDemande as number})
      .subscribe(demande => {
        this.modifPret=demande;
      }
      )
      this.userService.findById({id: IdUser as number  })
      .subscribe(user => {
        this.modifPret={
          ...this.modifPret,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.modifPret",this.modifPret);
  
      this.pretService.update9({id:this.modifPret.id as number, body :this.modifPret })
      .subscribe ( demande => 
        { 
            this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPH" })
            .subscribe( notif=>
              {console.log("Notification DEMANDE_VALIDEE_SUPH");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification DEMANDE_VALIDEE_SUPH', error);
              }
  
            ) 
          this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          console.log("Valid")
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    });     
        break;
        }
    }

    update(){
      this.userService.update({id:this.user.id as number , body :this.user as UserDto})
      .subscribe(user=> { 
        console.log('user updated')

      }, error => {
        console.error('Error updating email:', error);
      });
    }
}
