
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';
import { AuthenticationRequest, Departement, DepartementDto, RegistrationRequest, User, UserDto} from '../../../../services/models';
import { AuthenticationService } from '../../../../services/services/authentication.service';
import { DepartementService } from '../../../../services/services';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent  implements OnInit {
  userPath:string= `profile/${1}`
  Msg:String="";
  alert: string = "d-none";
  utilisateur: any;
  employes: UserDto[] = [];
  totalPages: number = 0;
  error: string = '';
  departements:DepartementDto[]=[];
addUtilisateurdepartement: number|null=null;
  constructor(
    private authService: AuthenticationService,

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

  accountUnlocked(user: User) {
    this.authService.unlockCompte({ id: user.id as number })
    .subscribe(unlock => {
        this.alert = 'alert alert-success';
        this.Msg = `Le compte de ${user.firstname} ${user.lastname} est débloqué.`;
        this.ngOnInit();

        setTimeout(() => {
            this.alert = 'd-none';
            this.Msg = ""; // Clear the message after hiding the alert
        }, 5000);
        
    });
}

  accountLocked(user:User ){
    this.authService.lockCompte({id:user.id as number})
    .subscribe(unlock => {
      this.alert = 'alert alert-success';
      this.Msg = `Le compte de ${user.firstname} ${user.lastname} est bloqué.`;
      this.ngOnInit();

      setTimeout(() => {
          this.alert = 'd-none';
          this.Msg = ""; // Clear the message after hiding the alert
      }, 5000);
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
 

  addUser(){
    const validationErrors = this.validateAddUser(this.addUtilisateur);

    // If there are validation errors, display them
    if (validationErrors.length > 0) {
  

      // Display validation errors to the user or handle them as needed
      this.alert = 'alert alert-danger';
      this.Msg = `Employée non ajouté. Erreurs de validation : ${validationErrors.join(', ')}`;
      setTimeout(() => {
        this.alert = 'd-none';
        this.Msg = ""; // Clear the message after hiding the alert
      }, 5000);

      return;
    }
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
          this.sendEmail(this.addUtilisateur.firstname!,    this.addUtilisateur.lastname,    this.addUtilisateur.email) ;

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
        if (error.error.error=== "Email already exists") {
            this.Msg = "Email est déjà utilisé";
        } else if (error.error.error === "CIN already exists") {
            this.Msg = "CIN est déjà utilisé";
        } else {
            this.Msg = `Error: ${error}`;
        }
        setTimeout(() => {
            this.alert = 'd-none';
            this.Msg = "";
        }, 5000); // 5 seconds
    }
);
  }
  changePage(newPage: number) {
    this.page = newPage;
    this.fetchUsers();
  }
  deleteUser(user: UserDto) {
    this.usersService.delete({id:user.id as number})
    .subscribe(user=>{
       this.Msg = `Demande d'Autorisation de travail supplémentaire est supprimée!`;
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

  validateAddUser(addUtilisateur: any): string[] {
    const errors = [];

    // Validate Nom
    if (!addUtilisateur.firstname) {
        errors.push('Le nom est obligatoire.');
    } else if (addUtilisateur.firstname.length < 3) {
        errors.push('Le nom doit contenir au moins 3 caractères.');
    }

    // Validate Prénom
    if (!addUtilisateur.lastname) {
        errors.push('Le prénom est obligatoire.');
    } else if (addUtilisateur.lastname.length < 3) {
        errors.push('Le prénom doit contenir au moins 3 caractères.');
    }

    // Validate CIN
    if (!addUtilisateur.cin) {
        errors.push('Le CIN est obligatoire.');
    }

    // Validate Email
    if (!addUtilisateur.email) {
        errors.push('L\'email est obligatoire.');
    } else if (!this.isValidEmail(addUtilisateur.email)) {
        errors.push('L\'email n\'est pas valide.');
    }

    // Validate Date embauche
    if (!addUtilisateur.dembauche) {
        errors.push('La date d\'embauche est obligatoire.');
    }

    // Validate Poste
    if (!addUtilisateur.role) {
        errors.push('Le poste est obligatoire.');
    }

    // Validate Département
    if (!addUtilisateur.departement) {
        errors.push('Le département est obligatoire.');
    }

    // Validate Sexe
    if (!addUtilisateur.sexe) {
        errors.push('Le sexe est obligatoire.');
    }

    // Validate Adresse
    if (!addUtilisateur.address) {
        errors.push('L\'adresse est obligatoire.');
    }

    // Validate Téléphone
    if (!addUtilisateur.phonenumber) {
        errors.push('Le numéro de téléphone est obligatoire.');
    } else if (!/^\d+$/.test(addUtilisateur.phonenumber)) {
        errors.push('Le numéro de téléphone doit être un nombre.');
    }

    // Validate Photo
    // if (!addUtilisateur.img) {
    //     errors.push('La photo est obligatoire.');
    // }

    return errors;
}

  
  // Method to check if the email is valid
  isValidEmail(email: string): boolean {
    // Use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  public sendEmail(firstname: string, lastname: string, email: string) {
    if (firstname && lastname && email) {
      emailjs.send("Saiph1234", "saiph-Create-User", {
        firstname: firstname,
        lastname: lastname,
        email: email,
      },'nsAnQ6GlnMesrf6zn')
        .then((result: EmailJSResponseStatus) => {
          console.log("Message sent successfully ✅");
        }, (error) => {
          console.error("Message not sent (service error) ❌", error);
        });
    } else {
      console.error("Invalid email parameters. Email not sent.");
    }
  }
}