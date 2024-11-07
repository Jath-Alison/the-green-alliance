import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

import { LoginButtonComponent } from '../login-button/login-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbModule, RouterLink, LoginButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() title: string = "";
  @Input() username: string = "";
  isMenuCollapsed : boolean = true;
}
