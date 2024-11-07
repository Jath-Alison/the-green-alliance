import { Component, Input } from '@angular/core';
import { EventData, Matches, Teams } from '../Schemas';
import { RobotEventsAPI } from '../RobotEventsAPI';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseAPI } from '../DatabaseAPI';
import { criteriaConfigResponse, criteriaConfig } from '../Schemas';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [AsyncPipe, LoadingComponent, NgbNavModule, LoginButtonComponent, FormsModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  constructor(private api: RobotEventsAPI, private db: DatabaseAPI) { }

  EventInfo!: Observable<EventData>;
  eventData!: EventData;

  Teams!: Teams;
  Matches!: Matches;

  Title: string = "Loading...";
  Subtitle: string = "Loading...";

  CriteriaConfigs!: criteriaConfigResponse;

  sendCriteriaConfig() {
    this.db.setCriteriaConfig(this.CriteriaConfigs);
  }
  getCriteriaConfig() {
    if (this.eventData != null) {
      if (this.db.getUserID() != -1 && this.eventData) {
        this.db.getCriteriaConfig(this.db.getUserID(), this.eventData.id).subscribe(criteriaConfigs => {
          this.CriteriaConfigs = criteriaConfigs;
          // console.log(criteriaConfigs);
        });
      }
    }
  }

  addCriteriaConfig() {
    var temp: criteriaConfig = {
      criteria_id: 0,
      user_id: this.db.getUserID(),
      event_id: this.eventData.id,
      criteria_name: "New Criteria",
      criteria_weight: 0
    };
    this.db.addCriteriaConfig(temp).subscribe(result =>{
      // this.getCriteriaConfig();
    });
    this.CriteriaConfigs.data.push(temp);
  }
  removeCriteria(id:number){}

  @Input() set id(eventID: number) {
    this.EventInfo = this.api.getEventByID(eventID);

    this.EventInfo.subscribe(event => {
      if (event.name.indexOf("-") > 0) {
        this.Title = event.name.substring(0, event.name.indexOf("-") - 1);
        this.Subtitle = event.name.substring(event.name.indexOf("-") + 1, event.name.length);
      } else if (event.name.indexOf("[") > 0) {
        this.Title = event.name.substring(0, event.name.indexOf("["));
        this.Subtitle = event.name.substring(event.name.indexOf("[") + 1, event.name.indexOf("]"));
      } else if (event.name.indexOf("(") > 0) {
        this.Title = event.name.substring(0, event.name.indexOf("("));
        this.Subtitle = event.name.substring(event.name.indexOf("(") + 1, event.name.indexOf(")"));
      } else {
        this.Title = event.name;
        this.Subtitle = "";
      }

      const d1 = new Date(Date.parse(event.start));
      this.StartDate = d1.toDateString();
      const d2 = new Date(Date.parse(event.end));
      this.EndDate = d2.toDateString();

      this.eventData = event;

      this.getCriteriaConfig();
    });

    this.api.getTeamsByEventId(eventID).subscribe(teams => {
      this.Teams = teams;
    });

    this.api.getMatches(eventID, 1).subscribe(matches => {
      // console.log(matches);
      this.Matches = matches;
    });
  }

  convertToTime(time: string): string {
    const d = new Date(Date.parse(time));
    const out = d.toTimeString();

    return out.substring(0, 5);
  }

  active = 1;

  StartDate: string = "";
  EndDate: string = "";


}