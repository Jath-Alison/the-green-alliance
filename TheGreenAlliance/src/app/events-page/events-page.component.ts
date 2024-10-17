import { Component } from '@angular/core';
import { EventsComponent } from '../events/events.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [EventsComponent, NgbModule],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css'
})
export class EventsPageComponent {

}
