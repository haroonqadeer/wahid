import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './users'
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  serverUrl = "http://localhost:55536/";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private http: HttpClient) { }

  //http request for get users
  getUsers(){

    var itemBackup = localStorage.getItem("userToken");
    alert(itemBackup);

    var reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + itemBackup});
    
    return this.http.get<Users[]>(this.serverUrl + 'api/users', {headers: reqHeader});
  }
  
  //http request for login
  postUser(userName, Password){
    var data = {"loginname": userName, "password": Password};

    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(this.serverUrl + 'api/token', data, {headers:reqHeader});
  }
  
}
