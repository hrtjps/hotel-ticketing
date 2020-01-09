import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../services/https.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {

  hotel: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.http.getDetailInfo(params['id']).subscribe((data: any)=>{
        this.hotel = data.hotel;
        console.log(this.hotel);
      })
    });
  }
}
