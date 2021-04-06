import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FakecardService } from 'src/app/services/fakecard.service';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { FakeCard } from 'src/app/models/fakeCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { RentalDetails } from 'src/app/models/rentalDetails';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental: RentalDetails;
  cars: Car;
  customer: Customer;
  getCustomerId: number;
  amountOfPayment: number = 0;
  nameOnTheCard: string;
  cardNumber: string;
  cardCvv: string;
  expirationDate: string;
  fakeCard: FakeCard;
  cardExist: Boolean = false;
  moneyInTheCard:number;

  constructor(private activateRoute: ActivatedRoute,
    private carService: CarService,
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private fakeCardService: FakecardService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId = JSON.parse(params['rental']).customerId;
        this.getCustomerDetailById(this.getCustomerId);
        
      }
    });
  }

  getCustomerDetailById(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((response) => {
      this.customer = response.data[0];
      console.log(response);
    });
  }

 
}
