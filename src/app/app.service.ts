import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import apiconfig from '../apiconfig';
import { User } from './app.models';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(private http: HttpClient) { };

  public registerUser(user : User) : Observable<User> {
    return this.http.post<User>(apiconfig.uri + "/public/v2/users", user, { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiconfig.token}});
  }

  public getUser(userId: string): Observable<User>{
    return this.http.get<User>(apiconfig.uri+"/public/v2/users/"+userId, { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiconfig.token}});
  }

}