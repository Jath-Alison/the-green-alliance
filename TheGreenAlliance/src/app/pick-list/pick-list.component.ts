import { Component, Input } from '@angular/core';
import { DatabaseAPI } from '../DatabaseAPI';
import { PickListResponse, Teams } from '../Schemas';

interface teamPickInfo {
  team_id: number;
  team_number: string;
  team_name: string;
  has_score: boolean;
  score: number;
};

@Component({
  selector: 'app-pick-list',
  standalone: true,
  imports: [],
  templateUrl: './pick-list.component.html',
  styleUrl: './pick-list.component.css'
})
export class PickListComponent {
  constructor(private db: DatabaseAPI) { }
  @Input() eventId: number = -1;
  @Input() teamsList!: Teams;

  pickList!: PickListResponse;

  teamPickInfoList: teamPickInfo[] = [];

  sortedTeamPickInfoList: teamPickInfo[] = [];
  teamsWithoutScore: teamPickInfo[] = [];

  ngOnInit() {
    if (this.eventId != -1 && this.db.getUserID() != -1) {
      console.log("Getting pick list for event " + this.eventId);
      this.db.getPickList(this.db.getUserID(), this.eventId).subscribe(data => {
        this.pickList = data;

        for (let i = 0; i < this.teamsList.data.length; i++) {
          let teamScore = 0;
          let hasScore = false;

          for (let j = 0; j < this.pickList.data.length; j++) {
            if (this.pickList.data[j].team_id == this.teamsList.data[i].id) {
              teamScore = this.pickList.data[j].score;
              hasScore = true;
              break;
            }
          }

          let team: teamPickInfo = {
            team_id: this.teamsList.data[i].id,
            team_number: this.teamsList.data[i].number,
            team_name: this.teamsList.data[i].team_name,
            has_score: hasScore,
            score: teamScore,
          };

          this.teamPickInfoList.push(team);
        }

        for (let i = 0; i < this.teamPickInfoList.length; i++) {
          if(this.teamPickInfoList[i].has_score){
            this.sortedTeamPickInfoList.push(this.teamPickInfoList[i]);
          }else{
            this.teamsWithoutScore.push(this.teamPickInfoList[i]);
          }
        }

        this.sortedTeamPickInfoList.sort((a, b) => b.score - a.score);

      });
    }
  }
}
