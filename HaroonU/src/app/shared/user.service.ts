import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'http://localhost:53446';
  readonly rootUrl1 = 'http://localhost:56234';

  constructor(private http: HttpClient) { }
  
  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims(){
    return  this.http.get(this.rootUrl+'/api/GetUser');
  }
  getEmployee(){
    return this.http.get(this.rootUrl+'/api/getEmployee');
  }
  
  getUser(){
    return this.http.get(this.rootUrl1+'/api/getUser');
  }
  
  getLocation(){
    return this.http.get(this.rootUrl1+'/api/getLocation');
  }
}
