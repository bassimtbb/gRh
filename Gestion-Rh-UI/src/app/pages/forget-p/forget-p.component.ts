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
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
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

  login() {
    this.router.navigate(['login']);
  }
}
