import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { criteriaConfig, criteriaConfigResponse, loginResponse } from './Schemas'

@Injectable({ providedIn: 'root' })
export class DatabaseAPI {

  constructor(private http: HttpClient) { }

  userID = -1;
  username = "";

  favoriteTeams:number[] = [];

  setUsername(name: string): void {
    this.username = name;
  }
  getUsername(): string {
    return this.username;
  }

  setUserID(id: number): void {
    this.userID = id;
  }
  getUserID(): number {
    return this.userID;
  }

  getFavoriteTeams(){
    return this.favoriteTeams;
  }
  setFavoriteTeam(id:number, favorite:boolean){
    if(favorite && this.favoriteTeams.indexOf(id) == -1){
      this.favoriteTeams.push(id);
    }else if(!favorite && this.favoriteTeams.indexOf(id) != -1){
      this.favoriteTeams = this.favoriteTeams.filter((ele, ind) => ele != id);
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
}