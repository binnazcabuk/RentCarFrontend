import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImages';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImagesService {
  apiUrl="https://localhost:44377/api/";
  constructor(private httpClient:HttpClient) { }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  add(carImage:CarImage):Observable<ListResponseModel<CarImage>>{
    return this.httpClient.post<ListResponseModel<CarImage>>(this.apiUrl+"carimages/add",carImage);
  }
}
