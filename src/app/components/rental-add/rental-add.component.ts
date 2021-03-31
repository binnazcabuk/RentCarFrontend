import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDetails } from 'src/app/models/rentalDetails';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
  providers: [DatePipe]
})
export class RentalAddComponent implements OnInit {
  
  
  @Input() car: Car[];

  customers: Customer[];
  customerId: number;
  rentDate: Date;
  returnDate: Date;

  carId: number;
  carBrandName: string;
  carDescription: string;
  carDailyPrice:number;
  colorName:string;
  carModelYear:string
  
  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;
  constructor( private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private rentalService:RentalService
    ) { }

  ngOnInit(): void {
    this.getCustomer();

  }
  getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;      
    });
  }
  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }

  createRental(car:Car) {

    
    let MyRental: RentalDetails = {
      carId: this.carId,
      brandName: this.carBrandName,
      colorName: this.colorName,
      carModelYear: this.carModelYear,
      carDailyPrice: this.carDailyPrice,
      carDescription: this.carDescription,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      customerId: this.customerId,
    };
    if (MyRental.customerId == undefined || MyRental.rentDate == undefined) {
      this.toastrService.error("Eksik bilgi girdiniz","Bilgilerinizi kontrol edin")
    } else{
     
      localStorage.setItem('payment-data',JSON.stringify(MyRental));
      
      this.toastrService.warning("Ödeme sayfasına yönlendiriliyosunuz");
      this.router.navigate(['/payments']);
     
     
    }
    
  } 

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  setCustomerId(customerId: string) {
    this.customerId = +customerId;
    console.log(this.customerId);
  }
}
