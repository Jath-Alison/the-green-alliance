import { Component } from '@angular/core';
import { EventsComponent } from '../events/events.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Season, Seasons } from '../Schemas';
import { RobotEventsAPI } from '../RobotEventsAPI';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseAPI } from '../DatabaseAPI';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [EventsComponent, NgbModule, AsyncPipe, FormsModule],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css'
})
export class EventsPageComponent {
  constructor(private api: RobotEventsAPI, private db:DatabaseAPI) { }

  ngOnInit(): void {
    this.setProgramFilter(this.Programs[0].id);
  }

  ProgramFilterID: number = 0;
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
    this.Seasons = this.api.getSeasonsByProgram(programID);
    this.Seasons.subscribe(seasons => {
      this.SeasonFilterID = seasons.data[0].id;
    });
  }

  SeasonFilterID: number = 0;
  Seasons!: Observable<Seasons>;
  setSeasonFilter(seasonID: number) {
    this.SeasonFilterID = seasonID;
    
  }

  RegionFilterName: string = "";
}
