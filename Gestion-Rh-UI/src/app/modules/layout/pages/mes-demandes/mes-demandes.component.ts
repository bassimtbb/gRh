import { Component, OnInit } from '@angular/core';
import { AcompteService, AutorisationSortieService, AutorisationTeletravailService, AutorisationTravailSupService, ChangementHoraireService, CongeService, DemandeService, PretService, UtilisateurService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';
import { AcompteDto, AutorisationSortieDto, AutorisationTeletravailDto, AutorisationTravailSupDto, ChangementHoraireDto, CongeDto, Demande, PretDto, Utilisateur } from '../../../../services/models';

@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrl: './mes-demandes.component.scss'
})
export class MesDemandesComponent  implements OnInit {
  isTemporaire: boolean=true;
  addADS:AutorisationSortieDto={};
  user!:Utilisateur;
  alert!: string;  
  Msg: String="";
  Utilisateur: Utilisateur={};
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
  constructor(
    private congeService:CongeService,
    private autTeletravailService:AutorisationTeletravailService,
    private autTravailSuppService:  AutorisationTravailSupService,
    private chHoraireService: ChangementHoraireService,
    private acompteService: AcompteService,
    private pretService: PretService,
    private demandeService:DemandeService,
    private utilisateurService:UtilisateurService,
    private tokenService :TokenService,
    private autorisationSortieService :AutorisationSortieService
  ){}
 
    demandes:Demande[]=[];
    ngOnInit(): void {
        const email = this.tokenService.email;
        this.utilisateurService.loadUserByUsername({ email: email as string })
        .subscribe(user => { 
          this.Utilisateur=user;
          this.demandeService.getDemandeByUtilisateurId({userId: user.id as number})
          .subscribe(
             demandes =>{ 
              this.demandes=demandes;
            }
          )
  
        });
    }

    DemandeClicked(demande: Demande) {
   this.demandeSelected=demande;
   console.log(this.demandeSelected.type);
   switch (this.demandeSelected.type) {
    case "Conge":
    this.typeDSelect="Congé"
      break; 
    case "AutorisationSortie":
          this.typeDSelect="Autorisation de sortie"
          this.autorisationSortieService.findById11({id : this.demandeSelected.id as number}).
          subscribe(demande=>{
            this.modifADS=demande;
          })
      break;
    case "AutorisationTeletravail":
          this.typeDSelect="Autorisation de télétravail"
      break;
    case "AutorisationTravailSup":
          this.typeDSelect="Autorisation de travail supplémentaire"
      break;
    case "ChangementHoraire":
          this.typeDSelect="Changement Horaire de travail"
      break;
    case "Acompte":
          this.typeDSelect="Acompte sur Salaire/prime"
      break;
    case "Pret":
          this.typeDSelect="Prêt"
      break;
    }

    }
    

    updateAutorSortie() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.modifADS={
          ...this.modifADS,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
        }
      this.autorisationSortieService.update11({id:this.modifADS.id as number, body :this.modifADS as AutorisationSortieDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'AUTORISATION DE SORTIE a été modifiée avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }


    updateconge() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.conge={
          ...this.conge,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
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
              motif: "Circoncision de mon enfant ",
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
          case "motif6":
            this.conge = {
              ...this.conge,
              motif: "Décès de mon père/ de ma mère/ de mon enfant ",
              duree:3
            };
            break;
        }
        console.log(this.conge)
      this.congeService.update9({id:this.conge.id as number, body :this.conge as CongeDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Congé a été modifiée avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    updateautTeletravail() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.autTeletravail={
          ...this.autTeletravail,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
        }
      this.autTeletravailService.update7({id:this.autTeletravail.id as number, body :this.autTeletravail as AutorisationTeletravailDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Autorisation de télétravail a été modifiée avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    updateautTravailSupp() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.autTravailSupp={
          ...this.autTravailSupp,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
        }
      this.autTravailSuppService.update6({id:this.autTravailSupp.id as number, body :this.autTravailSupp as AutorisationTravailSupDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Autorisation de travail supplémentaire a été modifiée avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    updatechHoraire() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.chHoraire={
          ...this.chHoraire,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
        }
      this.chHoraireService.update10({id:this.chHoraire.id as number, body :this.chHoraire as ChangementHoraireDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Changement Horaire de travail a été modifiée avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    updateacompte() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.acompte={
          ...this.acompte,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
        }
        if(this.acompteR=="non")
          this.acompte={
            ...this.acompte,
           typeA:"Prime"
          }
          
        console.log(this.acompte)
      this.acompteService.update5({id:this.acompte.id as number, body :this.acompte as AcompteDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Acompte sur Salaire/prime a été modifiée avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    updatepret() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.pret={
          ...this.pret,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
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
      this.pretService.update8({id:this.pret.id as number, body :this.pret as PretDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Prêt a été modifiée avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
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
      case 'En_attente':
       return 'pending bi-dash-circle-fill';
      case 'Refusee':
       return 'rejected bi-x-circle-fill';
      default:
       return '';
     }
    }

     AddAutorSortie() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.addADS={
          ...this.addADS,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
        }
      this.autorisationSortieService.add11({ body :this.addADS as AutorisationSortieDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'AUTORISATION DE SORTIE est ajouté avec succès!`;
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
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.conge={
          ...this.conge,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
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
              motif: "Circoncision de mon enfant ",
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
          case "motif6":
            this.conge = {
              ...this.conge,
              motif: "Décès de mon père/ de ma mère/ de mon enfant ",
              duree:3
            };
            break;
        }
        console.log(this.conge)
      this.congeService.add9({ body :this.conge as CongeDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Congé est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    AddautTeletravail() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.autTeletravail={
          ...this.autTeletravail,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
        }
      this.autTeletravailService.add7({ body :this.autTeletravail as AutorisationTeletravailDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Autorisation de télétravail est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    AddautTravailSupp() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.autTravailSupp={
          ...this.autTravailSupp,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
        }
      this.autTravailSuppService.add6({ body :this.autTravailSupp as AutorisationTravailSupDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Autorisation de travail supplémentaire est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    AddchHoraire() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.chHoraire={
          ...this.chHoraire,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
        }
      this.chHoraireService.add10({ body :this.chHoraire as ChangementHoraireDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Changement Horaire de travail est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    Addacompte() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.acompte={
          ...this.acompte,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
        }
        if(this.acompteR=="non")
          this.acompte={
            ...this.acompte,
           typeA:"Prime"
          }
          
        console.log(this.acompte)
      this.acompteService.add5({ body :this.acompte as AcompteDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Acompte sur Salaire/prime est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    Addpret() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.pret={
          ...this.pret,
          utilisateur:user,
          statut:'En_attente',
          departement:user.departement
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
      this.pretService.add8({ body :this.pret as PretDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Prêt est ajouté avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }

    }
