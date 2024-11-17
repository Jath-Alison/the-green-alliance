import { Component } from '@angular/core';
import { RobotEventsAPI } from '../RobotEventsAPI';
import { DatabaseAPI } from '../DatabaseAPI';
import { Events, Teams } from '../Schemas';
import { EventBlockComponent } from '../event-block/event-block.component';
import { LoadingComponent } from "../loading/loading.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamBlockComponent } from "../team-block/team-block.component";
import { LoginButtonComponent } from "../login-button/login-button.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EventBlockComponent, LoadingComponent, NgbModule, TeamBlockComponent, LoginButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private robotEvents:RobotEventsAPI, private db: DatabaseAPI) {}

  favEventData!: Events;
  favTeamData!: Teams;

  eventsCollapsed = false;
  teamsCollapsed = true;

  username = "";

  openEvents(){
    if(this.eventsCollapsed){
      this.eventsCollapsed = false;
      this.teamsCollapsed = true;
    }else{
      this.eventsCollapsed = true;
    }
  }
  openTeams(){
    if(this.teamsCollapsed){
      this.teamsCollapsed = false;
      this.eventsCollapsed = true;
    }else{
      this.teamsCollapsed = true;
    }
  }

  ngOnInit(){

    this.username = this.db.getUsername();

    setTimeout(() => {      
      this.robotEvents.getEventsFromIds(this.db.getFavoriteEvents()).subscribe(result =>{
        this.favEventData = result;
      });
      
      this.robotEvents.getTeamsFromIds(this.db.getFavoriteTeams()).subscribe(result =>{
        this.favTeamData = result;
      });
    }, 2000);
  }
  
}