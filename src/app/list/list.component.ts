import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../services/https.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  _hotelsData:any;
  _hotelsList:any;
  constructor(private activateRoute: ActivatedRoute,
              private http: HttpsService) {
  }

  ngOnInit() {
    console.log(this.activateRoute.queryParamMap)
    this.activateRoute.queryParams.subscribe(params => {
      console.log(params['city'])
      const city = params['city'];
      const check_in = params['check_in'];
      const check_out = params['check_out'];
      const no_of_adult = params['no_of_adult'];
      let queryParams = 'city='+city+'&check_in='+check_in+'&check_out='+check_out+'&no_of_adult='+no_of_adult;
      this.http.searchRoom(queryParams).subscribe(data=>{
        console.log(data)
        this._hotelsData = data;
        if(this._hotelsData.hotels_data){
          this._hotelsList = this._hotelsData.hotels_data;
          console.log(this._hotelsList);
        }
      })
    });
  }

}
