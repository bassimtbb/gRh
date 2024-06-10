import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';
import { AuthenticationRequest } from '../../services/models';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  login() {
    this.errorMsg = [];
    console.log(this.authRequest);
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['Home/profile']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.error;
        } else {
          switch (err.error.error) {
            case "Current password is incorrect":
              this.errorMsg.push("Le mot de passe actuel est incorrect.");
              break;
            case "The new password does not match":
              this.errorMsg.push("Le nouveau mot de passe ne correspond pas.");
              break;
            case "User account is locked":
              this.errorMsg.push("Votre compte utilisateur est verrouillé.");
              break;
            case "User account is disabled":
              this.errorMsg.push("Le compte utilisateur est désactivé.");
              break;
            case "Login and / or Password is incorrect":
              this.errorMsg.push("Le mot de passe incorrect.");
              break;
              case "Email est incorrecte":
                this.errorMsg.push("Email est incorrecte");
                break;
            default:
              this.errorMsg.push("Une erreur est survenue.");
          }
        }
      }
    });
  }
  
  forgetP() {
    this.router.navigate(['forgetP']);
  }
}
