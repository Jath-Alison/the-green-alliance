import { Component, Input, NgModule } from '@angular/core';
import { TeamCriteriaValuesResponse, TeamCriteriaValue, Team, criteriaConfig } from '../Schemas';
import { LoadingComponent } from '../loading/loading.component';
import { DatabaseAPI } from '../DatabaseAPI';
import { FormsModule } from '@angular/forms';

interface criteria {
  id: number,
  name: string,
  value: number,
}

@Component({
  selector: 'app-event-team-criteria',
  standalone: true,
  imports: [LoadingComponent, FormsModule],
  templateUrl: './event-team-criteria.component.html',
  styleUrl: './event-team-criteria.component.css'
})
export class EventTeamCriteriaComponent {

  constructor(private db: DatabaseAPI) {  }
  
  @Input() criteriaInfo: criteriaConfig[] = [];
  @Input() teamInfo!: Team;
  @Input() eventId: number = -1;

  teamCriteriaResponse!: TeamCriteriaValuesResponse;

  ngOnChanges() {
    if (this.db.getUserID() != -1) {
      this.db.getTeamCriteria(this.db.getUserID(), this.eventId, this.teamInfo.id).subscribe(result => {
        // console.log("Team Criteria Response: ");
        // console.log(JSON.stringify(result));
        this.teamCriteriaResponse = result;
        if (this.teamCriteriaResponse.data.length < this.criteriaInfo.length) {
          let missingCriteriaValues: TeamCriteriaValue[] = [];

          for (let i = 0; i < this.criteriaInfo.length; i++) {
            let contained = false;

            for (let j = 0; j < this.teamCriteriaResponse.data.length; j++) {
              if (this.teamCriteriaResponse.data[j].criteria_id == this.criteriaInfo[i].criteria_id) {
                contained = true;
              }
            }

            if (!contained) {
              console.log("team id " + this.teamInfo.id);
              let temp: TeamCriteriaValue = {
                entry_id: 0,
                team_id: this.teamInfo.id,
                criteria_id: this.criteriaInfo[i].criteria_id,
                criteria_value: 0,
                user_id: this.db.getUserID(),
                event_id: this.eventId,
                criteria_name: this.criteriaInfo[i].criteria_name,
                criteria_weight: this.criteriaInfo[i].criteria_weight,
              };

              missingCriteriaValues.push(temp);
            }
          }

          this.db.addCriteria(missingCriteriaValues).subscribe(result => {
            console.log("Added missing criteria values");
            this.db.getTeamCriteria(this.db.getUserID(), this.eventId, this.teamInfo.id).subscribe(result => {
              this.teamCriteriaResponse = result;
            });
          });
        }
      });
    }
  }

  saveCriteria() {
    let criteriaToSave: TeamCriteriaValue[] = [];

    for (let i = 0; i < this.teamCriteriaResponse.data.length; i++) {

      let temp: TeamCriteriaValue = {
        entry_id: 0,
        team_id: this.teamInfo.id,
        criteria_id: this.teamCriteriaResponse.data[i].criteria_id,
        criteria_value: this.teamCriteriaResponse.data[i].criteria_value,
        user_id: this.db.getUserID(),
        event_id: this.eventId,
        criteria_name: this.teamCriteriaResponse.data[i].criteria_name,
        criteria_weight: this.teamCriteriaResponse.data[i].criteria_weight,
      };

      criteriaToSave.push(temp);
    };

    this.db.setCriteria(criteriaToSave).subscribe(result => {
      console.log("Saved criteria values");
      this.db.getTeamCriteria(this.db.getUserID(), this.eventId, this.teamInfo.id).subscribe(result => {
        this.teamCriteriaResponse = result;
      });
    });
  }
}
