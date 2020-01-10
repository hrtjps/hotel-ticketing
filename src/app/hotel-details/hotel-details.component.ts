import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../services/https.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  showAll: false;
  hotel: any;
  rooms: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.http.getDetailInfo(params['id']).subscribe((data: any)=>{
        let string = JSON.stringify(data.hotel).replace(/http:\/\/localhost:2000\//g, environment.apiBaseUrl);
        
        this.hotel = JSON.parse(string);
        console.log(this.hotel);

      })
      this.http.getRoomsByHotelId(params['id']).subscribe((data:any)=> {
        console.log(data);
        this.rooms = data.rooms_data.room_types;
      })
    });
  }
}
