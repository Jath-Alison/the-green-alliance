import { Component, Input } from '@angular/core';
import { Events, Seasons, Team } from '../Schemas';
import { Observable } from 'rxjs';
import { RobotEventsAPI } from '../RobotEventsAPI';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../loading/loading.component';
import { AsyncPipe } from '@angular/common';
import { EventBlockComponent } from "../event-block/event-block.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgbNavModule, LoadingComponent, AsyncPipe, EventBlockComponent, NgbModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

  constructor(private api: RobotEventsAPI, private router: Router) { }

  EventInfo!: Events;
  TeamData$!: Observable<Team>;
  TeamData!: Team;



  Number: string = "Loading...";
  Name: string = "Loading...";

  @Input() set id(teamId: number) {
    this.TeamData$ = this.api.getTeamById(teamId);

    this.TeamData$.subscribe(team => {
      this.Number = team.number;
      this.Name = team.team_name;
      this.TeamData = team;

      this.Seasons = this.api.getSeasonsByProgram(this.TeamData.program.id);
      this.Seasons.subscribe(seasons => {
        this.SeasonFilterID = seasons.data[0].id;
        this.reloadEvents();
      });
    });

  }

  reloadEvents() {
    if (this.TeamData != null) {
      this.api.getTeamsEventsById(this.TeamData.id, this.SeasonFilterID).subscribe(result => {
        this.EventInfo = result;
      });
    }
  }

  eventClicked(event: number) {
    this.router.navigate(['/event', event]);
  }

  SeasonFilterID: number = 0;
  Seasons!: Observable<Seasons>;
  setSeasonFilter(seasonID: number) {
    this.SeasonFilterID = seasonID;
    console.log("set season filter to: " + this.SeasonFilterID);
    this.reloadEvents();
  }

  active = 1;
}
