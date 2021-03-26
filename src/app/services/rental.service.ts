import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

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
}
