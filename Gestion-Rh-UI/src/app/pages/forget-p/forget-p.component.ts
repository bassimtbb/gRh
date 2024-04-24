import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';

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
  login() {
    this.router.navigate(['login']);
  }
}
