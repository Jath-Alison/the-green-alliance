import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() ProgramFilter: string = "";
  @Input() SeasonFilter: string = "";
  @Input() RegionFilter: string = "";

  ProgramFilterInt: number = 0;
  SeasonFilterInt: number = 0;
  PageFilterInt: number = 1;

  constructor(private api: RobotEventsAPI) { }
  events$!: Observable<Events>;

  ngOnInit(): void {
    this.events$ = this.api.getEvents();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.reload();
  }
  reload(): void {
    this.PageFilterInt = 1;
    this.ProgramFilterInt = parseInt(this.ProgramFilter);
    this.SeasonFilterInt = parseInt(this.SeasonFilter);

    // if (this.SeasonFilterInt != 0) {
    //   this.events$ = this.api.getSeasonFilteredEvents(this.SeasonFilterInt);
    // } else {
    //   this.events$ = this.api.getEvents();
    // }
    this.events$ = this.api.getFilteredEvents({ 
      ProgramID: this.ProgramFilterInt,
      SeasonId: this.SeasonFilterInt,
      RegionName: this.RegionFilter,
      Page: this.PageFilterInt
    })
  }

  reloadWithPage(page: number): void {
    this.PageFilterInt += page;
    this.ProgramFilterInt = parseInt(this.ProgramFilter);
    this.SeasonFilterInt = parseInt(this.SeasonFilter);

    // if (this.SeasonFilterInt != 0) {
    //   this.events$ = this.api.getSeasonFilteredEvents(this.SeasonFilterInt);
    // } else {
    //   this.events$ = this.api.getEvents();
    // }
    this.events$ = this.api.getFilteredEvents({ 
      ProgramID: this.ProgramFilterInt,
      SeasonId: this.SeasonFilterInt,
      RegionName: this.RegionFilter,
      Page: this.PageFilterInt
    })
  }
}
