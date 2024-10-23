import { Routes } from '@angular/router';
import { EventsPageComponent } from './events-page/events-page.component';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'events', component: EventsPageComponent},
    { path: 'teams', component: TeamsPageComponent },
    { path: '', component: HomePageComponent },
    { path: '**', component: PageNotFoundComponent },
];
