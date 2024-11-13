import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Events, EventData, Season, Seasons, Teams, Team, Matches, EventRankings } from './Schemas'

@Injectable({ providedIn: 'root' })
export class RobotEventsAPI {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Events> {
    return this.http.get<Events>(`https://www.robotevents.com/api/v2/events`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }
  getFilteredEvents(filters: {
    ProgramID: number,
    SeasonId: number,
    RegionName: string,
    Page: number
  }): Observable<Events> {
    let url = `https://www.robotevents.com/api/v2/events?event_type[]=${filters.ProgramID}&season[]=${filters.SeasonId}&region=${filters.RegionName}&page=${filters.Page}`;
    return this.http.get<Events>(url, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  getEventsFromIds(eventIds: number[]){
    let url = `https://www.robotevents.com/api/v2/events?id[]=${eventIds.join('&id[]=')}`;
    return this.http.get<Events>(url, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  getTeamsFromIds(teamIds: number[]){
    let url = `https://www.robotevents.com/api/v2/teams?id[]=${teamIds.join('&id[]=')}`;
    return this.http.get<Teams>(url, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  // getTeamsFromUrl(url: string){
  //   return this.http.get<Teams>(url, {
  //     headers: {
  //       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
  //     }
  //   });
  // }

  getSeasonFilteredEvents(season: number): Observable<Events> {
    // console.log(`https://www.robotevents.com/api/v2/events?season%5B%5D=${season}`);
    return this.http.get<Events>(`https://www.robotevents.com/api/v2/events?season%5B%5D=${season}`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  getEventsByURL(url: string): Observable<Events> {
    return this.http.get<Events>(url, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  getProgramFilteredEvents(program: number): Observable<Events> {
    // console.log(`https://www.robotevents.com/api/v2/events?program%5B%5D=${program}`);
    return this.http.get<Events>(`https://www.robotevents.com/api/v2/events?program%5B%5D=${program}`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  getEventByID(id: number): Observable<EventData> {
    return this.http.get<EventData>(`https://www.robotevents.com/api/v2/events/${id}`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  getTeamsByEventId(id: number): Observable<Teams> {
    return this.http.get<Teams>(`https://www.robotevents.com/api/v2/events/${id}/teams`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }
  
  getMatches(eventID:number, divisionID:number): Observable<Matches> {
    return this.http.get<Matches>(`https://www.robotevents.com/api/v2/events/${eventID}/divisions/${divisionID}/matches?per_page=250`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  getRankings(eventID:number, divisionID:number): Observable<EventRankings> {
    return this.http.get<EventRankings>(`https://www.robotevents.com/api/v2/events/${eventID}/divisions/${divisionID}/rankings?per_page=250`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`https://www.robotevents.com/api/v2/teams/${id}`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }
  getTeamsEventsById(id: number, seasonID:number): Observable<Events> {
    let seasonFilter = '';
    if (seasonID != 0){
      seasonFilter = `?season[]=${seasonID}`;
    }
    return this.http.get<Events>(`https://www.robotevents.com/api/v2/teams/${id}/events${seasonFilter}`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  getSeasonsByProgram(id: number): Observable<Seasons> {
    return this.http.get<Seasons>(`https://www.robotevents.com/api/v2/seasons?program%5B%5D=${id}`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  getTeams(): Observable<Teams> {
    return this.http.get<Teams>(`https://www.robotevents.com/api/v2/teams`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  alphanumeric_chars = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ];

  getFilteredTeams(filters: {
    ProgramID: number,
    TeamNumber: string,
    RegisteredOnly: boolean,
    Page: number
  }): Observable<Teams> {
    let url = `https://www.robotevents.com/api/v2/teams?program[]=${filters.ProgramID}&page=${filters.Page}`;
    if (filters.TeamNumber != "") {
      url += `&number[]=${filters.TeamNumber}`;
      for (let i = 0; i < this.alphanumeric_chars.length; i++) {
        const char = this.alphanumeric_chars[i];
        url += `&number[]=${filters.TeamNumber}` + char;
      }
    }
    if (filters.RegisteredOnly) { url += `&registered=true`; }
    // console.log(url);
    return this.http.get<Teams>(url, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

}