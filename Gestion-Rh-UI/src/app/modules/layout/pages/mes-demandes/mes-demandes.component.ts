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
     isTemporaireListener(isTemporaire: boolean) {
        console.log('isTemporaire changed to:', isTemporaire);
       this.isTemporaire=isTemporaire;
        if (isTemporaire) {
         this.addADS={ 
         ...this.addADS,
        temporaire:true} 
        } else {
         this.addADS={ 
          ...this.addADS,
          temporaire:false} 
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
          statut:'En_attente'
        }
        console.log(this.addADS)
      this.autorisationSortieService.add12({ body :this.addADS as AutorisationSortieDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'AUTORISATION DE SORTIE est ajouté(e) avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }
    
    Addconge() {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => {
        this.conge={
          ...this.conge,
          utilisateur:user,
          statut:'En_attente'
        }
        console.log(this.addADS)
      this.congeService.add10({ body :this.conge as CongeDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Congé est ajouté(e) avec succès!`;
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
          statut:'En_attente'
        }
        console.log(this.addADS)
      this.autTeletravailService.add7({ body :this.autTeletravail as AutorisationTeletravailDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Autorisation de télétravail est ajouté(e) avec succès!`;
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
          statut:'En_attente'
        }
        console.log(this.addADS)
      this.autTravailSuppService.add6({ body :this.autTravailSupp as AutorisationTravailSupDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Autorisation de travail supplémentaire </a></li> est ajouté(e) avec succès!`;
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
          statut:'En_attente'
        }
        console.log(this.addADS)
      this.chHoraireService.add11({ body :this.chHoraire as ChangementHoraireDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Changement Horaire de travail est ajouté(e) avec succès!`;
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
          statut:'En_attente'
        }
        console.log(this.addADS)
      this.acompteService.add5({ body :this.acompte as AcompteDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande d'Acompte sur Salaire/prime est ajouté(e) avec succès!`;
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
          statut:'En_attente'
        }
        console.log(this.addADS)
      this.pretService.add8({ body :this.pret as PretDto})
      .subscribe ( demande => 
        {  this.Msg = `Demande de Prêt est ajouté(e) avec succès!`;
          this.alert ="alert alert-success" ;
          this.ngOnInit();
          setTimeout(() => {
          this.alert = 'd-none';
          }, 5000); 
        });
    }); 
    }



    }
