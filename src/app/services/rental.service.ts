import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponceModel } from '../models/responseModel';

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

  checkCarStatus(rental:Rental):Observable<ResponceModel> {
    let newPath = this.apiUrl + "rentals/checkcarstatus";
    return this.httpClient.post<ResponceModel>(newPath,rental);
  }
  
}
