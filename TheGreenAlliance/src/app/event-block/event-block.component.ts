import { Component, Input } from '@angular/core';
import { EventData } from '../Schemas';

@Component({
  selector: 'app-event-block',
  standalone: true,
  imports: [],
  templateUrl: './event-block.component.html',
  styleUrl: './event-block.component.css'
})
export class EventBlockComponent {
  @Input() eventData!: EventData;

  date! : string;

  ngOnInit(): void {
    const d = new Date(Date.parse(this.eventData.start));
    this.date = d.toDateString();
  }
}
