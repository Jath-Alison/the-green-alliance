import { Routes } from '@angular/router';
import { EventsPageComponent } from './events-page/events-page.component';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EventComponent } from './event/event.component';
import { TeamComponent } from './team/team.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

export const routes: Routes = [
    { path: 'events', component: EventsPageComponent},
    { path: 'teams', component: TeamsPageComponent },
    { path: 'event/:id', component: EventComponent},
    { path: 'team/:id', component: TeamComponent},
    { path: 'login', component: LoginPageComponent},
    { path: 'signup', component: SignupPageComponent},
    { path: '', component: HomePageComponent },
    { path: '**', component: PageNotFoundComponent },
];
