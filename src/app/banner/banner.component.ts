import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _moment from 'moment';
const moment = _moment;

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  form: FormGroup;

  keyword = 'name';
  data = {indate:'',outdate:'', city:'', adult_count:0, child_count: 0};

  no_of_adult=0;
  no_of_children=0;
  children=[];
  ages=[];
  selected;
  minDate;
  constructor(private fb: FormBuilder, private router:Router) {
    for(let i=0; i<18; i++){
      this.ages.push(i);
    }
  }
  ngOnInit() {
    this.form = this.fb.group({
      city: ['', Validators.required],
      check_in: ['', Validators.required],
      check_out: ['', Validators.required],
      no_of_adult: ['', Validators.required],
    });
    this.minDate =  new Date();
  }
  update() {
      this.form.controls.no_of_adult.setValue(
        this.no_of_adult+ (this.no_of_adult===1?' Adult ':' Adults ')+
        this.no_of_children+ (this.no_of_children===1?' Child':' Children')
      );
    }
    changeNoOfAdult($e, val) {
      $e.stopPropagation();
      this.no_of_adult += val;
      this.update();
    }
    changeNoOfChildren($e, val) {
      $e.stopPropagation();
      this.no_of_children += val;
      if(val===1){
        this.children.push(0)
      } else {
        this.children.pop()
      }
      this.update();
    }
  search(){
    console.log('clciked');
    if(this.form.invalid){
      console.log('invalid ')
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


  selectEvent(item) {
    // do something with selected item
    if(item.name){
      this.form.controls['city'].setValue(item.name);
    }
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }
  onCity(val){
    this.data.city = val;
  }

  incrementAdult(event){
    event.preventDefault();
    this.data.adult_count+=1;
  }

  decrementAdult(){
    if(this.data.adult_count > 0){
      this.data.adult_count-=1;
    }
  }
  dateChange(event){
    let newdate = new Date();
    let d: Array<any> = this.data.indate.split('/');
    newdate.setDate(d[0]);
    newdate.setMonth(d[1]);
    newdate.setFullYear(d[2]);
    this.data.outdate = moment(newdate).add(1, 'days').format('DD/MM/YYYY');
    console.log(this.data.outdate);
  }
}
