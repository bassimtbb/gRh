import { Component } from '@angular/core';
import { Utilisateur, UtilisateurDto } from '../../../../services/models';
import { AuthenticationService, UtilisateurControllerService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';
import { Router } from '@angular/router';
import {OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  show: boolean = false;
  inputsDisabled = true; 
  utilisateur: Utilisateur | null = null;
  updatedUserInfo: any ={};
  userUp: Utilisateur | null = null;


  constructor(
    private authenticationService : AuthenticationService,
    private utilisateurService: UtilisateurControllerService,
    private tokenService: TokenService
  ) {}
  ngOnInit(): void {
    const email = this.tokenService.email;
    this.utilisateurService.loadUserByUsername({ username: email as string })
    .subscribe(utilisateur => {
      console.log('token retrieved:', this.tokenService.token);
      this.utilisateur = utilisateur;
      console.log('Utilisateur retrieved:', utilisateur);
    }, error => {
      console.error('Error retrieving user information:', error);
      // Handle error (e.g., display error message)
    });
    }
  
  toggleInputs() {
    this.inputsDisabled = !this.inputsDisabled;
  }
   toggle() {
     this.show=!this.show;


   }
   logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }


  updateUsername() {
    if (!this.utilisateur || !this.updatedUserInfo.username) {
      console.error('Missing user data or updated username. Update cannot proceed.');
      return;
    }
    // Prepare the updated user object
    const updatedUser = {
      ...this.utilisateur, 
      username: this.updatedUserInfo.username // Update the username with the value from updatedUserInfo
    };
    console.log('Username updated updatedUser:', updatedUser);
  
    // Call the update user service method (assuming it exists)
    this.utilisateurService.update({id :updatedUser.id as number, body: updatedUser})
      .subscribe(response => {
        console.log('Username updated successfully:', response);
        // Update the local utilisateur object with the updated information
        this.utilisateur =response;
        // Optionally, display a success message to the user
      }, error => {
        console.error('Error updating username:', error);
        // Handle the error (e.g., display an error message to the user)
      });

  }
  
  updatetelephone() {
    if (!this.utilisateur || !this.updatedUserInfo.telephone) {
      console.error('Missing user data or updated telephone. Update cannot proceed.');
      return;
    }
    // Prepare the updated user object
    const updatedUser = {
      ...this.utilisateur, 
      telephone: this.updatedUserInfo.telephone // Update the telephone with the value from updatedUserInfo
    };
    console.log('telephone updated updatedUser:', updatedUser);
  
    // Call the update user service method (assuming it exists)
    this.utilisateurService.update({id :updatedUser.id as number, body: updatedUser})
      .subscribe(response => {
        console.log('telephone updated successfully:', response);
        // Update the local utilisateur object with the updated information
        this.utilisateur =response;
        // Optionally, display a success message to the user
      }, error => {
        console.error('Error updating telephone:', error);
        // Handle the error (e.g., display an error message to the user)
      });

  }

  updateemail() {
    if (!this.utilisateur || !this.updatedUserInfo.email) {
      console.error('Missing user data or updated email. Update cannot proceed.');
      return;
    }
    // Prepare the updated user object
    const updatedUser = {
      ...this.utilisateur, 
      email: this.updatedUserInfo.email // Update the email with the value from updatedUserInfo
    };
    console.log('email updated updatedUser:', updatedUser);
  
    // Call the update user service method (assuming it exists)
    this.utilisateurService.update({id :updatedUser.id as number, body: updatedUser})
      .subscribe(response => {
        console.log('email updated successfully:', response);
        // Update the local utilisateur object with the updated information
        this.utilisateur =response;
        // Optionally, display a success message to the user
      }, error => {
        console.error('Error updating email:', error);
        // Handle the error (e.g., display an error message to the user)
      });

  }

  updatePassword() {
    if (!this.utilisateur || !this.updatedUserInfo.password) {
      console.error('Missing user data or updated password. Update cannot proceed.');
      return;
    }
  
  this.authenticationService.codeMdp({mdp :this.updatedUserInfo.password })
  .subscribe(
    (password) => {
      console.log('Password code', password);
      this.updatedUserInfo.password=password;
    })

    const updatedUser = {
      ...this.utilisateur,
      password: this.updatedUserInfo.password 
    };
  
    console.log('Password updated in updatedUser:', updatedUser);
    this.utilisateurService.update({ id: updatedUser.id as number, body: updatedUser })
      .subscribe(
        (response) => {
          console.log('Password updated successfully:', response);
          this.utilisateur = response;
        },
        (error) => {
          console.error('Error updating password:', error);
        }
      );
  }
  

  }


