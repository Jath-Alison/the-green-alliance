import { Routes } from '@angular/router';
import { EventsPageComponent } from './events-page/events-page.component';
import { EventBlockComponent } from './event-block/event-block.component';
import { TeamsPageComponent } from './teams-page/teams-page.component';

export const routes: Routes = [
    { path: 'Events', component: EventsPageComponent },
    { path: 'Teams', component: TeamsPageComponent },
    { path: '**', component: EventBlockComponent },
];
