import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TokenService } from '../../../../services/token/token.service';
import {  AcompteService,  AutorisationSortieService,  AutorisationTeletravailService,  AutorisationTravailSupService,  ChangementHoraireService,  CongeService,  DemandeService,  DepartementService,  NotificationService,  PretService,  UserService,} from '../../../../services/services';
import {  AcompteDto,  AutorisationSortieDto,  AutorisationTeletravailDto,  AutorisationTravailSupDto,  ChangementHoraireDto,  CongeDto,  Demande,  PretDto,  User} from '../../../../services/models';
import { NotificationsService } from '../../NotificationsService';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { PdfComponent } from '../pdf/pdf.component';
export const pretTemplate: string = `
    <div class="container">
        <div class="header">
            <img src="https://saiph-labo.com/wp-content/uploads/2023/07/logo-s.png" alt="Company Logo" class="logo">
            <h1>DEMANDE D'ACOMPTE</h1>
        </div>
        <div class="content">
            <!-- Insert dynamic content here -->
        </div>
        <div class="footer">
            <p>Autorisation Approuvée</p>
        </div>
    </div>
`;

export const congeTemplate: string = `
    <div class="container">
        <div class="header">
            <img src="https://saiph-labo.com/wp-content/uploads/2023/07/logo-s.png" alt="Company Logo" class="logo">
            <h1>Demande de Congé</h1>
        </div>
        <div class="content">
            <!-- Insert dynamic content here -->
        </div>
        <div class="footer">
            <p>Autorisation Approuvée</p>
        </div>
    </div>
`;
export const changementHoraireTemplate: string = `
    <div class="container">
        <div class="header">
            <img src="https://saiph-labo.com/wp-content/uploads/2023/07/logo-s.png" alt="Company Logo" class="logo">
            <h1>Demande de Congé</h1>
        </div>
        <div class="content">
            <!-- Insert dynamic content here -->
        </div>
        <div class="footer">
            <p>Autorisation Approuvée</p>
        </div>
    </div>
`;
export const autorisationTravailSupTemplate: string = `
    <div class="container">
        <div class="header">
            <img src="https://saiph-labo.com/wp-content/uploads/2023/07/logo-s.png" alt="Company Logo" class="logo">
            <h1>Demande de Congé</h1>
        </div>
        <div class="content">
            <!-- Insert dynamic content here -->
        </div>
        <div class="footer">
            <p>Autorisation Approuvée</p>
        </div>
    </div>
`;
export const autorisationTeletravailTemplate: string = `
    <div class="container">
        <div class="header">
            <img src="https://saiph-labo.com/wp-content/uploads/2023/07/logo-s.png" alt="Company Logo" class="logo">
            <h1>Demande de Congé</h1>
        </div>
        <div class="content">
            <!-- Insert dynamic content here -->
        </div>
        <div class="footer">
            <p>Autorisation Approuvée</p>
        </div>
    </div>
`;
export const autorisationSortieTemplate: string = `
    <div class="container">
        <div class="header">
            <img src="https://saiph-labo.com/wp-content/uploads/2023/07/logo-s.png" alt="Company Logo" class="logo">
            <h1>Demande de Congé</h1>
        </div>
        <div class="content">
            <!-- Insert dynamic content here -->
        </div>
        <div class="footer">
            <p>Autorisation Approuvée</p>
        </div>
    </div>
`;
export const acompteTemplate: string = `
    <div class="container">
        <div class="header">
            <img src="https://saiph-labo.com/wp-content/uploads/2023/07/logo-s.png" alt="Company Logo" class="logo">
            <h1>Demande de Congé</h1>
        </div>
        <div class="content">
            <!-- Insert dynamic content here -->
        </div>
        <div class="footer">
            <p>Autorisation Approuvée</p>
        </div>
    </div>
`;


@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrl: './mes-demandes.component.scss'
})
export class MesDemandesComponent  implements OnInit {
  pdfAffiche:number=0;
  isTemporaire: boolean=true;
  addADS:AutorisationSortieDto={};
  alert!: string;  
  Msg: String="";
  user: User={};
  conge:CongeDto={};
  autTeletravail:AutorisationTeletravailDto={};
  autTravailSupp:  AutorisationTravailSupDto={}
  chHoraire: ChangementHoraireDto={}
  acompte: AcompteDto={}
  pret : PretDto={}
  credit: string = 'non'; 
  rembourser: string = 'non'; 
  congeEx: any;
  isEXCEPTIONNEL: boolean=false;
  motifC: any;
  acompteR: string = 'non'; 
  demandeSelected!: Demande;
  typeDSelect: string="nothing";
  modifADS:AutorisationSortieDto={};
  modifConge:CongeDto={};
  modifAutTeletravail:AutorisationTeletravailDto={};
  modifAutTravailSupp:  AutorisationTravailSupDto={}
  modifChHoraire: ChangementHoraireDto={}
  modifAcompte: AcompteDto={}
  modifPret : PretDto={}
  datePickerId = new Date().toISOString().split("T")[0];
Sup_h:User={};
  role: any;
  constructor(
    private pdfComponent: PdfComponent,
    private congeService:CongeService,
    private autTeletravailService:AutorisationTeletravailService,
    private autTravailSuppService:  AutorisationTravailSupService,
    private chHoraireService: ChangementHoraireService,
    private acompteService: AcompteService,
    private pretService: PretService,
    private demandeService:DemandeService,
    private userService:UserService,
    private tokenService :TokenService,
    private autorisationSortieService :AutorisationSortieService,
    private  notificationService:NotificationService,
    private  departementService:DepartementService,
    private notificationsService: NotificationsService
  ){}
  @ViewChild('Pret') Pret: ElementRef | undefined;
  @ViewChild('Conge') Conge: ElementRef | undefined;
  @ViewChild('ChangementHoraire') ChangementHoraire: ElementRef | undefined;
  @ViewChild('AutorisationTravailSup') AutorisationTravailSup: ElementRef | undefined;
  @ViewChild('AutorisationTeletravail') AutorisationTeletravail: ElementRef | undefined;
  @ViewChild('AutorisationSortie') AutorisationSortie: ElementRef | undefined;
  @ViewChild('Acompte') Acompte: ElementRef | undefined;

 downloadPdf(demande : Demande){
  console.log(demande.type)
  let type :ElementRef;
  switch(demande.type) {
    case "Pret":
       this.pretService.findById9({id:demande.id as number}).subscribe(pret=>{this.pret=pret})
      break;
    case "Conge":
      this.congeService.findById10({id:demande.id as number}).subscribe(conge=>{this.conge=conge})
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
  
    demandes:Demande[]=[];
    ngOnInit(): void {
       this.role= this.tokenService.userRole();

      const Id = this.tokenService.Id;
      this.userService.findById({id: Id as number  })
        .subscribe(user => { 
          this.user=user;
          this.demandeService.getDemandeByUtilisateurId({userId: user.id as number})
          .subscribe(
             demandes =>{ 
              this.demandes=demandes;
            }
          )
  
        });
              
    }
 
    DemandeClicked(demande: Demande) {
      // this.departementService.findById4({id:3 as number}).subscribe
      // (departement=>{
      //   if (departement.manager ) {
      //     console.log(this.demandeSelected.id);
      //     this.Sup_h=departement.manager! ;
    
      //     } else {
      //     this.Msg = "ERREUR : Pas de supérieur hiérarchique";  // Corrected spelling and grammar
      //     this.alert ="alert alert-danger" ;
      //     this.ngOnInit();
      //     setTimeout(() => {
      //     this.alert = 'd-none';
      //     }, 5000); 
      //     console.log("Demande data not yet available");
      //   return ;
        
      //   }
      // })
      // if (this.demandeSelected && this.demandeSelected.id) {
      //   console.log(this.demandeSelected.id);
        this.demandeSelected=demande;

      // } else {
        
      //   console.log("Demande data not yet available");
      // }
   console.log(this.demandeSelected.type);
   switch (this.demandeSelected.type) {
    case "Conge":
    this.typeDSelect="Congé"
    this.congeService.findById10({id : this.demandeSelected.id as number}).
    subscribe(demande=>{
      this.modifConge=demande;
      console.log(demande);
   
    switch (demande.motif ) {
      case "Mon mariage":
      this.motifC="motif1";
      this.isEXCEPTIONNEL=true;
        break; 
    
      case "Naissance de mon enfant (Femme)":
       this.motifC="motif2";
       this.isEXCEPTIONNEL=true;
        break;
        case "Naissance de mon enfant (Homme)":
       this.motifC="motif7";
       this.isEXCEPTIONNEL=true;
          break;
    
      case "Circoncision de mon enfant":
  this.motifC="motif3";
  this.isEXCEPTIONNEL=true;
        break;
    
      case "Décès d'un frère, d'une sœur, d'un petit enfant, d'une petite fille, d'un grand-père ou d'une grand-mère":
    this.motifC="motif4";
    this.isEXCEPTIONNEL=true;
        break;
        case "Décès de mon conjoint":
     
        this.motifC="motif5";
        this.isEXCEPTIONNEL=true;
        break;                  
      case "Décès de mon père/ de ma mère/ de mon enfant":
    this.motifC="motif6";
    this.isEXCEPTIONNEL=true;
        break;
        default:
          this.motifC="";
          this.isEXCEPTIONNEL=false;
    }
    console.log("this.isEXCEPTIONNEL",this.isEXCEPTIONNEL); 
    console.log("this.motifC",this.motifC);
    console.log("demande.motif",demande.motif);
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
            console.log(demande);
          })
          break;
    case "ChangementHoraire":
          this.typeDSelect="Changement Horaire de travail"
          this.chHoraireService.findById11({id : this.demandeSelected.id as number})
          .subscribe(demande=>{
            this.modifChHoraire=demande;
            console.log(demande);
          })
          break;
    case "Acompte":
          this.typeDSelect="Acompte sur Salaire/prime"
          this.acompteService.findById6({id : this.demandeSelected.id as number}).
          subscribe(demande=>{
            this.modifAcompte=demande;
            console.log(demande);
          })

            if(this.modifAcompte.typeA=="Prime"){ 
              this.acompteR=="non";
              }
          break;
    case "Pret":
          this.typeDSelect="Prêt"
          this.pretService.findById9({id : this.demandeSelected.id as number}).
          subscribe(demande=>{
            this.modifPret=demande;
            console.log(demande);
          })
          if(this.modifPret.remboursement=="13 ème mois"){
            this.rembourser="non"
          }else{
            this.rembourser="oui"
          }
          if(this.modifPret.credit=="Pas crédit bancaire en cours"){
            this.credit="non"
          }else{
            this.credit="oui"
          }
          console.log("credit :",this.credit);
          console.log("rembourser :",this.rembourser);
          console.log("modifPret :",this.modifPret);
  
          break;
    }
     
    }
    

    updateAutorSortie() {
      const userId = this.tokenService.Id; 
      this.userService.findById({id: userId as number }) 
        .subscribe(user => {
          this.modifADS = {
            ...this.modifADS, 
            utilisateur: user,
            statut: 'En_attente_Sup_H',
            departement: user.departement
          };
    
          this.autorisationSortieService.update12({ 
            id: this.modifADS.id as number,
            body: this.modifADS as AutorisationSortieDto 
          })
            .subscribe(demande => {
              this.Msg = 'Demande d\'AUTORISATION DE SORTIE modifiée avec succès!';
              this.alert = 'alert alert-success';
              this.ngOnInit(); 
              setTimeout(() => {
                this.alert = 'd-none';
              }, 5000); 
            }, error => {
              console.error('Error updating authorization request:', error);
              this.Msg = 'Échec de la modification de la demande!'; 
              this.alert = 'alert alert-danger'; 
            });
        });
    }
    updateconge() {
      const Id = this.tokenService.Id;
      this.userService.findById({id: Id as number  })
      .subscribe(user => {
        this.modifConge={
          ...this.modifConge,
          utilisateur:user,
          statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        console.log("this.motifC && this.isEXCEPTIONNEL" ,this.motifC && this.isEXCEPTIONNEL)
        console.log("this.motifC" ,this.motifC )
        if(this.isEXCEPTIONNEL)
        switch (this.motifC) {
          case "motif1":
            this.modifConge = {
              ...this.modifConge,
              motif: "Mon mariage",
              duree:3
            };
            break; 
        
          case "motif2":
            this.modifConge = {
              ...this.modifConge,
              motif: "Naissance de mon enfant (Femme)",
              duree:40
            };
            break;
            case "motif7":
              this.modifConge = {
                ...this.modifConge,
                motif: "Naissance de mon enfant (Homme)",
                duree:2
              };
              break;
        
          case "motif3":
            this.modifConge = {
              ...this.modifConge,
              motif: "Circoncision de mon enfant",
              duree:1
            };
            break;
        
          case "motif4":
            this.modifConge = {
              ...this.modifConge,
              motif: "Décès d'un frère, d'une sœur, d'un petit enfant, d'une petite fille, d'un grand-père ou d'une grand-mère",
              duree:2
            };
            break;
            case "motif5":
            this.modifConge = {
              ...this.modifConge,
              motif: "Décès de mon conjoint",
              duree:3
            };
            break;                  
          case "motif6":
            this.modifConge = {
              ...this.modifConge,
              motif: "Décès de mon père/ de ma mère/ de mon enfant",
              duree:3
            };
            break;
        }

        console.log("this.modifConge",this.modifConge.motif)
        console.log("this.motifC",this.motifC)
      this.congeService.update10({id:this.modifConge.id as number, body :this.modifConge as CongeDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Congé modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    updateautTeletravail() {
      const Id = this.tokenService.Id;
      this.userService.findById({id: Id as number  })
      .subscribe(user => {
        this.modifAutTeletravail={
          ...this.modifAutTeletravail,
          utilisateur:user,
           statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
      this.autTeletravailService.update8
      ({id:this.modifAutTeletravail.id as number, body :this.modifAutTeletravail as AutorisationTeletravailDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Autorisation de télétravail modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    updateautTravailSupp() {
      const Id = this.tokenService.Id;
      this.userService.findById({id: Id as number  })
      .subscribe(user => {
        this.modifAutTravailSupp={
          ...this.modifAutTravailSupp,
          utilisateur:user,
          statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
      this.autTravailSuppService.update7({id:this.modifAutTravailSupp.id as number, body :this.modifAutTravailSupp as AutorisationTravailSupDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Autorisation de travail supplémentaire modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    updatechHoraire() {
      const Id = this.tokenService.Id;
      this.userService.findById({id: Id as number  })
      .subscribe(user => {
        this.modifChHoraire={
          ...this.modifChHoraire,
          utilisateur:user,
          statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
      this.chHoraireService.update11({id:this.modifChHoraire.id as number, body :this.modifChHoraire as ChangementHoraireDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Changement Horaire de travail modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    updateacompte() {
      const Id = this.tokenService.Id;
      this.userService.findById({id: Id as number  })
      .subscribe(user => {
        this.modifAcompte={
          ...this.modifAcompte,
          utilisateur:user,
          statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        if(this.acompteR=="non")
          this.modifAcompte={
            ...this.modifAcompte,
           typeA:"Prime"
          }
          
        console.log(this.modifAcompte)
      this.acompteService.update6({id:this.modifAcompte.id as number, body :this.modifAcompte as AcompteDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Acompte sur Salaire/prime modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    updatepret() {
      const Id = this.tokenService.Id;
      this.userService.findById({id: Id as number  })
      .subscribe(user => {
        
        
        this.modifPret={
          ...this.modifPret,
          utilisateur:user,
          statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        console.log("credit :",this.credit);
        console.log("rembourser :",this.rembourser);
        console.log("modifPret :",this.modifPret);      
        if(this.rembourser=="non")
          this.modifPret={
            ...this.modifPret,
            remboursement:"13 ème mois"
          }

          if(this.credit=="non")
            this.modifPret={
              ...this.modifPret,
              credit:"Pas crédit bancaire en cours"
            }
          
      this.pretService.update9({id:this.modifPret.id as number, body :this.modifPret as PretDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Prêt modifiée avec succès!"!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

// ----------------------------

   deleteAutorSortie() {
   
          this.autorisationSortieService.delete12({ 
            id: this.modifADS.id as number,
          })
            .subscribe(demande => {
              this.Msg = 'Demande d\'AUTORISATION DE SORTIE est supprimée!';
              this.alert = 'alert alert-success';
              this.ngOnInit(); 
              setTimeout(() => {
                this.alert = 'd-none';
              }, 5000); 
            }, error => {
              console.error('Error updating authorization request:', error);
              this.Msg = 'Échec de la suppression de la demande!'; 
              this.alert = 'alert alert-danger'; 
            });
        
    }
   deleteconge() {

      this.congeService.delete10({id:this.modifConge.id as number })
      .subscribe ( demande => 
        {  this.Msg = `Demande de Congé est supprimée!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
          }, error => {
              console.error('Error updating authorization request:', error);
              this.Msg = 'Échec de la suppression de la demande!'; 
              this.alert = 'alert alert-danger'; 
            });
    }

   deleteautTeletravail() {
 
      this.autTeletravailService.delete8
      ({id:this.modifAutTeletravail.id as number})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Autorisation de télétravail est supprimée!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
          }, error => {
              console.error('Error updating authorization request:', error);
              this.Msg = 'Échec de la suppression de la demande!'; 
              this.alert = 'alert alert-danger'; 
            });
    }

   deleteautTravailSupp() {
 
      this.autTravailSuppService.delete7({id:this.modifAutTravailSupp.id as number})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Autorisation de travail supplémentaire est supprimée!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
          }, error => {
              console.error('Error updating authorization request:', error);
              this.Msg = 'Échec de la suppression de la demande!'; 
              this.alert = 'alert alert-danger'; 
            });
    }

   deletechHoraire() {

      this.chHoraireService.delete11({id:this.modifChHoraire.id as number})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Changement Horaire de travail est supprimée!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
          }, error => {
              console.error('Error updating authorization request:', error);
              this.Msg = 'Échec de la suppression de la demande!'; 
              this.alert = 'alert alert-danger'; 
            });
    }

   deleteacompte() {

      this.acompteService.delete6({id:this.modifAcompte.id as number})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Acompte sur Salaire/prime est supprimée!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
          }, error => {
              console.error('Error updating authorization request:', error);
              this.Msg = 'Échec de la suppression de la demande!'; 
              this.alert = 'alert alert-danger'; 
            });
 
    }

   deletepret() {
    
         
      this.pretService.delete9({id:this.modifPret.id as number})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Prêt est supprimée!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
          }, error => {
              console.error('Error updating authorization request:', error);
              this.Msg = 'Échec de la suppression de la demande!'; 
              this.alert = 'alert alert-danger'; 
            });

    }
    
    
// ----------------------------
     isTemporaireListener(isTemporaire: boolean) {
        console.log('isTemporaire changed to:', isTemporaire);
       this.isTemporaire=isTemporaire;
        if (isTemporaire) {
         this.addADS={ 
         ...this.addADS,
        isTemporaire :true} 
        } else {
         this.addADS={ 
          ...this.addADS,
          isTemporaire:false} 
        }
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
    
     AddAutorSortie() { 

      const Id = this.tokenService.Id;    
      console.log(Id);  
      const role:String = this.tokenService.userRole();
       var Typenotif:String =" ";
      this.userService.findById({id: Id as number  })
      .subscribe(user => {
        console.log("Role",role);    
        console.log("this.Sup_h.id",this.Sup_h.id);
          console.log("Id",Id);
          console.log("this.Sup_h.id===Id",this.Sup_h.id===Id);
        if(role==="RRH"){
      
          if(this.Sup_h.id===Id){ 
            

        this.addADS={
          ...this.addADS,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}}
          Typenotif=" ";
        }else{
            
        this.addADS={
          ...this.addADS,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
          }
          Typenotif="DEMANDE_VALIDEE_SUPH";
}
        }
        if (role==="SUP_H") {
          this.addADS={
          ...this.addADS,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        Typenotif="DEMANDE_VALIDEE_SUPH";

        } 
        if (role=="EMPLOYE")  {
          this.addADS={
          ...this.addADS,
          utilisateur:user,
          statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        Typenotif="DEMANDE_A_DEPOSER";

        }
        

      this.autorisationSortieService.add12({ body :this.addADS as AutorisationSortieDto})
      .subscribe ( demande => 
        {
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:Typenotif as string })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_A_DEPOSER");

            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_A_DEPOSER', error);
            })

            this.Msg = `Demande d'AUTORISATION DE SORTIE est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    isEXCEPTIONNELListener(isEXCEPTIONNEL: boolean) {
      console.log('isEXCEPTIONNEL changed to:', isEXCEPTIONNEL);
  
       this.isEXCEPTIONNEL= isEXCEPTIONNEL;
      
    }

    Addconge() {
      
  // this.departementService.findById4({id:3 as number})
  // .subscribe
  //     (departement=>{
  //         console.log("demandeSelected :",this.demandeSelected.id);
  //         this.Sup_h=departement.manager! ;
  //     })
  const Id = this.tokenService.Id;      
  const role:String = this.tokenService.userRole();
  this.userService.findById({id: Id as number  })
  .subscribe(user => {
      if (!user.departement?.manager ) {
          this.Msg = "ERREUR : Pas de supérieur hiérarchique";  // Corrected spelling and grammar
          this.alert ="alert alert-danger" ;
          console.log("this.Sup_h.id ,",this.Sup_h);
          console.log("Demande data not yet available   j");
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        return ;
        }        

        if(role==="RRH"){
          console.log("RRH demande")
          if(this.Sup_h.id==Id){ 
        this.conge={
          ...this.conge,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}}
        }else{
            
        this.conge={
          ...this.conge,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
          }}
        }
        if (role==="SUP_H") {
          this.conge={
          ...this.conge,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        } 
        if (role=="EMPLOYE")  {
          this.conge={
          ...this.conge,
          utilisateur:user,
          statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        }

        switch (this.motifC) {
          case "motif1":
            this.conge = {
              ...this.conge,
              motif: "Mon mariage",
              duree:3
            };
            break; 
        
          case "motif2":
            this.conge = {
              ...this.conge,
              motif: "Naissance de mon enfant",
              duree:2
            };
            break;
        
          case "motif3":
            this.conge = {
              ...this.conge,
              motif: "Circoncision de mon enfant",
              duree:1
            };
            break;
        
          case "motif4":
            this.conge = {
              ...this.conge,
              motif: "Décès d'un frère, d'une sœur, d'un petit enfant, d'une petite fille, d'un grand-père ou d'une grand-mère",
              duree:2
            };
            break;
            case "motif5":
            this.conge = {
              ...this.conge,
              motif: "Décès de mon conjoint",
              duree:3
            };
            break;                  
          case "motif7":
            this.conge = {
              ...this.conge,
              motif: "Décès de mon père/ de ma mère/ de mon enfant",
              duree:3
            };
            break;
        }
        console.log(this.conge)
      this.congeService.add10({ body :this.conge as CongeDto})
      .subscribe ( demande => 
        {
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_A_DEPOSER" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_A_DEPOSER");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_A_DEPOSER', error);
            })

            this.Msg = `Demande de Congé est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    AddautTeletravail() {
      
  this.departementService.findById4({id:3 as number})
  .subscribe
      (departement=>{
          console.log(this.demandeSelected.id);
          this.Sup_h=departement.manager! ;
      })
      if (!this.Sup_h.id ) {
          this.Msg = "ERREUR : Pas de supérieur hiérarchique";  // Corrected spelling and grammar
          this.alert ="alert alert-danger" ;
          console.log("Demande data not yet available   j");
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        return ;
        }   
      const Id = this.tokenService.Id;      
      const role:String = this.tokenService.userRole();
      this.userService.findById({id: Id as number  })
      .subscribe(user => {
        if(role==="RRH"){
          console.log("RRH demande")
          if(this.Sup_h.id==Id){ 
        this.autTeletravail={
          ...this.autTeletravail,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}}
        }else{
            
        this.autTeletravail={
          ...this.autTeletravail,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
          }}
        }
        if (role==="SUP_H") {
          this.autTeletravail={
          ...this.autTeletravail,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        } 
        if (role=="EMPLOYE")  {
          this.autTeletravail={
          ...this.autTeletravail,
          utilisateur:user,
          statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        }
        

      this.autTeletravailService.add8
      ({ body :this.autTeletravail as AutorisationTeletravailDto})
      .subscribe ( demande => 
        {
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_A_DEPOSER" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_A_DEPOSER");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_A_DEPOSER', error);
            })

            this.Msg = `Demande d'Autorisation de télétravail est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    AddautTravailSupp() {
      
  this.departementService.findById4({id:3 as number})
  .subscribe
      (departement=>{
          console.log(this.demandeSelected.id);
          this.Sup_h=departement.manager! ;
      })
      if (!this.Sup_h.id ) {
          this.Msg = "ERREUR : Pas de supérieur hiérarchique";  // Corrected spelling and grammar
          this.alert ="alert alert-danger" ;
          console.log("Demande data not yet available   j");
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        return ;
        }   
      const Id = this.tokenService.Id;      
      const role:String = this.tokenService.userRole();
      this.userService.findById({id: Id as number  })
      .subscribe(user => {
        if(role==="RRH"){
          console.log("RRH demande")
          if(this.Sup_h.id==Id){ 
        this.autTravailSupp={
          ...this.autTravailSupp,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}}
        }else{
            
        this.autTravailSupp={
          ...this.autTravailSupp,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
          }}
        }
        if (role==="SUP_H") {
          this.autTravailSupp={
          ...this.autTravailSupp,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        } 
        if (role=="EMPLOYE")  {
          this.autTravailSupp={
          ...this.autTravailSupp,
          utilisateur:user,
          statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        }
        
 
      this.autTravailSuppService.add7({ body :this.autTravailSupp as AutorisationTravailSupDto})
      .subscribe ( demande => 
        {
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_A_DEPOSER" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_A_DEPOSER");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_A_DEPOSER', error);
            })

            this.Msg = `Demande d'Autorisation de travail supplémentaire est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    AddchHoraire() {
      
  this.departementService.findById4({id:3 as number})
  .subscribe
      (departement=>{
          console.log(this.demandeSelected.id);
          this.Sup_h=departement.manager! ;
      })
      if (!this.Sup_h.id ) {
          this.Msg = "ERREUR : Pas de supérieur hiérarchique";  // Corrected spelling and grammar
          this.alert ="alert alert-danger" ;
          console.log("Demande data not yet available   j");
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        return ;
        }   
      const Id = this.tokenService.Id;      
      const role:String = this.tokenService.userRole();
      this.userService.findById({id: Id as number  })
      .subscribe(user => {
        if(role==="RRH"){
          console.log("RRH demande")
          if(this.Sup_h.id==Id){ 
        this.chHoraire={
          ...this.chHoraire,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}}
        }else{
            
        this.chHoraire={
          ...this.chHoraire,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
          }}
        }
        if (role==="SUP_H") {
          this.chHoraire={
          ...this.chHoraire,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        } 
        if (role=="EMPLOYE")  {
          this.chHoraire={
          ...this.chHoraire,
          utilisateur:user,
          statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        }
        

      this.chHoraireService.add11({ body :this.chHoraire as ChangementHoraireDto})
      .subscribe ( demande => 
        { 
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_A_DEPOSER" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_A_DEPOSER");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_A_DEPOSER', error);
            })

           this.Msg = `Demande de Changement Horaire de travail est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    Addacompte() {
      
  this.departementService.findById4({id:3 as number})
  .subscribe
      (departement=>{
          console.log(this.demandeSelected.id);
          this.Sup_h=departement.manager! ;
      })
      if (!this.Sup_h.id ) {
          this.Msg = "ERREUR : Pas de supérieur hiérarchique";  // Corrected spelling and grammar
          this.alert ="alert alert-danger" ;
          console.log("Demande data not yet available   j");
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        return ;
        }   
      const Id = this.tokenService.Id;      
      const role:String = this.tokenService.userRole();
      this.userService.findById({id: Id as number  })
      .subscribe(user => {
        if(role==="RRH"){
          console.log("RRH demande")
          if(this.Sup_h.id==Id){ 
        this.acompte={
          ...this.acompte,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}}
        }else{
            
        this.acompte={
          ...this.acompte,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
          }}
        }
        if (role==="SUP_H") {
          this.acompte={
          ...this.acompte,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        } 
        if (role=="EMPLOYE")  {
          this.acompte={
          ...this.acompte,
          utilisateur:user,
          statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        }
        if(this.acompteR=="non")
          this.acompte={
            ...this.acompte,
           typeA:"Prime"
          }
          
        console.log(this.acompte)
      this.acompteService.add6({ body :this.acompte as AcompteDto})
      .subscribe ( demande => 
        { 
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_A_DEPOSER" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_A_DEPOSER");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_A_DEPOSER', error);
            })

           this.Msg = `Demande d'Acompte sur Salaire/prime est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    Addpret() {
  this.departementService.findById4({id:3 as number})
  .subscribe
      (departement=>{
          console.log(this.demandeSelected.id);
          this.Sup_h=departement.manager! ;
      })
      if (!this.Sup_h.id ) {
          this.Msg = "ERREUR : Pas de supérieur hiérarchique";  // Corrected spelling and grammar
          this.alert ="alert alert-danger" ;
          console.log("Demande data not yet available   j");
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        return ;
        }   
      const Id = this.tokenService.Id;      
      const role:String = this.tokenService.userRole();
      this.userService.findById({id: Id as number  })
      .subscribe(user => {
        if(role==="RRH"){
          console.log("RRH demande")
          if(this.Sup_h.id==Id){ 
        this.pret={
          ...this.pret,
          utilisateur:user,
          statut:'Validee',
          departement:{"id":user.departement?.id as number}}
        }else{
            
        this.pret={
          ...this.pret,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
          }}
        }
        if (role==="SUP_H") {
          this.pret={
          ...this.pret,
          utilisateur:user,
          statut:'En_attente_RRH',
          departement:{"id":user.departement?.id as number}
        }
        } 
        if (role=="EMPLOYE")  {
          this.pret={
          ...this.pret,
          utilisateur:user,
          statut:'En_attente_Sup_H',
          departement:{"id":user.departement?.id as number}
        }
        }  
        
    
        if(this.rembourser=="non")
          this.pret={
            ...this.pret,
            remboursement:"13 ème mois"
          }
          if(this.credit=="non")
            this.pret={
              ...this.pret,
              credit:"Pas crédit bancaire en cours"
            }
      this.pretService.add9({ body :this.pret as PretDto})
      .subscribe ( demande => 
        {
          this.notificationService.sendNotif({userID:demande.utilisateur?.id as number,body:"DEMANDE_A_DEPOSER" })
          .subscribe( notif=>
            {console.log("Notification DEMANDE_A_DEPOSER");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification DEMANDE_A_DEPOSER', error);
            })

            this.Msg = `Demande de Prêt est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    }
