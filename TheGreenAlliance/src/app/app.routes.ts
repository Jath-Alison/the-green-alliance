import { Routes } from '@angular/router';
import { EventsPageComponent } from './events-page/events-page.component';
import { EventBlockComponent } from './event-block/event-block.component';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent }
    { path: 'events', component: EventsPageComponent },
    { path: 'teams', component: TeamsPageComponent },
    { path: '**', component: PageNotFoundComponent },
];
