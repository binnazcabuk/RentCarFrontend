import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carimage';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
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

  constructor(private carDetailService:CarDetailService,private activatedRoute:ActivatedRoute,private rentalService:RentalService) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarsById(params["carId"])
        this.getImagesById(params["carId"])
        this.getRent(params['carId'])
       
        // this.getRentalsByCarId(params["id"])
        
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
      this.rental = response.data.filter((rent:Rental)=>rent.returnDate==null);
      if(this.rental.length>0){
        this.rentFlag=true;
      }
      else{
      this.rentFlag=false;
      }
    });
  }
}
