import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImages';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl="https://localhost:44377/api/"
  constructor(private httpClient:HttpClient) { }

  getCarDetailById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/GetCarDetailById?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
    
    
  }

  getCarImagesById(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carImages/getbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
}
