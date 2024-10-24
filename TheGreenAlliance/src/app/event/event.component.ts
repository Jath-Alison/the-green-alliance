import { Component, Input } from '@angular/core';
import { EventData } from '../Schemas';
import { RobotEventsAPI } from '../RobotEventsAPI';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [AsyncPipe, LoadingComponent, NgbNavModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  constructor(private api: RobotEventsAPI) { }

  EventInfo!: Observable<EventData>;

  Title: string = "Loading...";
  Subtitle: string = "Loading...";

  @Input() set id(eventID: number) {
    this.EventInfo = this.api.getEventByID(eventID);

    this.EventInfo.subscribe(event => {
      if(event.name.indexOf("-") > 0){
        this.Title = event.name.substring(0,event.name.indexOf("-") - 1);
        this.Subtitle = event.name.substring(event.name.indexOf("-") + 1,event.name.length);
      }else if(event.name.indexOf("[") > 0){
        this.Title = event.name.substring(0,event.name.indexOf("["));
        this.Subtitle = event.name.substring(event.name.indexOf("[") + 1,event.name.indexOf("]"));
      }else if(event.name.indexOf("(") > 0){
        this.Title = event.name.substring(0,event.name.indexOf("("));
        this.Subtitle = event.name.substring(event.name.indexOf("(") + 1,event.name.indexOf(")"));
      }else{
        this.Title = event.name;
        this.Subtitle = "";
      }
    });
  }

  active = 1;

}
