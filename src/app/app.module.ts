import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule,ReactiveFormsModule} from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';


import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import{ToastrModule} from "ngx-toastr"
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import{BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CarAddComponent } from './components/car-add/car-add.component';

import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateDeleteComponent } from './components/brand-update-delete/brand-update-delete.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { AccountComponent } from './components/account/account.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    CarComponent,
    ColorComponent,
    CustomerComponent,
   
    CardetailComponent,
    VatAddedPipe,
    BrandPipePipe,
    CarFilterComponent,
    ColorPipePipe,
    PaymentComponent,
    RentalAddComponent,
    CarAddComponent,
 
    CarListComponent,
    CarUpdateComponent,
    BrandListComponent,
    BrandAddComponent,
    BrandUpdateDeleteComponent,
    LoginComponent,
    AccountComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    ColorListComponent,
    RegisterComponent,
    FooterComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
      }
    }),
   
  ],
  providers: [
    {
provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
