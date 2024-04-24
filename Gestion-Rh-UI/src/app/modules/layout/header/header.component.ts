import { Component ,OnInit} from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { Utilisateur } from '../../../services/models';
import {Router} from '@angular/router';
import { UtilisateurControllerService } from '../../../services/services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
emailcon() {
  console.log(this.tokenService)
}
  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }
  constructor(
    public tokenService: TokenService,
      private utilisateur: UtilisateurControllerService,
      private router: Router
  ) {}

logout() {
  localStorage.removeItem('token');
  window.location.reload();
}


displayuserDetails(user: Utilisateur) {
  this.router.navigate(['Home', 'profile', user.id]);
}


isActive(route: string): boolean {
return true;
}
  notifications: string[] = ['notif1','notif2','notif3','notif4'];
}

