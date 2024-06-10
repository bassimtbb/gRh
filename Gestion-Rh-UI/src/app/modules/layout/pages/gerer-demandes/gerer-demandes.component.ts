import { Component, ElementRef, ViewChild } from '@angular/core';
import { AcompteDto, AutorisationSortieDto, AutorisationTeletravailDto, AutorisationTravailSupDto, ChangementHoraireDto, CongeDto, Demande, DemandeDto, Departement, PretDto, User, UserDto } from '../../../../services/models';
import { AcompteService, AutorisationSortieService, AutorisationTeletravailService, AutorisationTravailSupService, ChangementHoraireService, CongeService, DemandeService, DepartementService, NotificationService, PretService, UserService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';
import { NotificationsService } from '../../../layout/NotificationsService';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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
   demandeSelected!: Demande;
   typeDSelect: string="nothing";
   Sup_h!:User;
  alert!: string;
  @ViewChild('Pret') Pret: ElementRef | undefined;
  @ViewChild('Conge') Conge: ElementRef | undefined;
  @ViewChild('ChangementHoraire') ChangementHoraire: ElementRef | undefined;
  @ViewChild('AutorisationTravailSup') AutorisationTravailSup: ElementRef | undefined;
  @ViewChild('AutorisationTeletravail') AutorisationTeletravail: ElementRef | undefined;
  @ViewChild('AutorisationSortie') AutorisationSortie: ElementRef | undefined;
  @ViewChild('Acompte') Acompte: ElementRef | undefined;
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
  private  departementService:DepartementService,

  private notificationsService: NotificationsService


){}
  user!:UserDto;
 departement!: Departement;
  departementDemandes:Demande[]=[];

  allDemandes:Demande[]=[];
  demandesFilter:Demande[]=[];
  DemandeClicked(demande: Demande) {
    this.departementService.findById4({id:3 as number}).subscribe
    (departement=>{
      if (departement.manager ) {
        console.log(this.demandeSelected.id);
        this.Sup_h=departement.manager! ;
  
        }})

      this.demandeSelected=demande;

 console.log(this.demandeSelected.type);
 switch (this.demandeSelected.type) {
  case "Conge":
  this.typeDSelect="Congé"
  this.congeService.findById10({id : this.demandeSelected.id as number}).
  subscribe(demande=>{
    this.modifConge=demande;
 

})

  
    break; 
  case "AutorisationSortie":
        this.typeDSelect="Autorisation de sortie"
        this.autorisationSortieService.findById12({id : this.demandeSelected.id as number}).
        subscribe(demande=>{
          this.modifADS=demande;
          console.log(demande);
        })
    break;
  case "AutorisationTeletravail":
        this.typeDSelect="Autorisation de télétravail"
             this.autTeletravailService.findById8({id : this.demandeSelected.id as number}).
        subscribe(demande=>{
          this.modifAutTeletravail=demande;
          console.log(demande);
        })
        break;
  case "AutorisationTravailSup":
        this.typeDSelect="Autorisation de travail supplémentaire"
        this.autTravailSuppService.findById7
        ({id : this.demandeSelected.id as number}).
        subscribe(demande=>{
          this.modifAutTravailSupp=demande;
        })
        break;
  case "ChangementHoraire":
        this.typeDSelect="Changement Horaire de travail"
        this.chHoraireService.findById11({id : this.demandeSelected.id as number})
        .subscribe(demande=>{
          this.modifChHoraire=demande;
        })
        break;
  case "Acompte":
        this.typeDSelect="Acompte sur Salaire/prime"
        this.acompteService.findById6({id : this.demandeSelected.id as number}).
        subscribe(demande=>{
          this.modifAcompte=demande;
          console.log(demande);
        })

      
        break;
        case "Pret":
          this.typeDSelect="Pret"
          this.pretService.findById9({id : this.demandeSelected.id as number}).
          subscribe(demande=>{
            this.modifPret=demande;
            console.log(demande);
          })
  
        
          break;
  }
   
  }
  searchQuery: string = '';
  applySearch    (query: string) {
    this.searchQuery = query;
    if (this.searchQuery.trim() === '') {
      this.demandesFilter = this.allDemandes; // Reset to show all demandes if search query is empty
    } else {
      this.demandesFilter = this.allDemandes.filter(demande => {
        const user = demande.utilisateur;
        if (user && user.firstname && user.lastname) {
          return (
            user.firstname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.lastname.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
        return false;
      });
    }
    console.log('Filtered demandes:', this.demandesFilter);
  }

  downloadPdf(demande : Demande){
    console.log(demande.type)
    let type :ElementRef;
    switch(demande.type) {
      case "Pret":
        type = this.Pret!;
        break;
      case "Conge":
        type = this.Conge!;
        break;
      case "ChangementHoraire":
        type = this.ChangementHoraire!;
        break;
      case "AutorisationTravailSup":
        type = this.AutorisationTravailSup!;
        break;
      case "AutorisationTeletravail":
        type = this.AutorisationTeletravail!;
        break;
      case "AutorisationSortie":
        type = this.AutorisationSortie!;
        break;
      case "Acompte":
        type = this.Acompte!;
        break;
      default:
        break;
    }  console.log(type!.nativeElement);
  
      html2canvas(type!.nativeElement).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF();
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('demande.pdf');
      });
  }

  

  filterDemandes(event: Event) {
    this.ngOnInit;
    this.demandesFilter=[];
    const filterValue = (event.target as HTMLInputElement).value;
    switch (filterValue) {
      case 'validated':
        this.demandesFilter = this.allDemandes.filter(demande => demande.statut === "Validee");
        break;
      case 'pending':
        this.demandesFilter = this.allDemandes.filter(demande => demande.statut === "En_attente_Sup_H" || demande.statut === "En_attente_RRH");
        break;
      case 'rejected':
        this.demandesFilter = this.allDemandes.filter(demande => demande.statut === "Refusee" || demande.statut === "Refusee_Sup_H");
        break;

      default:
        this.demandesFilter = this.allDemandes; // Show all demandes if no filter selected
        break;
    }
  }

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
            this.demandesFilter=[]
            this.allDemandes=demandes;
            this.allDemandes =this.allDemandes.filter(demande => demande.utilisateur?.id != Id); 

            this.demandesFilter = demandes;    
            this.demandesFilter = this.demandesFilter.filter(demande => demande.utilisateur?.id != Id);  
  
          }
       )}else{
        console.log("vide",this.allDemandes);
        this.demandesFilter =[];
        this.allDemandes=[];

       this.demandeService.getDemandeByStatut({statut:'En_attente_RRH'})
       .subscribe(
        demandes =>{ 
          
          if(demandes)
{                 this.allDemandes =this.allDemandes.concat(demandes);
  this.allDemandes =this.allDemandes.filter(demande => demande.utilisateur?.id != Id);
                 this.demandesFilter = this.demandesFilter.concat(demandes );    
                 this.demandesFilter = this.demandesFilter.filter(demande => demande.utilisateur?.id != Id);  
          console.log("En_attente_RRH",demandes)}
  }
      )
     this.demandeService.getDemandeByStatut({statut:'Validee'})
     .subscribe(
      
      demandes =>{ 

        if(demandes){
        this.allDemandes =this.allDemandes.concat(demandes);
        this.allDemandes =this.allDemandes.filter(demande => demande.utilisateur?.id != Id);
        this.demandesFilter = this.demandesFilter.concat(demandes );    
          this.demandesFilter = this.demandesFilter.filter(demande => demande.utilisateur?.id != Id);  
        

        console.log("Validee",this.allDemandes)
}
     }
   )
   this.demandeService.getDemandeByStatut({statut:'Refusee'})
   .subscribe(
    demandes =>{ 
      if(demandes)
    {          this.allDemandes =this.allDemandes.concat(demandes);
      this.allDemandes =this.allDemandes.filter(demande => demande.utilisateur?.id != Id); 
      this.demandesFilter = this.demandesFilter.concat(demandes );    
        this.demandesFilter = this.demandesFilter.filter(demande => demande.utilisateur?.id != Id);  

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
              this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_REJETEE_SUPH" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_REJETEE_SUPH");
            this.notificationsService.triggerReloadNotification();

            this.ngOnInit();

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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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
                          this.ngOnInit();


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

}
