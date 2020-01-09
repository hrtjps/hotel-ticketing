import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../services/https.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpsService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params)
      const hotel_id = params['hotel_id'];
      const room_id = params['room_id'];
      const check_out = params['check_out'];
      const check_in = params['check_in'];
      const no_of_adult = params['no_of_adult'];
      const no_of_child = params['no_of_child'];
    })
  }

  room_booking() {
    this.http.room_booking({
      email: 'kar@mail.com',
      check_in: '2020-02-02',
      check_out: '2020-02-02',
      room_id: 1,
      hotel_id: 1,
      coupon_code: "qwerty"

    }).subscribe(data => {
      console.log(data)
    })
  }

}
