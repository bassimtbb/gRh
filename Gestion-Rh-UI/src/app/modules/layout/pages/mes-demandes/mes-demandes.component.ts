import { Component } from '@angular/core';

@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrl: './mes-demandes.component.scss'
})
export class MesDemandesComponent {
  demandes = [
    { Type: "Demande de congé", Statut: "Validée", Date: "2024-02-20", File: "" },
    { Type: "Demande de D’autorisation de télétravail", Statut: "En attente", Date: "2024-02-21", File: "" },
    { Type: "Demande de changement Horaire de travail", Statut: "Refusée", Date: "2024-02-22", File: "" },
    { Type: "Demande D’acompte sur Salaire/prime", Statut: "En attente", Date: "2024-02-23", File: "" },
    { Type: "Demande de D’autorisation de sortie", Statut: "Validée", Date: "2024-02-24", File: "" },
    { Type: "Demande de D’autorisation de travail le dimanche", Statut: "Refusée", Date: "2024-02-25", File: "" }
  ];
  length = 100; // Total number of items
  pageSize = 10; // Items per page
  pageSizeOptions = [5, 10, 25, 100]; // Available page sizes

  // // Handle page change event
  // onPageChange(event: PageEvent): void {
  //   const pageIndex = event.pageIndex;
  //   const pageSize = event.pageSize;
  //   // Fetch data based on pageIndex and pageSize
  //   // Update your table data accordingly
  
// }
getStatusClass(statut: string): string {
  switch (statut) {
    case 'Validée':
      return 'valid bi-check-circle-fill';
    case 'En attente':
      return 'pending bi-dash-circle-fill';
    case 'Refusée':
      return 'rejected bi-x-circle-fill';
    default:
      return '';
  }
}


alert!: string;    
nom:String ="Bassim";
prenom:String ="Tabbeb";
prenom_prenom:String =this.nom + " " + this.prenom;
qualite:String ="Qualité";
matricule:String ="FT23TG";
direction:String ="direction";
Service:String ="Service";
Dis:boolean=true;
demande :any;
ngOnInit(): void {

}


  AddAutorSortie() {

    this.alert ="alert alert-success" ;
   
    setTimeout(() => {
      this.alert = 'd-none';
    }, 5000); // 10 seconds
  }
}
