import { Component, Input, output } from '@angular/core';
import { Team } from '../Schemas';

@Component({
  selector: 'app-team-number-block',
  standalone: true,
  imports: [],
  templateUrl: './team-number-block.component.html',
  styleUrl: './team-number-block.component.css'
})
export class TeamNumberBlockComponent {

  @Input() teamInfo!: Team;

  teamNumberClicked = output<Team>();

  emitTeamBlockClicked(){
    this.teamNumberClicked.emit(this.teamInfo);
  }
}
