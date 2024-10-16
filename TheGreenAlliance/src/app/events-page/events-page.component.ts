import { Component } from '@angular/core';
import { EventsComponent } from '../events/events.component';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [EventsComponent],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css'
})
export class EventsPageComponent {

}
