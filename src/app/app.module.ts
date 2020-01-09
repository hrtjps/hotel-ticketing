import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListComponent } from './list/list.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatDialogModule } from '@angular/material'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpsService } from './https.service';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    ListComponent,
    HotelDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Custom
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatDialogModule,
    FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [
    HttpsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
