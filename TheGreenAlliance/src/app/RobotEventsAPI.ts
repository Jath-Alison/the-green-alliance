import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Events, EventData, Team, Teams } from './Schemas'

@Injectable({ providedIn: 'root' })
export class RobotEventsAPI {
  
  constructor(private http: HttpClient) {  }

  getEvents() : Observable<Events> {
    return this.http.get<Events>(`https://www.robotevents.com/api/v2/events`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }

  getEventByID(id: number) : Observable<EventData> {
    console.log(`https://www.robotevents.com/api/v2/events/${id}`);
    return this.http.get<EventData>(`https://www.robotevents.com/api/v2/events/${id}`, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDFkOGMxYjM0YWY0MzU0NzdlODZhNTljZjMxYjk4NTlmYTM1NGY4MTcwOTdjMzU0ODc5NWZmMmQ4NzZmMTYzYzdmOGQzYWZmODllMTQxYzEiLCJpYXQiOjE3MjgxOTEyODguNzI0NzkzOSwibmJmIjoxNzI4MTkxMjg4LjcyNDc5NywiZXhwIjoyNjc0ODc5Njg4LjcxMTcxMzgsInN1YiI6IjExMzk4NSIsInNjb3BlcyI6W119.mYr4d8n6oVpkJYa6qTxi_Eo44c38KT2zlN3Nmm5yOz6-Iw0FhUw3Q-xy6oAWLbf1N0Pq4J6SM8XHhvalMQArMzGzK_RjU3ptnJw33fypNKPrSfDNxqKzWKN6kMIg3XAH4i2ibxcGhOCOVqQ0fb-Hq1rx7ZiyFHmsu17lu8L8Eg5sScaiZGyvrylKr7D7SuFdpEasv18--KGNqOmjEXM9ApSaZr_OM64ny3ccVZYPAf4vNLJOER4Wasw1fPkkjOPfMS2nhA3EGVwL1F3lbJ7spsvuHmtyFsIWadDJMjwmLoB1AJhlccJn7eScks1XtRuXWlJ9HxkHIY5gcRFJFgIHWc9e_gT_pOVLFR5i0zSzpEoQV8q11ViXIuJ6c4adfKwtDw0HbJqlfzNSrzF682MvP9fFW0jP6kFi_xevt01Co_91fyyTV80SNbXWYDkadpmL16bPApgnyCg2xGxISP8cvyw7GEdZo4phfN4OXjfSNZB32PxNtVGnrfgFD7iFphUfZj-glfy-ypHp4UFbH3-v1OAkxi6duidxd8zmM79sEiazEwMOcpKYlUsiEEokAnyqQv1nebEtbi_4Ux2YN2181cPpgf2_REzNB78iGOTDOS1y8Jllupe7MjpQomaWtj3FD1MCNedKft6xLUgq-3JanlpeRFv3MTNHLzPK2taqrDQ'
      }
    });
  }
}