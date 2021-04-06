import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Findex } from 'src/app/models/findex';
import { Rental } from 'src/app/models/rental';
import { RentalDetails } from 'src/app/models/rentalDetails';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
  providers: [DatePipe]
})
export class RentalAddComponent implements OnInit {
  
  findexScore: Findex[] = []
  cars: Car[] = []
  carDetails:Car;
  customers: Customer;
  customerId: Number;
  rentDate: Date;
  returnDate: Date;
  rentDateValue: Date;
  rentalCar: RentalDetails;
  isRentBefore: Boolean = false;
  constructor( private carService: CarService,
    private carDetailByIdService:CarDetailService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private router : Router,
    private customerService : CustomerService,
    private toastrService : ToastrService,
  
    ) { }

  ngOnInit(): void {
  
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
       this.getCarsById(params["carId"])
       
       this.getRentalByCarId(params["carId"]);
    }
     
    })
  }
  
  getCarsById(carId:number){
    this.carDetailByIdService.getCarDetailById(carId).subscribe(response=>{     
      this.cars=response.data;    
    })
}
getRentMinDate(){

  var today  = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().slice(0,10)
}
getReturnMinDate(){
  var today  = new Date();
  today.setDate(today.getDate() + 2);
  return today.toISOString().slice(0,10)
}

getRentalByCarId(id: number) {
  this.rentalService.getRentalByCarId(id).subscribe(response => {
    if (response.data == null) {
      this.isRentBefore = false;
    } else {
      this.rentalCar = response.data;
      this.isRentBefore = true;
    }
  })
}

createRental(){
  let MyRental:Rental = {
    rentDate: this.rentDate,
    returnDate: this.returnDate?this.returnDate:null,
    carId: this.cars[0].carId,
    customerId: this.customers.userId
  }
  //this.paymentService.addToCart(MyRental);
 // console.log(this.paymentService.listCart());
  
  this.router.navigate(['/payment/']);
  this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz...", "Ödeme İşlemleri");

}
checkAvailability() {

  if (!this.isRentBefore) {
    return true;
  } else {
    return this.rentedBeforeCarCheck();
  }
}

rentedBeforeCarCheck() {
  var now = new Date();
  now.setHours(0, 0, 0, 0);
  let today = formatDate(now, 'yyyy/MM/dd', 'en');
  let oldDate = formatDate(this.rentalCar.returnDate, 'yyyy/MM/dd', 'en');


}

checkClick(){
  if (this.checkAvailability() == true) {
    if (this.rentDate == null ) {
      this.toastrService.warning("Başlangıç tarihi ve şirket seçimi zorunludur!", "Eksik Form");
    }else{
      if (this.returnDate == null || this.returnDate > this.rentDate) {
        this.toastrService.success("Araç kiralanabilir.", "Araç Uygun");
        this.createRental();
      }else if(this.returnDate < this.rentDate){
        this.toastrService.error("Dönüş tarihi başlangıç tarihinden küçük olamaz!");
      }else if (this.returnDate == this.rentDate){
        this.toastrService.error("Kiralama işlemi en az 1 gün olmalıdır!");
      }
    }
  }else{
    this.toastrService.warning("Araç kiralama işlemi gerçekleşemez.", "Araç Kullanımda");
  }
}
}
