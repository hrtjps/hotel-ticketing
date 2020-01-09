import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

const CUR_USER = "currentUser";

@Injectable({
  providedIn: 'root'
})

export class HttpsService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private _url:string  = 'api/v1/';
  constructor(public http: HttpClient) {
    
    let store = localStorage.getItem(CUR_USER);
    if(store){
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(store));
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(new Object());
      this.login('admin@example.com', 'password').subscribe(data => {
        // console.log(data);
      })
    }
  } 

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email, password){
    // const body = JSON.stringify(fields);
    return this.http.post<any>('authenticate', {email, password})
    .pipe(map(user => {
      console.log(user);
      if(user && user.auth_token) {
        localStorage.setItem(CUR_USER, JSON.stringify(user.user.user));
        localStorage.setItem("auth_token", user.auth_token)
        this.currentUserSubject.next(user);
      }
      return user;
    }))
  }
  searchRoom(params){
    const body = JSON.stringify(params);
    console.log(body);
    console.log(this._url+'search_rooms/search?'+params);
    return this.http.get(this._url+'search_rooms/search?'+params);
  } 
  getRoomsByHotelId(id) {
    return this.http.get(this._url + `hotels/${id}/rooms`);
  }
  getDetailInfo(id) {
    return this.http.get(this._url + `hotels/${id}`);
  }
  room_booking(param) {
    return this.http.post(this._url + 'room_bookings', param);
  }
}
