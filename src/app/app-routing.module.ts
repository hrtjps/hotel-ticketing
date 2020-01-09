import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'lists',
    component: ListComponent
  },
  {
    path: 'details/:id',
    component: HotelDetailsComponent
  },
  {
    path: 'checkout/:id',
    component: CheckoutComponent
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
