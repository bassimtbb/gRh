import { Component } from '@angular/core';
import { Demande } from '../../../../services/models';
import { DemandeService, UtilisateurService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-gerer-demandes',
  templateUrl: './gerer-demandes.component.html',
  styleUrl: './gerer-demandes.component.scss'
})
export class GererDemandesComponent {
constructor(
  private   demandeService:DemandeService,
  private utilisateurService:UtilisateurService,
  private tokenService :TokenService
){}

  demandes:Demande[]=[];
  ngOnInit(): void {
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(user => { 
        this.demandeService.findAll4().subscribe(
           demandes =>{ 
            this.demandes=demandes;
          }
        )

      });
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
}
