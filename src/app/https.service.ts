import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpsService {

  private _host:string = 'http://85c5d80d.ngrok.io/';  
  private _url:string  = this._host+'api/v1/';
  constructor(public http: HttpClient) {
  } 

  login(fields){
    const body = JSON.stringify(fields);
    return this.http.post(this._host+'authenticate', body);
  }
  searchRoom(params){
    const body = JSON.stringify(params);
    console.log(body);
    console.log(this._url+'search_rooms/search?'+params);
    return this.http.get(this._url+'search_rooms/search?'+params);
  } 
}
