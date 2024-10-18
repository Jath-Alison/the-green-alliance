import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { RobotEventsAPI } from '../RobotEventsAPI';
import { Events } from '../Schemas';
import { EventBlockComponent } from '../event-block/event-block.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventBlockComponent, LoadingComponent, AsyncPipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  constructor(private api: RobotEventsAPI) { }
  events$!: Observable<Events>;

  ngOnInit(): void {
    this.events$ = this.api.getEvents();
  }
}
