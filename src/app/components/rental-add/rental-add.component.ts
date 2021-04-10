import { DatePipe, formatDate } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Findex } from 'src/app/models/findex';
import { Rental } from 'src/app/models/rental';
import { RentalDetails } from 'src/app/models/rentalDetails';
import { AuthService } from 'src/app/services/auth.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
  providers: [DatePipe]
})
export class RentalAddComponent implements OnInit {
  

  cars:Car[]=[]
  carDetails:Car;
  customers: Customer;

  customerId: number;
  rentDate: Date;
  returnDate: Date;
  rentDateValue: Date;
  rentalCar: RentalDetails;
 
  rentFlag = true;
 
  constructor( private carService: CarService,
    private carDetailByIdService:CarDetailService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private router : Router,
    public authService:AuthService,
  
    private findexService:FindeksService,
    private customerService : CustomerService,
    private toastrService : ToastrService,
  
    ) { }

  ngOnInit(): void {

    

    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
       this.getCarsById(params["carId"])
     
      }
         
     
    })
   
    this.getCustomerByUserId(this.authService.userId);
   
   
  }

  getCustomerByUserId(userId:number){
    this.customerService.getCustomersByUserId(userId).subscribe(response => {
     // console.log(response.data)
      this.customers = response.data;
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
  
  
  createRental(){
    let MyRental:Rental = {
      rentDate: this.rentDate,
      returnDate: this.returnDate?this.returnDate:null,
      carId: this.cars[0].carId,
      customerId:this.customers.userId,
    }
    
    this.paymentService.addToCart(MyRental);
   // console.log(this.paymentService.listCart());
    
    this.router.navigate(['/payments/']);
    this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz...", "Ödeme İşlemleri");
  
  }
  
  checkClick(){
    if (this.rentDate==null && this.returnDate==null && this.customerId==null) {
      this.toastrService.warning('Lütfen boş bilgi bırakmayın', 'Dikkat');
      return;
   }
   else if(this.rentFlag==false){
    this.toastrService.warning('findex puan yeterli değil ', 'Dikkat');
   }
else{

  this.createRental();
}
   
   }
        
        
     
    
  
}
