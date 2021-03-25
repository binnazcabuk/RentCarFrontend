import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [  
  {path:"",pathMatch:"full", component:CarComponent},
{path:"cars", component:CarComponent},
{path:"cars/brands/:brandId", component:CarComponent},
{path:"cars/colors/:colorId", component:CarComponent},
{path:"cars/car-detail/:carId", component:CardetailComponent},
{path:"cars/rental/:id",component:RentalComponent},
{path:"cars/filter/:brandId/:colorId",component:CarComponent},



];


@NgModule({
  imports: [  RouterModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
