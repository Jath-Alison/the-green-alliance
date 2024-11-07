import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { criteriaConfig, criteriaConfigResponse, loginResponse, TeamCriteriaValue, TeamCriteriaValuesResponse } from './Schemas'

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

  getCriteriaConfig(userID: number, eventID: number): Observable<criteriaConfigResponse> {

    let url = `http://localhost:3000/?cmd=getCriteriaConfig&userid=${userID}&eventid=${eventID}`;

    return this.http.get<criteriaConfigResponse>(url);
  }

  setCriteriaConfig(criteriaConfig: criteriaConfigResponse) {
    let url = `http://localhost:3000/?cmd=setCriteriaConfig`;
    this.http.post<criteriaConfigResponse>(url, criteriaConfig, {
      // headers: { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type' }
    }).subscribe(response => {
      console.log('Updated config:', criteriaConfig);
    });
  }

  addCriteriaConfig(singleCriteriaConfig: criteriaConfig) : Observable<criteriaConfigResponse>{
    let url = `http://localhost:3000/?cmd=addCriteriaConfig`;
    let a: Observable<criteriaConfigResponse> = this.http.post<criteriaConfigResponse>(url, singleCriteriaConfig, {
      // headers: { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type' }
    });
    return a;
  }

  setCriteria(teamCriteriaValues: TeamCriteriaValuesResponse){
    let url = `http://localhost:3000/?cmd=setCriteriaEntries`;
    let a: Observable<TeamCriteriaValuesResponse> = this.http.post<TeamCriteriaValuesResponse>(url, teamCriteriaValues, {
      // headers: { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type' }
    });
    return a;
  }
  addCriteria(teamCriteriaValues: TeamCriteriaValue){
    let url = `http://localhost:3000/?cmd=addCriteriaEntry`;
    let a: Observable<TeamCriteriaValuesResponse> = this.http.post<TeamCriteriaValuesResponse>(url, teamCriteriaValues, {
      // headers: { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type' }
    });
    return a;
  }
}