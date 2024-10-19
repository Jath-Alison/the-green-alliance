import { Component, SimpleChanges, Input, input } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { AsyncPipe } from '@angular/common';
import { TeamBlockComponent } from '../team-block/team-block.component';
import { Teams } from '../Schemas';
import { RobotEventsAPI } from '../RobotEventsAPI';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [TeamBlockComponent, LoadingComponent, AsyncPipe],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {

  constructor(private api: RobotEventsAPI) { }
  teams$!: Observable<Teams>;

  @Input() ProgramFilter: string = "";
  @Input() TeamNumber: string = "";
  @Input() RegisteredFilter: string = "";

  ProgramFilterInt: number = 0;
  PageFilterInt: number = 1;
  RegisteredFilterBool: boolean = true;

  ngOnInit(): void {
    this.teams$ = this.api.getFilteredTeams({
      ProgramID: 1,
      TeamNumber: "",
      RegisteredOnly: this.RegisteredFilterBool,
      Page: 1
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.reload();
  }

  reload(){
    this.PageFilterInt = 1;
    this.ProgramFilterInt = parseInt(this.ProgramFilter); 
    this.RegisteredFilterBool = parseInt(this.RegisteredFilter) == 1;

    this.teams$ = this.api.getFilteredTeams({
      ProgramID: this.ProgramFilterInt,
      TeamNumber: this.TeamNumber,
      RegisteredOnly: this.RegisteredFilterBool,
      Page: this.PageFilterInt
    });
  }
  reloadWithPage(page:number){
    this.ProgramFilterInt = parseInt(this.ProgramFilter); 
    this.RegisteredFilterBool = parseInt(this.RegisteredFilter) == 1;
    this.PageFilterInt += page;

    this.teams$ = this.api.getFilteredTeams({
      ProgramID: this.ProgramFilterInt,
      TeamNumber: this.TeamNumber,
      RegisteredOnly: this.RegisteredFilterBool,
      Page: this.PageFilterInt
    });
  }
}
