import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { start } from 'node:repl';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImages';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
 
  carImages:CarImage[]=[];
  cars:Car[]=[];
 
  rental: Rental[]=[];
 
  rentFlag = false;
  minDate:Date = new Date();
  rentTime:number;
  rentDate:Date;
  returnDate:Date;
  maxDate:Date = new Date();
  minSelected:boolean;
  carId: number;
  
  constructor(private carDetailService:CarDetailService,private activatedRoute:ActivatedRoute,private rentalService:RentalService,
    private customerService: CustomerService, private router: Router,
    
    private toastrService: ToastrService,
    private paymentServise: PaymentService) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarsById(params["carId"])
        this.getImagesById(params["carId"])
        this.getRent(params['carId'])
         
      
      }
        
    });
  }
  getCarsById(id:number){
    this.carDetailService.getCarDetailById(id).subscribe(response=>{
      this.cars=response.data;
    })
  }
 
  getImagesById(id:number){
    this.carDetailService.getCarImagesById(id).subscribe(response=>{
      this.carImages=response.data;
      
      
    })
  }
  
  getRent(carId: number) {
    this.rentalService.getRentalByCar(carId).subscribe((response) => {
      this.rental = response.data.filter((rent:Rental)=>rent.status==true);
    
   
      if(this.rental.length>0){
       
        this.rentFlag=true;
      }
      else{
      this.rentFlag=false;
      }
    });
  }

  

  
}
