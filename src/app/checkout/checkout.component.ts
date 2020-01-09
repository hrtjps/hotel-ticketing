import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../services/https.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  hotel_id;
  room_id;
  check_out;
  check_in;
  no_of_adult;
  no_of_child;
  coupon_code;
  errorMsg;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.hotel_id = params['hotel_id'];
      this.room_id = params['room_id'];
      this.check_out = params['check_out'];
      this.check_in = params['check_in'];
      this.no_of_adult = params['no_of_adult'];
      this.no_of_child = params['no_of_child'];
      this.http.getDetailInfo(this.hotel_id).subscribe((data: any)=>{
        this.coupon_code = data.hotel.coupon_value;
      })
    })
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: [''],
      countryCode: [''],
      phoneNo: [''],
      country: [''],
    })
  }

  room_booking() {
    this.errorMsg="";
    if(this.form.invalid){
      
      this.errorMsg="Please input all valid info.(email and name) "; // + this.form.getError('email')
      return ;
    }
    this.http.room_booking({
      // email: this.form.value.email,
      // check_in: this.check_in,
      // check_out: this.check_out,
      // "room_id[]": this.room_id,
      // hotel_id: this.room_id,
      // coupon_code: this.coupon_code
      email: "email:kar@mail.com",
      check_in: "2020-02-02",
      check_out: "2020-02-02",
      "room_id[]": 1,
      hotel_id: 1,
      coupon_code: "qwerty"

    }).subscribe(data => {
      console.log(data)
    })
  }

}
