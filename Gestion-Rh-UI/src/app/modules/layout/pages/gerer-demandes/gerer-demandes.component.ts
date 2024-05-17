import { Component } from '@angular/core';
import { AcompteDto, AutorisationSortieDto, AutorisationTeletravailDto, AutorisationTravailSupDto, ChangementHoraireDto, CongeDto, Demande, DemandeDto, Departement, PretDto, UserDto } from '../../../../services/models';
import { AcompteService, AutorisationSortieService, AutorisationTeletravailService, AutorisationTravailSupService, ChangementHoraireService, CongeService, DemandeService, NotificationService, PretService, UserService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';
import { NotificationsService } from '../../../../services/NotificationsService';

@Component({
  selector: 'app-gerer-demandes',
  templateUrl: './gerer-demandes.component.html',
  styleUrl: './gerer-demandes.component.scss'
})
export class GererDemandesComponent {
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

  private notificationsService: NotificationsService


){}
  user!:UserDto;
 departement!: Departement;
  allDemandes:Demande[]=[];
  departementDemandes:Demande[]=[];
  ngOnInit(): void {
    const Id = this.tokenService.Id;
    this.userService.findById({id: Id as number  })
      .subscribe(user => {
        this.user=user; 
        this.departement=user.departement!;
        if(this.departement.manager?.id==user.id && user.role!='RRH'){
        this.demandeService.getDemandeBydepartementId({"departementId":this.departement.id as number})
        .subscribe(
          demandes =>{ 
            this.allDemandes=[]
           this.allDemandes=demandes;
         }
       )}else{
        this.allDemandes=[];
        console.log("vide",this.allDemandes)
       this.demandeService.getDemandeByStatut({statut:'En_attente_RRH'})
       .subscribe(
        demandes =>{ 
          if(demandes)
{          this.allDemandes =this.allDemandes.concat(demandes );
          console.log("En_attente_RRH",demandes)}

       }
     )
     this.demandeService.getDemandeByStatut({statut:'Validee'})
     .subscribe(
      demandes =>{ 
        if(demandes){
        this.allDemandes =this.allDemandes.concat(demandes);
        console.log("Validee",this.allDemandes)
}
     }
   )
   this.demandeService.getDemandeByStatut({statut:'Refusee'})
   .subscribe(
    demandes =>{ 
      if(demandes)
    {  this.allDemandes =this.allDemandes.concat(demandes);
      console.log("Refusee",this.allDemandes)}


   }
 )
 
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
              this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_REJETEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_REJETEE_SUPERVISEUR', error);
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
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_REJETEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_REJETEE_SUPERVISEUR', error);
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
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_REJETEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_REJETEE_SUPERVISEUR', error);
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
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_REJETEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_REJETEE_SUPERVISEUR', error);
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
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_REJETEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_REJETEE_SUPERVISEUR', error);
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
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_REJETEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_REJETEE_SUPERVISEUR', error);
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
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_REJETEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_REJETEE_SUPERVISEUR', error);
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
              this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_VALIDEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_VALIDEE_SUPERVISEUR', error);
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
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_VALIDEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_VALIDEE_SUPERVISEUR', error);
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
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_VALIDEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_VALIDEE_SUPERVISEUR', error);
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
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_VALIDEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_VALIDEE_SUPERVISEUR', error);
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
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_VALIDEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_VALIDEE_SUPERVISEUR', error);
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
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_VALIDEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_VALIDEE_SUPERVISEUR', error);
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
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_VALIDEE_SUPERVISEUR" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_VALIDEE_SUPERVISEUR");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_VALIDEE_SUPERVISEUR', error);
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

}
