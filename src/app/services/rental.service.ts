import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetails } from '../models/rentalDetails';
import { ResponceModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44377/api/';

  constructor(private httpClient: HttpClient) { }

  getRentalByCar(carId: number): Observable<ListResponseModel<Rental>> {
    let newUrl = this.apiUrl + 'rentals/getbycarid?id=' + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newUrl);
  }

  getRentalCar(id: number): Observable<ListResponseModel<Rental>> {
    let newUrl = this.apiUrl + 'rentals/getbyid' + id;
    return this.httpClient.get<ListResponseModel<Rental>>(newUrl);
  }


  add(rental: Rental) : Observable<ResponceModel>{
    let newPath = this.apiUrl+"rentals/add";
      return this.httpClient.post<ResponceModel>(newPath, rental);
    }
  getRentalByCarId(carId:number) : Observable<SingleResponseModel<RentalDetails>>{
    let newPath = this.apiUrl+"rentals/getrentaldetailbycarid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<RentalDetails>>(newPath);
  }

  getRentalByUserId(userId:number) : Observable<ListResponseModel<RentalDetails>>{
    let newPath = this.apiUrl+"rentals/getrentaldetailbyuserid?userid="+userId;
    return this.httpClient.get<ListResponseModel<RentalDetails>>(newPath);
  }
}
