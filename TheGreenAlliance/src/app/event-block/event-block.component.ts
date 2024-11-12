import { Component, Input, output } from '@angular/core';
import { EventData } from '../Schemas';
import { DatabaseAPI } from '../DatabaseAPI';

@Component({
  selector: 'app-event-block',
  standalone: true,
  imports: [],
  templateUrl: './event-block.component.html',
  styleUrl: './event-block.component.css'
})
export class EventBlockComponent {
  constructor(private db: DatabaseAPI) {}

  @Input() eventData!: EventData;
  @Input() isStarred: boolean = false;

  date! : string;

  ngOnInit(): void {
    const d = new Date(Date.parse(this.eventData.start));
    this.date = d.toDateString();

    let arr = this.db.getFavoriteEvents();
    let has: boolean = false;

    // console.log(this.db.getFavoriteTeams());

    for (let i = 0; i < arr.length; i++) {
      // console.log(i + "->" + arr[i] + ", " + this.teamData.id + " = " + (this.db.getFavoriteTeams()[i] == this.teamData.id));
      if (arr[i] == this.eventData.id) {
        has = true;
      }
    }

    if (this.eventData.id != null && has) {
      this.isStarred = true;
    }
  }

  eventClicked = output<number>();

  emitEventBlockClicked(){
    this.eventClicked.emit(this.eventData.id);
  }

  toggleStar(event: Event){
    event.stopPropagation();
    this.isStarred = !this.isStarred;

    this.db.setFavoriteEvent(this.eventData.id, this.isStarred);
  }
}
