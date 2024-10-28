import { Component, Input } from '@angular/core';
import { Team } from '../Schemas';
import { Observable } from 'rxjs';
import { RobotEventsAPI } from '../RobotEventsAPI';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../loading/loading.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgbNavModule, LoadingComponent, AsyncPipe],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  
  constructor(private api: RobotEventsAPI) { }
  
  // EventInfo!: Observable<EventData>;
  TeamData!: Observable<Team>;

  Number: string = "Loading...";
  Name: string = "Loading...";

  @Input() set id(teamId: number) {
    this.TeamData = this.api.getTeamById(teamId);

    this.TeamData.subscribe(team => {
      this.Number = team.number;
      this.Name = team.team_name;
    });
  }

  active = 1;
}
