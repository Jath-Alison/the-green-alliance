import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { criteriaConfig, criteriaConfigResponse, loginResponse, PickListResponse, TeamCriteriaValue, TeamCriteriaValuesResponse } from './Schemas'

export type TeamIds = TeamId[]

export interface TeamId {
  team_id: number
}
let favTeams: number[] = [];

export type EventIds = EventId[]

export interface EventId {
  event_id: number
}
let favEvents: number[] = [];

export const userData = {
  userID: -1,
  username: "",
  favoriteTeams: favTeams,
  favoriteEvents: favEvents
};

@Injectable({ providedIn: 'root' })
export class DatabaseAPI {
  constructor(private http: HttpClient) { }

  setUsername(name: string): void {
    userData.username = name;
  }
  getUsername(): string {
    return userData.username;
  }

  setUserID(id: number): void {
    userData.userID = id;
  }
  getUserID(): number {
    return userData.userID;
  }

  loadFavoriteTeams() {
    let url = `http://localhost:3000/?cmd=getFavoriteTeams&user_id=${userData.userID}`;
    this.http.get<TeamIds>(url).subscribe(result => {
      // console.log(result);
      for (let data of result){
        userData.favoriteTeams.push(data.team_id);
      }
      // console.log(userData.favoriteTeams);
    });
  }
  getFavoriteTeams() {
    return userData.favoriteTeams;
  }
  setFavoriteTeam(id: number, favorite: boolean) {
    if (this.getUserID() == -1) { return; }
    if (favorite && userData.favoriteTeams.indexOf(id) == -1) {
      userData.favoriteTeams.push(id);
      let url = `http://localhost:3000/?cmd=addFavoriteTeam`;
      this.http.post<number>(url, { user_id: this.getUserID(), team_id: id }).subscribe(result => { });
    } else if (!favorite && userData.favoriteTeams.indexOf(id) != -1) {
      userData.favoriteTeams = userData.favoriteTeams.filter((ele, ind) => ele != id);
      let url = `http://localhost:3000/?cmd=removeFavoriteTeam`;
      this.http.post<number>(url, { user_id: this.getUserID(), team_id: id }).subscribe(result => { });
    }
  }

  loadFavoriteEvents() {
    let url = `http://localhost:3000/?cmd=getFavoriteEvents&user_id=${userData.userID}`;
    this.http.get<EventIds>(url).subscribe(result => {
      // console.log(result);
      for (let data of result){
        userData.favoriteEvents.push(data.event_id);
      }
      // console.log(userData.favoriteTeams);
    });
  }
  getFavoriteEvents() {
    return userData.favoriteEvents;
  }
  setFavoriteEvent(id: number, favorite: boolean) {
    if (this.getUserID() == -1) { return; }
    if (favorite && userData.favoriteEvents.indexOf(id) == -1) {
      userData.favoriteEvents.push(id);
      let url = `http://localhost:3000/?cmd=addFavoriteEvent`;
      this.http.post<number>(url, { user_id: this.getUserID(), event_id: id }).subscribe(result => { });
    } else if (!favorite && userData.favoriteEvents.indexOf(id) != -1) {
      userData.favoriteEvents = userData.favoriteEvents.filter((ele, ind) => ele != id);
      let url = `http://localhost:3000/?cmd=removeFavoriteEvent`;
      this.http.post<number>(url, { user_id: this.getUserID(), event_id: id }).subscribe(result => { });
    }
  }

  login(username: string, password: string): Observable<loginResponse> {

    let url = `http://localhost:3000/?cmd=login&username=${username}&password=${password}`;

    return this.http.get<loginResponse>(url);
  }

  createLogin(username: string, password: string): Observable<loginResponse> {

    let url = `http://localhost:3000/?cmd=createLogin`;

    return this.http.post<loginResponse>(url, { username: username, password: password });
  }

  getCriteriaConfig(userID: number, eventID: number): Observable<criteriaConfigResponse> {

    let url = `http://localhost:3000/?cmd=getCriteriaConfig&userid=${userID}&eventid=${eventID}`;

    return this.http.get<criteriaConfigResponse>(url);
  }

  setCriteriaConfig(criteriaConfig: criteriaConfigResponse) {
    let url = `http://localhost:3000/?cmd=setCriteriaConfig`;
    return this.http.post<criteriaConfigResponse>(url, criteriaConfig, {
      // headers: { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type' }
    });
  }

  addCriteriaConfig(singleCriteriaConfig: criteriaConfig): Observable<criteriaConfigResponse> {
    let url = `http://localhost:3000/?cmd=addCriteriaConfig`;
    let a: Observable<criteriaConfigResponse> = this.http.post<criteriaConfigResponse>(url, singleCriteriaConfig, {
      // headers: { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type' }
    });
    return a;
  }

  deleteCriteriaConfig(criteriaID: number): Observable<number> {
    let url = `http://localhost:3000/?cmd=deleteCriteriaConfig`;
    let a: Observable<number> = this.http.post<number>(url, criteriaID, {
      // headers: { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type' }
    });
    return a;
  }

  getTeamCriteria(userID: number, eventID: number, teamID: number): Observable<TeamCriteriaValuesResponse> {
    let url = `http://localhost:3000/?cmd=getTeamCriteria&userid=${userID}&eventid=${eventID}&teamid=${teamID}`;

    return this.http.get<TeamCriteriaValuesResponse>(url);
  }

  setCriteria(teamCriteriaValues: TeamCriteriaValue[]) {
    let url = `http://localhost:3000/?cmd=setCriteria`;
    let a: Observable<TeamCriteriaValue[]> = this.http.post<TeamCriteriaValue[]>(url, teamCriteriaValues, {
      // headers: { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type' }
    });
    return a;
  }
  addCriteria(teamCriteriaValues: TeamCriteriaValue[]) {
    console.log(teamCriteriaValues);

    let url = `http://localhost:3000/?cmd=addCriteria`;
    let a: Observable<TeamCriteriaValue[]> = this.http.post<TeamCriteriaValue[]>(url, teamCriteriaValues, {
      // headers: { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type' }
    });
    return a;
  }

  getPickList(userID: number, eventID: number): Observable<PickListResponse> {
    let url = `http://localhost:3000/?cmd=getTeamCriteriaScore&userid=${userID}&eventid=${eventID}`;

    return this.http.get<PickListResponse>(url);
  }
}