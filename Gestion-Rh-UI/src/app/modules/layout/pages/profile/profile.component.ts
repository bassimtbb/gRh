import { Component } from '@angular/core';
import { UserDetails, User, UserDto } from '../../../../services/models';
import { AuthenticationService, UserService } from '../../../../services/services';
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
  user: UserDto = {};
  updatedUserInfo: User ={};
  userUp: User | null = null;
  alert: string = "d-none";
  Msg: string="";


  constructor(
    private authenticationService : AuthenticationService,
    private userService: UserService,
    private tokenService: TokenService
  ) {}
  ngOnInit(): void {
    const Id = this.tokenService.Id;
    this.userService.findById({id: Id as number  })
    .subscribe(user => {
      console.log('token retrieved:', this.tokenService.token);
      this.user = user;
      console.log('User retrieved:', user);
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

  updatetelephone() {
    if (!this.user || !this.updatedUserInfo.phonenumber) {
      console.error('Missing user data or updated phonenumber. Update cannot proceed.');
      return;
    }
    // Prepare the updated user object
    const updatedUser = {
      ...this.user, 
      phonenumber: this.updatedUserInfo.phonenumber // Update the telephone with the value from updatedUserInfo
    };
    console.log('telephone updated updatedUser:', updatedUser);
  
    // Call the update user service method (assuming it exists)
    this.userService.update({id :updatedUser.id as number, body: updatedUser})
      .subscribe(response => {
        console.log('telephone updated successfully:', response);
        this.user =response;
        this.Msg = ` Numéro de téléphone a été modifiée avec succès!`;
        this.alert ="alert alert-success" ;
        this.ngOnInit();
        setTimeout(() => {
        this.alert = 'd-none';
        }, 5000); 
      }, error => {
        console.error('Error updating telephone:', error);
        this.Msg = ` Numéro de téléphone a été modifiée avec succès!`;
        this.alert ="alert alert-success" ;
      });

  }

  updateemail() {
    if (!this.user || !this.updatedUserInfo.email) {
      console.error('Missing user data or updated email. Update cannot proceed.');
      return;
    }
    // Prepare the updated user object
    const updatedUser = {
      ...this.user, 
      email: this.updatedUserInfo.email // Update the email with the value from updatedUserInfo
    };
    console.log('email updated updatedUser:', updatedUser);
  
    // Call the update user service method (assuming it exists)
    this.userService.update({id :updatedUser.id as number, body: updatedUser})
      .subscribe(response => {
        console.log('email updated successfully:', response);
        this.user =response;
        
      }, error => {
        console.error('Error updating email:', error);
        // Handle the error (e.g., display an error message to the user)
      });

  }

  updatePassword() {
    if (!this.user || !this.updatedUserInfo.password) {
      console.error('Missing user data or updated password. Update cannot proceed.');
      return;
    }
  
  // this.authenticationService.codeMdp({mdp :this.updatedUserInfo.password })
  // .subscribe(
  //   (password) => {
  //     console.log('Password code', password);
  //     this.updatedUserInfo.password=password;
  //   })

  //   const updatedUser = {
  //     ...this.user,
  //     password: this.updatedUserInfo.password 
  //   };
  
  //   console.log('Password updated in updatedUser:', updatedUser);
  //   this.userService.update({ id: updatedUser.id as number, body: updatedUser })
  //     .subscribe(
  //       (response) => {
  //         console.log('Password updated successfully:', response);
  //         this.user = response;
  //       },
  //       (error) => {
  //         console.error('Error updating password:', error);
  //       }
  //     );
  }
  

  }


