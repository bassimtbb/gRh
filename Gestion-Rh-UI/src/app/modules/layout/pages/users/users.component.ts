
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/services/user.service';
import { TokenService } from '../../../../services/token/token.service';
import { AuthenticationRequest, Departement, DepartementDto, RegistrationRequest, User, UserDto} from '../../../../services/models';
import { AuthenticationService } from '../../../../services/services/authentication.service';
import { DepartementService } from '../../../../services/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent  implements OnInit {
  utilisateur: any;
  employes: UserDto[] = [];
  totalPages: number = 0;
  error: string = '';
  departements:DepartementDto[]=[];
addUtilisateurdepartement: number|null=null;
  constructor(
    private registre: AuthenticationService,
    private usersService: UserService,
    private departementService: DepartementService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.fetchUsers(); // Fetch initial page on load
    this.departementService.findAll4()
    .subscribe(departement =>{
      this.departements=departement;
    })
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
    dembauche: '',
    role:'EMPLOYE',
    departement:{}
  };

  Msg:String="";

  addUser(){
    console.log("departementid",this.addUtilisateurdepartement);

    this.addUtilisateur = {
      ...this.addUtilisateur,
      password: 'password',
      departement:{"id":this.addUtilisateurdepartement as number},

    };
  console.log("useradd",this.addUtilisateur);
    this.registre.register({ body: this.addUtilisateur })
    .subscribe(
      (User) => {
          this.ngOnInit();
        this.alert = 'alert alert-success';
        console.log('User added successfully:', User);
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
