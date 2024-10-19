import { Component, Input } from '@angular/core';
import { Team } from '../Schemas';

@Component({
  selector: 'app-team-block',
  standalone: true,
  imports: [],
  templateUrl: './team-block.component.html',
  styleUrl: './team-block.component.css'
})
export class TeamBlockComponent {
  @Input() teamData!: Team;

  ngOnInit(): void {
  }
}
