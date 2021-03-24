import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carimage';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  carImages:CarImage[]=[];
  cars:Car[]=[];
  constructor(private carDetailService:CarDetailService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarsById(params["carId"])
        this.getImagesById(params["carId"])
       
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
}
