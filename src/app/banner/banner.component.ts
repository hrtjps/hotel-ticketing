import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private router:Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      city: ['', Validators.required],
      check_in: ['', Validators.required],
      check_out: ['', Validators.required],
      no_of_adult: ['', Validators.required],
    });
  }

  search(){
    if(this.form.invalid){

    }else{
      const check_in = this.changeDateFormat(this.form.controls['check_in'].value);
      const check_out = this.changeDateFormat(this.form.controls['check_out'].value);
      this.form.controls['check_in'].setValue(check_in);
      this.form.controls['check_out'].setValue(check_out);
      this.router.navigate(['/lists'], { queryParams: this.form.value });
    }
  }
  changeDateFormat(date){
    const momentDate = new Date(date); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    return formattedDate;
  }

}
