import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpsService {
  private _url:string  = 'api/v1/';
  constructor(public http: HttpClient) {
  } 

  login(fields){
    const body = JSON.stringify(fields);
    return this.http.post('authenticate', body);
  }
  searchRoom(params){
    const body = JSON.stringify(params);
    console.log(body);
    console.log(this._url+'search_rooms/search?'+params);
    return this.http.get(this._url+'search_rooms/search?'+params);
  } 
  getDetailInfo(id) {
    return this.http.get(this._url + `hotels/${id}`);
  }
}
