import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurControllerService } from '../../../../services/services/utilisateur-controller.service';
import { TokenService } from '../../../../services/token/token.service';
import { Utilisateur } from '../../../../services/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  utilisateur :any;
  employes:Utilisateur[]=[] ;
addUtilisateur: Utilisateur  ={};

constructor(
  private utilisateurService: UtilisateurControllerService,
  private tokenService: TokenService
) {}


ngOnInit(): void {
  this.utilisateurService.findAll()
  .subscribe(utilisateur => {
    this.employes = utilisateur;
    console.log('Utilisateur retrieved:', this.employes);
  }, error => {
    console.error('Error retrieving user information:', error);
    // Handle error (e.g., display error message)
  });
  }
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
      return 'valid';
    case 'En attente':
      return 'pending';
    case 'Refusée':
      return 'rejected';
    default:
      return '';
  }
}

employer!: FormGroup;
alert:string="d-none";

 
  onSubmit() {

    this.alert ="alert alert-success" ;
    console.log(this.employer.value);
    setTimeout(() => {
      this.alert = 'd-none';
    }, 5000); // 10 seconds
  }
 }
