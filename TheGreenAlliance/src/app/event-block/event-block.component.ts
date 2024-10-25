import { Component, Input, output } from '@angular/core';
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

  eventClicked = output<number>();

  emitEventBlockClicked(){
    this.eventClicked.emit(this.eventData.id);
  }
}
