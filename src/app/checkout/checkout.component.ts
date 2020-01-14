import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../services/https.service';
import { Router } from '@angular/router';
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
  hotel;
  errorMsg;
  successMsg;
  response_data:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpsService,
    private formBuilder: FormBuilder,
    private router:Router
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
        this.hotel = data.hotel;
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
    this.successMsg="";
    if(this.form.invalid){

      this.errorMsg="Please input all valid info.(email and name) "; // + this.form.getError('email')

      return ;
    }
    this.http.room_booking({
      email: this.form.value.email,
      // check_in: this.check_in,
      // check_out: this.check_out,
      room_id: [this.room_id],
      // hotel_id: this.room_id,
      // coupon_code: this.coupon_code
      // email: "admin@example.com",
      check_in: "2020-02-02",
      check_out: "2020-02-02",
      // room_id: [1],
      hotel_id: 1,
      // coupon_code: "qwerty",
      use_wallet: 0,
      wallet_amount: 0,
      price: 0,
      customer_name: this.form.value.fullName,
      phone_number: this.form.value.phoneNo,
      country: this.form.value.country,
      country_code: this.form.value.countryCode,
    }).subscribe(data => {
      this.response_data = data;
      console.log(this.response_data);
      if(this.response_data.status == true){
        this.router.navigate(['/thank-you']);
      }else{
        this.errorMsg = this.response_data.message;
      }
    },
    error=>{
      this.errorMsg = error.error.errors;
      console.log(error.error);
    })
  }

}
