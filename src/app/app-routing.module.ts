import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarListComponent } from './components/car-list/car-list.component';

import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandUpdateDeleteComponent } from './components/brand-update-delete/brand-update-delete.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';


const routes: Routes = [  
{path:"",pathMatch:"full", component:CarComponent},
{path:"cars", component:CarComponent},
{path:"cars/brands/:brandId", component:CarComponent},
{path:"cars/colors/:colorId", component:CarComponent},
{path:"cars/car-detail/:carId", component:CardetailComponent},
{path:"cars/filter/:brandId/:colorId",component:CarComponent},
{path:"cardetail/rental/:carId",component:RentalAddComponent},
{path:'payments/:rental',component:PaymentComponent},
{path:"carlist",component:CarListComponent},
{path:"car-add",component:CarAddComponent},
{path:"carlist/update/:carId", component: CarUpdateComponent },
{path:"brandlist", component:BrandListComponent},
{path:"brand-add", component:BrandAddComponent},
{path:"brandlist/update/:brandId", component:BrandUpdateDeleteComponent},
];


@NgModule({
  imports: [  RouterModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
