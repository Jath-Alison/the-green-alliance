import { Component, Input, output } from '@angular/core';
import { Team } from '../Schemas';
import { DatabaseAPI } from '../DatabaseAPI';

@Component({
  selector: 'app-team-block',
  standalone: true,
  imports: [],
  templateUrl: './team-block.component.html',
  styleUrl: './team-block.component.css'
})
export class TeamBlockComponent {
  @Input() teamData!: Team;
  @Input() isStarred: boolean = false;

  constructor(private db: DatabaseAPI) { }

  ngOnInit(): void {
    let arr = this.db.getFavoriteTeams();
    let has: boolean = false;

    // console.log(this.db.getFavoriteTeams());

    for (let i = 0; i < arr.length; i++) {
      // console.log(i + "->" + arr[i] + ", " + this.teamData.id + " = " + (this.db.getFavoriteTeams()[i] == this.teamData.id));
      if (arr[i] == this.teamData.id) {
        has = true;
      }
    }

    if (this.teamData.id != null && has) {
      this.isStarred = true;
    }
  }


  toggleStar(event: Event) {
    event.stopPropagation();
    this.isStarred = !this.isStarred;
    this.db.setFavoriteTeam(this.teamData.id, this.isStarred);

  }

  teamClicked = output<number>();

  emitTeamBlockClicked() {
    this.teamClicked.emit(this.teamData.id);
  }
}
