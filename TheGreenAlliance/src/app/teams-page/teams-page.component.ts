import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamsComponent } from '../teams/teams.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseAPI } from '../DatabaseAPI';

@Component({
  selector: 'app-teams-page',
  standalone: true,
  imports: [FormsModule, TeamsComponent, NgbModule],
  templateUrl: './teams-page.component.html',
  styleUrl: './teams-page.component.css'
})
export class TeamsPageComponent {

  constructor(private db: DatabaseAPI){}

  ngOnInit(){
  }

  OnlyRegistered: number = 1;

  ProgramFilterID: number = 1;
  Programs = [
    { id: 1, "abbr": "V5RC", "name": "VEX V5 Robotics Competition" },
    { id: 4, "abbr": "VURC", "name": "VEX U Robotics Competition" },
    { id: 37, "abbr": "WORKSHOP", "name": "Workshops & Camps" },
    { id: 41, "abbr": "VIQRC", "name": "VEX IQ Robotics Competition" },
    { id: 43, "abbr": "NRL", "name": "National Robotics League" },
    { id: 44, "abbr": "ADC", "name": "Aerial Drone Competition" },
    { id: 56, "abbr": "FAC", "name": "VEX  Factory Automation Competition" },
    { id: 57, "abbr": "VAIRC", "name": "VEX AI Robotics Competition" }]
  setProgramFilter(programID: number) {
    this.ProgramFilterID = programID;
  }

  TeamNumberFilter: string = "";
}
