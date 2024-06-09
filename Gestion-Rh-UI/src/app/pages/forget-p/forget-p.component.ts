import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-forget-p',
  templateUrl: './forget-p.component.html',
  styleUrl: './forget-p.component.scss'
})
export class ForgetPComponent {
  Msg!: string;
  alert!: string;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }
  email:string="";
  cin:string="";
  phonenum:string="";
  forgetPassword(){

    this.authService.resetPassword({ cin: this.cin, email: this.email, phoneNumber: this.phonenum })
    .subscribe({
        next: user => {
            this.sendEmail(user.lastname as string, this.email);
            this.alert = 'alert alert-success';
            this.Msg = `Vérifiez votre email`;

            setTimeout(() => {
                this.alert = 'd-none';
                this.Msg = ""; // Clear the message after hiding the alert
            }, 5000);
        },
        error: err => {
            console.log(err);
            this.alert = 'alert alert-danger';
            
            if (err.error && err.error.error) {
                switch (err.error.error) {
                    case 'User not found':
                        this.Msg = "Utilisateur non trouvé";
                        break;
                    case 'CIN does not match':
                        this.Msg = "Le CIN ne correspond pas";
                        break;
                    case 'Phone number does not match':
                        this.Msg = "Le numéro de téléphone ne correspond pas";
                        break;
                    default:
                        this.Msg = "Une erreur s'est produite lors de la réinitialisation du mot de passe";
                        break;
                }
            } else {
                this.Msg = "Une erreur s'est produite lors de la réinitialisation du mot de passe";
            }

            setTimeout(() => {
                this.alert = 'd-none';
                this.Msg = ""; // Clear the message after hiding the alert
            }, 5000);
        }
    });
  }
  public sendEmail(lastname: string, email: string) {
    if ( lastname && email) {
      emailjs.send("saiph_reset","saiph_reset",{
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

  login() {
    this.router.navigate(['login']);
  }
}
