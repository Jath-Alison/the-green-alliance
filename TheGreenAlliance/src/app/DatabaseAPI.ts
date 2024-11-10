import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { criteriaConfig, criteriaConfigResponse, loginResponse, PickListResponse, TeamCriteriaValue, TeamCriteriaValuesResponse } from './Schemas'

let numArr :number[] = [];

export const userData = {
  userID : -1,
  username : "",
  favoriteTeams : numArr,
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

  getFavoriteTeams(){
    return DatabaseAPI  }
  setFavoriteTeam(id:number, favorite:boolean){
    if(favorite && userData.favoriteTeams.indexOf(id) == -1){
      userData.favoriteTeams.push(id);
    }else if(!favorite && userData.favoriteTeams.indexOf(id) != -1){
      userData.favoriteTeams = userData.favoriteTeams.filter((ele, ind) => ele != id);
    }
  }

  login(username: string, password: string): Observable<loginResponse> {

    let url = `http://localhost:3000/?cmd=login&username=${username}&password=${password}`;

    return this.http.get<loginResponse>(url);
  }

  createLogin(username: string, password: string): Observable<loginResponse> {

    let url = `http://localhost:3000/?cmd=createLogin`;

    return this.http.post<loginResponse>(url, {username: username, password: password});
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

  addCriteriaConfig(singleCriteriaConfig: criteriaConfig) : Observable<criteriaConfigResponse>{
    let url = `http://localhost:3000/?cmd=addCriteriaConfig`;
    let a: Observable<criteriaConfigResponse> = this.http.post<criteriaConfigResponse>(url, singleCriteriaConfig, {
      // headers: { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type' }
    });
    return a;
  }

  getTeamCriteria(userID: number, eventID: number, teamID:number) : Observable<TeamCriteriaValuesResponse>{
    let url = `http://localhost:3000/?cmd=getTeamCriteria&userid=${userID}&eventid=${eventID}&teamid=${teamID}`;

    return this.http.get<TeamCriteriaValuesResponse>(url);
  }

  setCriteria(teamCriteriaValues: TeamCriteriaValue[]){
    let url = `http://localhost:3000/?cmd=setCriteria`;
    let a: Observable<TeamCriteriaValue[]> = this.http.post<TeamCriteriaValue[]>(url, teamCriteriaValues, {
      // headers: { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type' }
    });
    return a;
  }
  addCriteria(teamCriteriaValues: TeamCriteriaValue[]){
    console.log(teamCriteriaValues);

    let url = `http://localhost:3000/?cmd=addCriteria`;
    let a: Observable<TeamCriteriaValue[]> = this.http.post<TeamCriteriaValue[]>(url, teamCriteriaValues, {
      // headers: { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type' }
    });
    return a;
  }

  getPickList(userID: number, eventID: number) : Observable<PickListResponse>{
    let url = `http://localhost:3000/?cmd=getTeamCriteriaScore&userid=${userID}&eventid=${eventID}`;

    return this.http.get<PickListResponse>(url);
  }
}