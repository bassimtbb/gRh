import { Component, OnInit } from '@angular/core';
import { UserDetails, User, UserDto, Conge } from '../../../../services/models';
import { AuthenticationService, CongeService, UserService,  } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] // Corrected spelling
})
export class ProfileComponent implements OnInit {
  show: boolean = false;
  inputsDisabled = true; 
  user: UserDto = {} as UserDto; // Initialized properly
  updatedUserInfo: User = {} as User; // Initialized properly
  userUp: User | null = null;
  alert: string = "d-none";
  Msg: string = "";
conges :Conge[]=[];
soldeConge:number=0;
soldeCongePourcentage:number=0;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private congeService:CongeService,
  ) {}

  ngOnInit(): void {
    const Id = this.tokenService.Id;
    this.userService.findById({ id: Id as number })
      .subscribe(user => {
        console.log('Token retrieved:', this.tokenService.token);
        this.user = user;
        console.log('User retrieved:', user);
      }, error => {
        console.error('Error retrieving user information:', error);
        // Handle error (e.g., display error message)
      });
      this.congeService.getCongeByutilisateurId({utilisateurId:Id as number})
      .subscribe(conges=>{
        this.conges=conges;
        if(conges){
          this.soldeConge=this.compterSoldeConge(conges);
          this.soldeCongePourcentage=(this.soldeConge/30)*100;
        }
      })

  }
  
  compterSoldeConge(conges: Conge[]): number {
    let solde: number = 0;
    for (const conge of conges) {
      solde += conge.duree!;
    }
    return solde;
  }
  toggleInputs() {
    this.inputsDisabled = !this.inputsDisabled;
  }

  toggle() {
    this.show = !this.show;
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  updatetelephone() {
    if (!this.user || !this.updatedUserInfo.phonenumber) {
      console.error('Missing user data or updated phonenumber. Update cannot proceed.');
      return;
    }

    const updatedUser = {
      ...this.user, 
      phonenumber: this.updatedUserInfo.phonenumber
    };
    console.log('Telephone updated updatedUser:', updatedUser);
  
    this.authenticationService.updateInfoconfidentiel({ 
      id: updatedUser.id as number, 
      email: this.user.email as string,
      password: this.user.password as string,
      phoneNumber: updatedUser.phonenumber , })
      .subscribe(response => {
        console.log('Telephone updated successfully:', response);
        this.user = response;
        this.Msg = `Numéro de téléphone a été modifiée avec succès!`;
        this.alert = "alert alert-success";
        this.ngOnInit();
        setTimeout(() => {
          this.alert = 'd-none';
        }, 5000); 
      }, error => {
        console.error('Error updating telephone:', error);
        this.Msg = `ERROR: Numéro de téléphone n'a pas été modifiée`;
        this.alert = "alert alert-danger";
      });
  }

  updateemail() {
    if (!this.user || !this.updatedUserInfo.email) {
      console.error('Missing user data or updated email. Update cannot proceed.');
      return;
    }

    const updatedUser = {
      ...this.user, 
      email: this.updatedUserInfo.email
    };
    console.log('Email updated updatedUser:', updatedUser);
  
    this.authenticationService.updateInfoconfidentiel({ 
      id: this.user.id as number, 
      email: updatedUser.email as string,
      password: this.user.password as string,
      phoneNumber: this.user.phonenumber!  })
      .subscribe(response => {
        console.log('Telephone updated successfully:', response);
        this.user = response;
        this.Msg = `Email a été modifiée avec succès!`;
        this.alert = "alert alert-success";
        this.ngOnInit();
        setTimeout(() => {
          this.alert = 'd-none';
        }, 5000); 
      }, error => {
        console.error('Error updating Email:', error);
        this.Msg = `ERROR: Email n'a pas été modifiée`;
        this.alert = "alert alert-danger";
      });
  }

  updatePassword() {
    if (!this.user || !this.updatedUserInfo.password) {
      console.error('Missing user data or updated password. Update cannot proceed.');
      return;
    }

    const updatedUser = {
      ...this.user,
      password: this.updatedUserInfo.password 
    };
  
    console.log('Password updated in updatedUser:', updatedUser.password);
    this.authenticationService.updateInfoconfidentiel({ 
      id: this.user.id as number, 
      email: this.user.email as string,
      password: updatedUser.password as string,
      phoneNumber: this.user.phonenumber!  })
      .subscribe(response => {
        console.log('Mot de passe updated successfully:', response);
        this.user = response;
        this.Msg = `Mot de passe a été modifiée avec succès!`;
        this.alert = "alert alert-success";
        this.ngOnInit();
        setTimeout(() => {
          this.alert = 'd-none';
        }, 5000); 
      }, error => {
        console.error('Error updating Mot de passe :', error);
        this.Msg = `ERROR: Mot de passe  n'a pas été modifiée`;
        this.alert = "alert alert-danger";
      });
  }
}
