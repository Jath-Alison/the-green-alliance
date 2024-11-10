import { Component } from '@angular/core';
import { Event, NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EventsComponent } from './events/events.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DatabaseAPI } from './DatabaseAPI';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,
    EventsComponent, NavbarComponent,
    NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router, private db: DatabaseAPI) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.username = this.db.getUsername();
        console.log("got username: " + this.db.getUsername() + " w/ id: " + this.db.getUserID());
      }
    });
  }

  title = 'The Green Alliance';
  username = '';
}
