
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/services/user.service';
import { TokenService } from '../../../../services/token/token.service';
import { AuthenticationRequest, RegistrationRequest, User} from '../../../../services/models';
import { AuthenticationService } from '../../../../services/services/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent  implements OnInit {
  utilisateur: any;
  employes: User[] = [];
  totalPages: number = 0;
  error: string = '';

  constructor(
    private registre: AuthenticationService,
    private usersService: UserService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.fetchUsers(); // Fetch initial page on load
  }

  page = 0;
  size = 5;

  fetchUsers() {
    this.usersService.findAll()
     .subscribe(users => {
   this.employes=users;
        this.error = '';
      }, error => {
        this.error = 'Error retrieving user information.';
        console.error('Error retrieving user information:', error);
      });
  }


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

  alert: string = "d-none";


  addUtilisateur: RegistrationRequest = {
    firstname: '',
    lastname: '',
    cin: '',
    password: 'password',
    email: '',
    service: '',
    sexe: '',
    phonenumber: '',
    address: '',
    ejuridic: '',
    img: '',
    dembauche: ''
  };

  Msg:String="";

  addUser(){
    console.log(this.addUtilisateur);
    mesg :String;
    this.addUtilisateur = {
      ...this.addUtilisateur,
      password: 'password',


    };
    this.registre.register({ body: this.addUtilisateur })
    .subscribe(
      () => {
        // Handle success
        this.alert = 'alert alert-success';
        console.log('User added successfully:', this.addUtilisateur);
        // Construct the success message outside of interpolation

         this.Msg = `Employé(e) ${this.addUtilisateur.firstname} ${this.addUtilisateur.lastname} est ajouté(e) avec succès!`;
        setTimeout(() => {
          this.alert = 'd-none';
             this.ngOnInit();
          this.Msg="";
        }, 5000); // 5 seconds
      },
      (error) => {
        // Handle error
        this.alert = 'alert alert-danger';
        console.error('Error adding user:', error);
        this.Msg = `: ${error}`;
        setTimeout(() => {
          this.alert = 'd-none';
          this.Msg="";

        }, 5000); // 5 seconds
      }
    );
  }
  changePage(newPage: number) {
    this.page = newPage;
    this.fetchUsers();
  }

}
