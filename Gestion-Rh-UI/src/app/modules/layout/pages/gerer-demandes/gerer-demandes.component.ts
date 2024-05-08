import { Component } from '@angular/core';
import { Demande } from '../../../../services/models';
import { DemandeService, UserService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-gerer-demandes',
  templateUrl: './gerer-demandes.component.html',
  styleUrl: './gerer-demandes.component.scss'
})
export class GererDemandesComponent {
constructor(
  private   demandeService:DemandeService,
  private userService:UserService,
  private tokenService :TokenService
){}

  demandes:Demande[]=[];
  ngOnInit(): void {
    const Id = this.tokenService.Id;
    this.userService.findById({id: Id as number  })
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
